package com.mgbt.springbootbackendchat.models.service;

import com.mgbt.springbootbackendchat.models.documents.Mensaje;

import java.util.List;

public interface IChatService {
    public List<Mensaje> obtenerUltimos10Mensajes();
    public Mensaje guardar(Mensaje mensaje);
}
