package br.com.grace.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tipo_doacao")
public class TipoDoacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // o nome da categoria, ex: \"HIGIENE\", \"ALIMENTOS\"...
    @Column(nullable = false, unique = true)
    private String nome;

    // construtor JPA
    public TipoDoacao() {}

    public TipoDoacao(String nome) {
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
