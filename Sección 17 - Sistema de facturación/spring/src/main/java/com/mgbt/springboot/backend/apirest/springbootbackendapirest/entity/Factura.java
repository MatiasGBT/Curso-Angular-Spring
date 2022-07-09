package com.mgbt.springboot.backend.apirest.springbootbackendapirest.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "facturas")
public class Factura implements Serializable {
    private static final long serialVersionUID = 1L;

    public Factura() {
        this.items = new ArrayList<>();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descripcion;
    private String observacion;

    @Column(name = "create_at")
    @Temporal(TemporalType.DATE)
    private Date createAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"facturas","hibernateLazyInitializer","handler"})
    private Cliente cliente;

    //Como es una relación unidireccional (ItemFactura no tiene definido un atributo Factura)
    //hay que aclarar el JoinColumn para que genere la relación
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "factura_id")
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer","handler"}, allowSetters = true)
    private List<ItemFactura> items;

    @PrePersist
    public void prePersist() {
        this.createAt = new Date();
    }

    public Double getTotal() {
        Double total = items.stream().mapToDouble(item -> item.getImporte()).sum();
        return total;
    }
}
