package com.mgbt.springboot.backend.apirest.springbootbackendapirest.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "clientes")
public class Cliente implements Serializable {
    private static final long serialVersionUID = 1L;

    public Cliente() {
        this.facturas = new ArrayList<>();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "no puede estar vacío")
    @Size(min=4, max=12, message = "debe contener entre 4 a 12 caracteres")
    @Column(nullable = false)
    private String nombre;

    @NotEmpty(message = "no puede estar vacío")
    private String apellido;

    @NotEmpty(message = "no puede estar vacío")
    @Email(message = "debe tener un formato correcto (ejemplo: email@email.com)")
    @Column(nullable = false, unique = true)
    private String email;

    @NotNull(message = "no puede estar vacío")
    @Column(name = "create_at")
    @Temporal(TemporalType.DATE)
    private Date createAt;

    private String foto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
    @NotNull(message = "no puede estar vacío")
    private Region region;
    //Con Hibernate al utilizar Lazy loading el JSON se genera con dos atributos de más
    //por lo que hay que ignorarlos para no generar errores

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cliente", cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = {"cliente","hibernateLazyInitializer","handler"}, allowSetters = true)
    private List<Factura> facturas;
    //JsonIgnoreProperties value para que no se defina de forma recursiva y cree un JSON gigante
    //JsonIgnoreProperties aallowSetters para evitar un error de recursión en el que, al tratar
    //de editar un cliente despues de agregarle una factura, tire error
}
