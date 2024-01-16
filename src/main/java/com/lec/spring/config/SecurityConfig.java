package com.lec.spring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

//    @Bean
//    public PasswordEncoder encoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        return http
//                .csrf(csrf -> csrf.disable())
//

                    // TODO 이하 URL 수정 필요
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/board/detail/**").authenticated()
//                        .requestMatchers("/board/write/**", "/board/review/**","/board/modify/**", "/mypage/**", "/user/userpage/**").hasAnyRole("MEMBER", "ADMIN")
//                        .requestMatchers("/admin/**").hasAnyRole("ADMIN")
//                        .anyRequest().permitAll()
//                )
//
//                .formLogin(form -> form
//                        .loginPage("/user/login")
//                        .loginProcessingUrl("/user/login")
//                        .defaultSuccessUrl("/")
//
//                        .usernameParameter("username")
//                        .passwordParameter("password")
//
//                        .successHandler(new CustomLoginSuccessHandler("/main"))
//                        .failureHandler(new CustomLoginFailureHandler())
//                )
//
//                .logout(httpSecurityLogoutConfigurer -> httpSecurityLogoutConfigurer
//                        .logoutUrl("/user/logout")
//                        .logoutSuccessUrl("/user/login?logout")
//                        .invalidateHttpSession(false)
//
//                        .logoutSuccessHandler(new CustomLogoutSuccessHandler())
//                )
//
//                .exceptionHandling(httpSecurityExceptionHandlingConfigurer -> httpSecurityExceptionHandlingConfigurer
//                        .accessDeniedHandler(new CustomAccessDeniedHandler())
//                )
//
//                .build();
//
//    }

}
