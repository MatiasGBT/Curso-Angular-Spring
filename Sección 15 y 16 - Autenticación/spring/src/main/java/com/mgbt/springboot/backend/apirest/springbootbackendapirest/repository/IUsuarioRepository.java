package com.mgbt.springboot.backend.apirest.springbootbackendapirest.repository;

import com.mgbt.springboot.backend.apirest.springbootbackendapirest.entity.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface IUsuarioRepository extends CrudRepository<Usuario, Long> {
    public Usuario findByUsername(String username);
}
