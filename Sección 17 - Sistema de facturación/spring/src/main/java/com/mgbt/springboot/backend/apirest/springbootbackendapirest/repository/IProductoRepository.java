package com.mgbt.springboot.backend.apirest.springbootbackendapirest.repository;

import com.mgbt.springboot.backend.apirest.springbootbackendapirest.entity.Producto;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IProductoRepository extends CrudRepository<Producto, Long> {

    public List<Producto> findByNombreContainingIgnoreCase(String nombre);
}
