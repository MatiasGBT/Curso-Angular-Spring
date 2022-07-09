package com.mgbt.springboot.backend.apirest.springbootbackendapirest.service;

import com.mgbt.springboot.backend.apirest.springbootbackendapirest.entity.Usuario;

public interface IUsuarioService {
    public Usuario findByUsername(String username);
}
