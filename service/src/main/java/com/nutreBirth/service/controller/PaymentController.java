package com.nutreBirth.service.controller;

import java.time.Duration;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import java.security.Principal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.nutreBirth.service.Entity.User;
import com.nutreBirth.service.Enum.PlanType;
import com.nutreBirth.service.Service.JwtService;
import com.nutreBirth.service.dto.AuthResponse;
import com.nutreBirth.service.dto.RazorpayVerifyRequest;
import com.nutreBirth.service.repo.UserRepository;
import com.nutreBirth.service.utils.PaymentUtils;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import jakarta.servlet.http.HttpServletResponse;

import org.json.JSONObject;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private static final Logger log = LoggerFactory.getLogger(PaymentController.class);

    @Value("${razorpay.key-id}")
    private String keyId;

    @Value("${razorpay.key-secret}")
    private String keySecret;

    @Value("${app.auth.cookie-name:nb_auth}")
    private String cookieName;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final JwtService jwtService;

    public PaymentController(UserRepository userRepository,
            JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder() {
        log.info("POST /payment/create-order endpoint called");

        try {
            if (keyId == null || keyId.isBlank() || keyId.equals("rzp_test_xxxxx")) {
                log.error("Razorpay key-id is not configured properly: {}", keyId);
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Payment gateway not configured"));
            }

            if (keySecret == null || keySecret.isBlank() || keySecret.equals("xxxxx")) {
                log.error("Razorpay key-secret is not configured properly");
                return ResponseEntity
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("error", "Payment gateway not configured"));
            }

            log.debug("Creating Razorpay client");
            RazorpayClient client = new RazorpayClient(keyId, keySecret);

            // Generate receipt ID (max 40 chars for Razorpay)
            // Use short prefix + first 32 chars of UUID = 35 total chars
            String uuid = UUID.randomUUID().toString().replace("-", "");
            String receipt = "nb_" + uuid.substring(0, 32);
            log.debug("Creating order with receipt: {}", receipt);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", 19900); // ₹199 in paise
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", receipt);

            Order order = client.orders.create(orderRequest);
            Object orderId = order.get("id");
            log.info("Razorpay order created successfully: {}", orderId);

            // Build response map with explicit handling of mixed types
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("orderId", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));
            response.put("key", keyId);

            return ResponseEntity.ok(response);

        } catch (RazorpayException ex) {
            log.error("Razorpay API error while creating order: {}", ex.getMessage(), ex);
            return ResponseEntity
                    .status(HttpStatus.BAD_GATEWAY)
                    .body(Map.of("error", "Payment gateway error: " + ex.getMessage()));
        } catch (Exception ex) {
            log.error("Unexpected error while creating Razorpay order: {}", ex.getMessage(), ex);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to create order"));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<AuthResponse> verifyPayment(
            @RequestBody RazorpayVerifyRequest req,
            Principal principal,
            HttpServletResponse response) {
        try {
            log.debug("Payment verify called for principal: {}", principal == null ? "<anonymous>" : principal.getName());
            log.debug("Incoming verify payload: paymentId='{}', orderId='{}', signature='{}'",
                req == null ? null : req.getRazorpayPaymentId(),
                req == null ? null : req.getRazorpayOrderId(),
                req == null ? null : req.getRazorpaySignature());

            if (req == null || req.getRazorpayPaymentId() == null || req.getRazorpayOrderId() == null || req.getRazorpaySignature() == null) {
            log.warn("Missing fields in payment verification request");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing payment verification fields");
            }

            if (principal == null || principal.getName() == null) {
                log.warn("No authenticated principal present during payment verification");
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated");
            }

            // Load user entity from repository using principal name (userId)
            String userIdStr = principal.getName();
            UUID userId;
            try {
                userId = UUID.fromString(userIdStr);
            } catch (IllegalArgumentException ex) {
                log.error("Invalid principal name as UUID: {}", userIdStr);
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user id");
            }

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
            // 1️⃣ Verify Razorpay signature
            String payload = req.getRazorpayOrderId() + "|" + req.getRazorpayPaymentId();

            String expectedSignature = PaymentUtils.hmacSha256(payload, keySecret);
            log.debug("Expected signature computed: {}", expectedSignature);

            if (!expectedSignature.equals(req.getRazorpaySignature())) {
                log.error("Invalid payment signature for user id: {} (expected='{}' got='{}')",
                        user.getId(), expectedSignature, req.getRazorpaySignature());
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid payment signature");
            }

            // 2️⃣ Upgrade user
            user.setPlan(PlanType.PREMIUM);
            userRepository.save(user);
            log.debug("User plan upgraded to PREMIUM for user id: {}", user.getId());

            // 3️⃣ Generate JWT
            String jwt = jwtService.generate(user);

            // 4️⃣ Set HTTP-only cookie
                ResponseCookie cookie = ResponseCookie.from(cookieName, jwt)
                    .httpOnly(true)
                    .secure(false) // true in production (HTTPS)
                    .sameSite("Lax")
                    .path("/")
                    .maxAge(Duration.ofDays(7))
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            // 5️⃣ Return response (frontend ignores token)
            log.debug("Returning AuthResponse for user id: {}", user.getId());
            return ResponseEntity.ok(new AuthResponse(jwt, user));

        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Payment verification failed",
                    e);
        }
    }

}
