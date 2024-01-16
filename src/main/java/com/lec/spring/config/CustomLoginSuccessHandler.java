package com.lec.spring.config;

import com.lec.spring.domain.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.SavedRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CustomLoginSuccessHandler /*implements SavedRequestAwareAuthenticationSuccessHandler*/ {

//    public CustomLoginSuccessHandler(String defaultTargetUrl) {
//        setDefaultTargetUrl(defaultTargetUrl);
//    }
//
//
//    @Override
//    public void onAuthenticationSuccess(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            Authentication authentication) throws IOException, ServletException {
//
//        PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
//
//        User user = userDetails.getUser();
//
//
//        if (user.getStatus() == 0) {
//
//            List<String> role = new ArrayList<>();
//            authentication.getAuthorities().forEach(authority -> {
//                role.add(authority.getAuthority());
//            });
//
//            super.onAuthenticationSuccess(request, response, authentication);
//
//            HttpServletRequestWrapper wrapper = new HttpServletRequestWrapper(request);
//            SavedRequest savedRequest = (SavedRequest) wrapper.getSession().getAttribute("SPRING_SECURITY_SAVED_REQUEST");
//            System.out.println("Saved Request: " + (savedRequest != null ? savedRequest.getRedirectUrl() : "None"));
//
//        } else {
//            System.out.println("탈퇴한 사용자입니다.");
//
//            response.sendRedirect("/user/login");
//        }
//    }
//
//    // client ip 불러오기
//    public static String getClientIp(HttpServletRequest request) {
//        String ip = request.getHeader("X-Forwarded-For");
//        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
//            ip = request.getHeader("Proxy-Client-IP");
//        }
//        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
//            ip = request.getHeader("WL-Proxy-Client-IP");
//        }
//        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
//            ip = request.getHeader("HTTP_CLIENT_IP");
//        }
//        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
//            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
//        }
//        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
//            ip = request.getRemoteAddr();
//        }
//        return ip;
//    }

}

