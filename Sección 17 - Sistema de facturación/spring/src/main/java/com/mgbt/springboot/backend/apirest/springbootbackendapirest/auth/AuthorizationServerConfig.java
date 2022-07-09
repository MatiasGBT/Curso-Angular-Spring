package com.mgbt.springboot.backend.apirest.springbootbackendapirest.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.*;
import org.springframework.security.oauth2.config.annotation.web.configurers.*;
import org.springframework.security.oauth2.provider.token.TokenEnhancerChain;
import org.springframework.security.oauth2.provider.token.store.*;

import java.util.Arrays;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter{

    //Esta es la configuración de OAuth2 y se encarga de todo lo que tenga que ver con el token
    //como el login, crear el token, validarlo, etc.

    //Se puede utilizar debido a haberlo agregado al contenedor de Spring
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    //El authentication server usará el authentication manager creado en la clase
    //SpringSecurityConfig para el proceso de login
    @Autowired
    @Qualifier("authenticationManager")
    private AuthenticationManager authenticationManager;

    @Autowired
    private InfoAdicionalToken infoAdicionalToken;

    //Este método decide que usuarios pueden autenticarse en el endpoint /oauth/token/
    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        //El primer método (tokenKeyAcces) permite que los usuarios se puedan autenticar
        //el segundo método sirve para que los usuarios tengan que estar autenticados
        //(mandar el token en el header de la petición) para acceder al endpoint
        security.tokenKeyAccess("permitAll()")
                .checkTokenAccess("isAuthenticated()");
    }

    /*
    * Este método sirve para registrar los clientes que utilizaran la API REST.
    * En este caso solo hay uno (la APP de Angular) pero en caso de que haya más
    * hay que agregarlos.
    */
    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        //Esto modifica a la aplicación en sí, no a los usuaríos con distintos roles
        clients.inMemory().withClient("angularapp")
                .secret(passwordEncoder.encode("12345"))
                .scopes("read", "write")
                .authorizedGrantTypes("password", "refresh_token")
                .accessTokenValiditySeconds(3600)
                .refreshTokenValiditySeconds(3600);
        //accessTokenValiditySeconds es el tiempo de caducidad. Esta en segundos por lo que es 1 hora
    }

    //Se encarga del proceso de validar el token
    //Cada vez que iniciamos sesión, se envía el usuario y contraseña, realizar la autenticación
    //genera el token, se lo entrega al usuario y este puede acceder a los distintos recursos de la app
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        //TokenEnhancerChain sirve para enlazar la información del token por defecto con
        //la que se crea en la clase InfoAdicionalToken
        TokenEnhancerChain tokenEnhancerChain = new TokenEnhancerChain();
        tokenEnhancerChain.setTokenEnhancers(Arrays.asList(infoAdicionalToken, accessTokenConverter()));

        endpoints.authenticationManager(authenticationManager)
                .tokenStore(tokenStore())
                .accessTokenConverter(accessTokenConverter())
                .tokenEnhancer(tokenEnhancerChain);
        //accessTokenConverter por debajo traduce la información que trae el token. Decodifica y codifica los datos.
    }

    @Bean
    public JwtTokenStore tokenStore() {
        return new JwtTokenStore(accessTokenConverter());
    }

    @Bean
    public JwtAccessTokenConverter accessTokenConverter() {
        JwtAccessTokenConverter jwtAccessTokenConverter = new JwtAccessTokenConverter();
        jwtAccessTokenConverter.setSigningKey(JwtConfig.RSA_PRIVADA);
        jwtAccessTokenConverter.setVerifierKey(JwtConfig.RSA_PUBLICA);
        return jwtAccessTokenConverter;
    }
}