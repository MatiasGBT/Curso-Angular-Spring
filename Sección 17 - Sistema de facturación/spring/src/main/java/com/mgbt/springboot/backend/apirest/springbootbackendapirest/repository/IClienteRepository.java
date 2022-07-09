package com.mgbt.springboot.backend.apirest.springbootbackendapirest.repository;

import com.mgbt.springboot.backend.apirest.springbootbackendapirest.entity.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IClienteRepository extends JpaRepository<Cliente, Long> {

    @Query("from Region")
    public List<Region> findAllRegiones();
}
