package com.mgbt.springboot.backend.apirest.springbootbackendapirest.controllers;

import com.mgbt.springboot.backend.apirest.springbootbackendapirest.entity.Cliente;
import com.mgbt.springboot.backend.apirest.springbootbackendapirest.service.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ClienteRestController {

    @Autowired
    private IClienteService clienteService;

    @GetMapping("/clientes")
    public List<Cliente> index() {
        return clienteService.findAll();
    }
}
