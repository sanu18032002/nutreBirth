package com.nutreBirth.service.controller;

import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    private static final Logger log = LoggerFactory.getLogger(PaymentController.class);

    @Value("${razorpay.key-id}")
    private String keyId;

    @Value("${razorpay.key-secret}")
    private String keySecret;

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
}
