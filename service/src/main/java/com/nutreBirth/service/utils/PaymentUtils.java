package com.nutreBirth.service.utils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

public final class PaymentUtils {

    private static final Logger log = LoggerFactory.getLogger(PaymentUtils.class);

    private PaymentUtils() {
        // utility class
    }

    public static String hmacSha256(String data, String secret) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKey);
            byte[] rawHmac = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(rawHmac);
        } catch (Exception e) {
            log.error("Error while calculating HMAC", e);
            throw new RuntimeException("Failed to calculate HMAC", e);
        }
    }
}
