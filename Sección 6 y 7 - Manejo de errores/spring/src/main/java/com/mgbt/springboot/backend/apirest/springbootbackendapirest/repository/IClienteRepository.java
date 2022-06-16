package com.mgbt.springboot.backend.apirest.springbootbackendapirest.repository;

import com.mgbt.springboot.backend.apirest.springbootbackendapirest.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IClienteRepository extends JpaRepository<Cliente, Long> {
}
