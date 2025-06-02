package br.com.grace.service;

import br.com.grace.model.Doacao;
import br.com.grace.model.EstoqueDoacoes;
import br.com.grace.model.TipoDoacao;
import br.com.grace.model.Usuario;
import br.com.grace.repository.DoacaoRepository;
import br.com.grace.repository.EstoqueDoacoesRepository;
import br.com.grace.repository.TipoDoacaoRepository;
// Remova UsuarioRepository se não for usado diretamente aqui
// import br.com.grace.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired; // Remova se usar só construtor
import org.springframework.stereotype.Service;

// Importe LocalDate se for realmente usar, senão remova
// import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DoacaoService {
    private final DoacaoRepository doacaoRepository; // Renomeado para 'doacaoRepository' para clareza
    private final TipoDoacaoRepository tipoDoacaoRepository;
    private final EstoqueDoacoesRepository estoqueRepository;
    private final NotificationService notificationService; // NOVA INJEÇÃO

    // Construtor atualizado para incluir NotificationService
    public DoacaoService(DoacaoRepository doacaoRepository,
                         TipoDoacaoRepository tipoDoacaoRepository,
                         EstoqueDoacoesRepository estoqueRepository,
                         NotificationService notificationService) { // Adicionado aqui
        this.doacaoRepository = doacaoRepository;
        this.tipoDoacaoRepository = tipoDoacaoRepository;
        this.estoqueRepository = estoqueRepository;
        this.notificationService = notificationService; // Atribuído aqui
    }

    // O método salvar(Doacao) simples pode ser mantido se usado em outros lugares,
    // mas realizarDoacao é mais completo para o fluxo com notificação.
    public void salvar(Doacao doacao) {
        doacaoRepository.save(doacao);
        // Considere se este 'salvar' também deveria enviar notificação ou atualizar estoque,
        // ou se 'realizarDoacao' é o ponto central para isso.
    }

    public List<Doacao> listar() {
        // Os logs de teste podem ser removidos ou ajustados para SLF4J se desejar
        if (this.doacaoRepository == null) {
            System.out.println("DoacaoService.listar() - ERRO: this.doacaoRepository deu null!");
            return List.of(); // Retorna lista vazia em caso de erro grave
        } else {
            System.out.println("DoacaoService.listar() - this.doacaoRepository é: " + this.doacaoRepository.getClass().getName());
        }

        List<Doacao> doacoesEncontradas = this.doacaoRepository.findAll();

        if (doacoesEncontradas == null) { // JpaRepository.findAll() não deveria retornar null
            System.out.println("DoacaoService.listar() - ATENÇÃO: doacaoRepository.findAll() retornou NULL! Retornando lista vazia.");
            return List.of();
        } else {
            System.out.println("DoacaoService.listar() - doacaoRepository.findAll() retornou " + doacoesEncontradas.size() + " itens.");
        }
        return doacoesEncontradas;
    }

    public Doacao realizarDoacao(Usuario usuario, Long tipoId, int quantidade) { // Mudado para retornar Doacao
        System.out.println("--- DoacaoService.realizarDoacao --- Iniciando para usuário: " + (usuario != null ? usuario.getNome() : "NULO"));
        Doacao doacao = new Doacao();

        if (usuario == null) {
            System.err.println("Tentativa de realizar doação com usuário nulo.");
            throw new IllegalArgumentException("Usuário não pode ser nulo para realizar doação.");
        }
        doacao.setUsuario(usuario);
        doacao.setDataHora(LocalDateTime.now());

        TipoDoacao tipo = tipoDoacaoRepository.findById(tipoId)
                .orElseThrow(() -> {
                    System.err.println("Tipo de doação inválido ID: " + tipoId);
                    return new IllegalArgumentException("Tipo de doação inválido ID: " + tipoId);
                });

        doacao.setTipoDoacao(tipo);
        doacao.setQuantidade(quantidade);

        Doacao doacaoSalva = doacaoRepository.save(doacao);
        System.out.println("--- DoacaoService.realizarDoacao --- Doação salva com ID: " + doacaoSalva.getId());

        // Atualizar EstoqueDoacoes
        EstoqueDoacoes estoque = estoqueRepository.findByTipoDoacaoId(tipoId);
        if (estoque == null) {
            estoque = new EstoqueDoacoes();
            estoque.setTipoDoacao(tipo);
            estoque.setQuantidade(quantidade);
            System.out.println("--- DoacaoService.realizarDoacao --- Criando novo item de estoque para tipo ID: " + tipoId);
        } else {
            estoque.setQuantidade(estoque.getQuantidade() + quantidade);
            System.out.println("--- DoacaoService.realizarDoacao --- Atualizando estoque existente para tipo ID: " + tipoId + ". Nova qtd: " + estoque.getQuantidade());
        }
        estoqueRepository.save(estoque);
        System.out.println("--- DoacaoService.realizarDoacao --- Estoque salvo/atualizado.");

        // Enviar e-mail de agradecimento
        try {
            if (notificationService == null) {
                System.err.println("--- DoacaoService.realizarDoacao --- ERRO FATAL: notificationService está NULL!");
            } else {
                System.out.println("--- DoacaoService.realizarDoacao --- Chamando notificationService.enviarEmailAgradecimento...");
                notificationService.enviarEmailAgradecimento(doacaoSalva);
            }
        } catch (Exception e) {
            System.err.println("--- DoacaoService.realizarDoacao --- Exceção ao tentar enviar e-mail de agradecimento: " + e.getMessage());
            e.printStackTrace(); // Logar a exceção, mas não interromper o fluxo principal da doação
        }

        System.out.println("--- DoacaoService.realizarDoacao --- Finalizado para doação ID: " + doacaoSalva.getId());
        return doacaoSalva; // Retorna a doação salva
    }
}