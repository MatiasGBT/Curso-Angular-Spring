package com.mgbt.springboot.backend.apirest.springbootbackendapirest.service;

import com.mgbt.springboot.backend.apirest.springbootbackendapirest.entity.Cliente;
import java.util.List;

public interface IClienteService {

    public List<Cliente> findAll();
}
