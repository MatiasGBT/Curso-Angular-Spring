package com.mgbt.springboot.backend.apirest.springbootbackendapirest.repository;

import com.mgbt.springboot.backend.apirest.springbootbackendapirest.entity.Factura;
import org.springframework.data.repository.CrudRepository;

public interface IFacturaRepository extends CrudRepository<Factura, Long> {
}
