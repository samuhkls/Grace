package br.com.grace.model;

import jakarta.persistence.*;

@Entity
@Table(name = "estoque_doacoes")
public class EstoqueDoacoes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_doacao_id", nullable = false)
    private TipoDoacao tipoDoacao;

    private Integer quantidade;

    // Construtor padrão
    public EstoqueDoacoes() {}

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TipoDoacao getTipoDoacao() {
        return tipoDoacao;
    }

    public void setTipoDoacao(TipoDoacao tipoDoacao) {
        this.tipoDoacao = tipoDoacao;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }
}
