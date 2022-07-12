package com.mgbt.springbootbackendchat.models.documents;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.io.Serializable;

//Document es como la anotación Entity de JPA. en collection se pone el nombre como en la anotación @Table
@Document(collection = "mensajes") //Si no existe, SpringBoot la crea mediante Spring Data
@Data
public class Mensaje implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    private String texto;
    private Long fecha;
    private String username;
    private String tipo;
    private String color;
}
