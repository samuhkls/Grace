package br.com.grace.model;

import jakarta.persistence.*;

import java.time.LocalDate;
@Entity
public class Doacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeDoador;

    @Enumerated(EnumType.STRING)
    private TipoDoacao tipo;

    private LocalDate data;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeDoador() {
        return nomeDoador;
    }

    public void setNomeDoador(String nomeDoador) {
        this.nomeDoador = nomeDoador;
    }

    public TipoDoacao getTipo() {
        return tipo;
    }

    public void setTipo(TipoDoacao tipo) {
        this.tipo = tipo;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }
}
