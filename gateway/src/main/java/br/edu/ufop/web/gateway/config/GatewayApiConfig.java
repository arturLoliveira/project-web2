package br.edu.ufop.web.gateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class GatewayApiConfig {

    @Value("${gateway.frontend.uri}")
    private String frontEndUri;

    @Bean
    public RouteLocator gatewayRouter(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("tickets",
                        pred -> pred.path("/events/**", "/sales/**", "/users/**")
                                .uri("http://tickets-app:4000")
                )
                .route("frontend",
                        pred -> pred.path("/**")
                                .uri(getFrontEndUri())
                )
                .build();
    }

    private String getFrontEndUri() {

        final String FRONTEND_DEFAULT_URI = "http://react-app:3000";

        if (this.frontEndUri != null) {
            return this.frontEndUri;
        }

        return FRONTEND_DEFAULT_URI;

    }

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        
        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        
    
        corsConfig.setMaxAge(3600L);
        corsConfig.addAllowedMethod("*");
        
        corsConfig.addAllowedHeader("*");
        
        corsConfig.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }

}
