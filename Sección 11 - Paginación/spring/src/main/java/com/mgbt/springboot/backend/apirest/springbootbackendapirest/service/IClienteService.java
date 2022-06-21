package com.mgbt.springboot.backend.apirest.springbootbackendapirest.service;

import com.mgbt.springboot.backend.apirest.springbootbackendapirest.entity.Cliente;
import org.springframework.data.domain.*;

import java.util.List;

public interface IClienteService {

    public List<Cliente> findAll();

    public Page<Cliente> findAll(Pageable pageable);

    public Cliente save(Cliente cliente);

    public void delete(Long id);

    public Cliente findById(Long id);
}
