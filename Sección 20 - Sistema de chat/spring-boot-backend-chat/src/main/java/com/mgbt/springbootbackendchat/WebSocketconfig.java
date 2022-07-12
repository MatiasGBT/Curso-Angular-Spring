package com.mgbt.springbootbackendchat;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketconfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat-websocket")
        .setAllowedOrigins("http://localhost:4200")
        .withSockJS();
    }

    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //Este prefijo (chat) es para los nombres de evento, es como el prefijo
        //api que iba antes de los endpoints en el anterior proyecto
        registry.enableSimpleBroker("/chat/");

        //Este es el prefijo de a donde se va a mandar un mensaje
        registry.setApplicationDestinationPrefixes("/app");
    }
}
