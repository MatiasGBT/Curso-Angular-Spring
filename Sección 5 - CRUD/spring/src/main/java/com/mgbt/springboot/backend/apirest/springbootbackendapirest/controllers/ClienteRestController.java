package com.mgbt.springboot.backend.apirest.springbootbackendapirest.controllers;

import com.mgbt.springboot.backend.apirest.springbootbackendapirest.entity.Cliente;
import com.mgbt.springboot.backend.apirest.springbootbackendapirest.service.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @GetMapping("/clientes/{id}")
    public Cliente show(@PathVariable Long id) {
        return clienteService.findById(id);
    }

    //Hay que indicar que es un @RequestBody debido a que el objeto
    //viene en formato json
    @PostMapping("/clientes")
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente create(@RequestBody Cliente cliente) {
        //Hay que asignarle una fecha, esto se hace en el método prePersist
        //de la clase Cliente
        return clienteService.save(cliente);
    }
    //No utlizamos el @ResponseStatus en los métodos de arriba debido a que
    //si funcionan ya mandarían el status OK, por lo que sería redundante

    @PutMapping("/clientes/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente update(@PathVariable Long id, @RequestBody Cliente cliente) {
        Cliente clienteActual = clienteService.findById(id);
        clienteActual.setApellido(cliente.getApellido());
        clienteActual.setNombre(cliente.getNombre());
        clienteActual.setEmail(cliente.getEmail());
        return clienteService.save(clienteActual);
    }

    @DeleteMapping("/clientes/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        clienteService.delete(id);
    }
}
