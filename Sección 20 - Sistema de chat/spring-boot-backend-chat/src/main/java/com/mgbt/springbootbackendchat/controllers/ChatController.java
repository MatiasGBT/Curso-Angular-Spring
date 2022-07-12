package com.mgbt.springbootbackendchat.controllers;

import com.mgbt.springbootbackendchat.models.documents.Mensaje;
import com.mgbt.springbootbackendchat.models.service.IChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import java.util.Date;
import java.util.Random;

@Controller
public class ChatController {

    @Autowired
    private IChatService chatService;

    @Autowired
    private SimpMessagingTemplate webSocket;

    private String[] colores = {"red", "green", "blue", "magenta", "purple", "orange"};

    //Se va a interponer el prefijo "app" configurado en WebSocketConfig
    @MessageMapping("/mensaje")
    @SendTo("/chat/mensaje") //A este evento se enviara la respuesta (lo que se notificara a todos los clientes)
    public Mensaje recibeMensaje(Mensaje mensaje) {
        mensaje.setFecha(new Date().getTime());
        if (mensaje.getTipo().equals("NUEVO_USUARIO")) {
            Integer random = new Random().nextInt(colores.length);
            mensaje.setColor(colores[random]);
            mensaje.setTexto("Nuevo usuario conectado");
        } else {
            chatService.guardar(mensaje);
        }
        return mensaje;
    }

    @MessageMapping("/escribiendo")
    @SendTo("/chat/escribiendo")
    public String estaEscribiendo(String username) {
        return username + " esta escribiendo...";
    }

    @MessageMapping("/historial")
    public void historial(String clienteId) {
        //Realiza lo mismo que el SendTo pero se puede personalizar el nombre de destino
        //para agregar variables
        webSocket.convertAndSend("/chat/historial/" + clienteId, chatService.obtenerUltimos10Mensajes());
    }
}
