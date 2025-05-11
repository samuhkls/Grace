package br.com.grace.model;

import java.time.LocalDateTime;

public class ItemDoacao {

    private Long id;

    private TipoDoacao tipo;

    private String descricao;
    private LocalDateTime dataDoacao = LocalDateTime.now();


}
