package com.mgbt.springboot.backend.apirest.springbootbackendapirest.service;

import com.mgbt.springboot.backend.apirest.springbootbackendapirest.entity.Cliente;
import com.mgbt.springboot.backend.apirest.springbootbackendapirest.repository.IClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClienteService implements IClienteService {

    @Autowired
    private IClienteRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Cliente> findAll() {
        return repository.findAll();
    }

    @Override
    @Transactional(readOnly = false)
    public Cliente save(Cliente cliente) {
        return repository.save(cliente);
    }

    @Override
    @Transactional(readOnly = false)
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Cliente findById(Long id) {
        return repository.findById(id).orElse(null);
    }
}
