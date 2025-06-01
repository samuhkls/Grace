package br.com.grace.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

import br.com.grace.model.Doacao;
import br.com.grace.model.EstoqueDoacoes; // Supondo que EstoqueDoacoesService retorne List<EstoqueDoacoes>
import br.com.grace.model.TipoDoacao;
import br.com.grace.service.DoacaoService;
import br.com.grace.service.EstoqueDoacoesService;
import br.com.grace.repository.TipoDoacaoRepository;

import java.util.Collections;
import java.util.List;

@Controller
public class AdminController {

    @Autowired
    private DoacaoService doacaoService;

    @Autowired
    private EstoqueDoacoesService estoqueService;

    @Autowired
    private TipoDoacaoRepository tipoDoacaoRepository;

    @GetMapping("/admin")
    public String exibirPainelAdmin(Model model) {
        System.out.println("--- AdminController.exibirPainelAdmin --- Carregando todos os dados ---");

        // 1. Doacoes (para o card de resumo e para a tabela "Entradas de Estoque")
        System.out.println("--- AdminController: Buscando 'doacoes' (List<Doacao>) do DoacaoService...");
        try {
            if (doacaoService == null) {
                System.err.println("--- AdminController: ERRO FATAL - doacaoService está NULL!");
                model.addAttribute("doacoes", Collections.emptyList());
            } else {
                List<Doacao> doacoesList = doacaoService.listar();
                if (doacoesList == null) {
                    System.out.println("--- AdminController: ATENÇÃO!!! doacaoService.listar() RETORNOU NULL. Usando lista vazia.");
                    model.addAttribute("doacoes", Collections.emptyList());
                } else {
                    System.out.println("--- AdminController: doacaoService.listar() retornou " + doacoesList.size() + " doações.");
                    model.addAttribute("doacoes", doacoesList);
                }
            }
        } catch (Exception e) {
            System.err.println("--- AdminController: Exceção ao buscar 'doacoes': " + e.getMessage());
            e.printStackTrace();
            model.addAttribute("doacoes", Collections.emptyList());
        }

        // 2. Estoque (para um possível resumo de saldo de estoque em outra aba/seção)
        // Este é o List<EstoqueDoacoes> ou similar, não o histórico de entradas.
        System.out.println("--- AdminController: Buscando 'estoque' (saldo agregado) do EstoqueDoacoesService...");
        try {
            if (estoqueService == null) {
                System.err.println("--- AdminController: ERRO FATAL - estoqueService está NULL!");
                model.addAttribute("estoque", Collections.emptyList());
            } else {
                List<?> estoqueAgregadoList = estoqueService.listarEstoque(); // Assumindo que isso retorna o saldo
                if (estoqueAgregadoList == null) {
                    System.out.println("--- AdminController: ATENÇÃO!!! estoqueService.listarEstoque() RETORNOU NULL. Usando lista vazia.");
                    model.addAttribute("estoque", Collections.emptyList());
                } else {
                    System.out.println("--- AdminController: estoqueService.listarEstoque() retornou " + estoqueAgregadoList.size() + " itens de saldo de estoque.");
                    model.addAttribute("estoque", estoqueAgregadoList);
                }
            }
        } catch (Exception e) {
            System.err.println("--- AdminController: Exceção ao buscar 'estoque' (saldo): " + e.getMessage());
            e.printStackTrace();
            model.addAttribute("estoque", Collections.emptyList());
        }

        // 3. Tipos (para o formulário de nova doação)
        System.out.println("--- AdminController: Buscando 'tipos' (List<TipoDoacao>) do TipoDoacaoRepository...");
        try {
            if (tipoDoacaoRepository == null) {
                System.err.println("--- AdminController: ERRO FATAL - tipoDoacaoRepository está NULL!");
                model.addAttribute("tipos", Collections.emptyList());
            } else {
                List<TipoDoacao> tiposList = tipoDoacaoRepository.findAll();
                if (tiposList == null) {
                    System.out.println("--- AdminController: ATENÇÃO!!! tipoDoacaoRepository.findAll() RETORNOU NULL. Usando lista vazia.");
                    model.addAttribute("tipos", Collections.emptyList());
                } else {
                    System.out.println("--- AdminController: tipoDoacaoRepository.findAll() retornou " + tiposList.size() + " tipos.");
                    model.addAttribute("tipos", tiposList);
                }
            }
        } catch (Exception e) {
            System.err.println("--- AdminController: Exceção ao buscar 'tipos': " + e.getMessage());
            e.printStackTrace();
            model.addAttribute("tipos", Collections.emptyList());
        }

        // 4. Nova Doacao (para o formulário)
        Doacao novaDoacaoObj = new Doacao();
        novaDoacaoObj.setTipoDoacao(new TipoDoacao());
        model.addAttribute("novaDoacao", novaDoacaoObj);
        System.out.println("--- AdminController: Configurando 'novaDoacao' para o formulário.");

        System.out.println("--- AdminController.exibirPainelAdmin --- FIM DO METODO ---");
        return "adm";
    }

    @PostMapping("/doacoes/adicionar")
    public String adicionarDoacao(@ModelAttribute("novaDoacao") Doacao doacao) {
        System.out.println("--- AdminController.adicionarDoacao --- Recebido: " + (doacao != null ? doacao.toString() : "null"));

        if (doacao == null || doacao.getTipoDoacao() == null || doacao.getTipoDoacao().getId() == null) {
            System.err.println("--- AdminController: Dados incompletos para adicionar doação (TipoDoacao ou ID nulo).");
            return "redirect:/admin?error=dados_incompletos";
        }

        try {
            TipoDoacao tipoSelecionado = tipoDoacaoRepository.findById(doacao.getTipoDoacao().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Tipo de Doação inválido ID: " + doacao.getTipoDoacao().getId()));
            doacao.setTipoDoacao(tipoSelecionado);

            // ATENÇÃO: Certifique-se de que o usuário está sendo definido na doação antes de salvar,
            // se for um campo obrigatório e não for definido automaticamente.
            // Ex: Usuario usuarioLogado = ... ; doacao.setUsuario(usuarioLogado);

            if (doacaoService == null) {
                System.err.println("--- AdminController.adicionarDoacao: ERRO FATAL - doacaoService está NULL!");
                return "redirect:/admin?error=servico_indisponivel";
            }
            doacaoService.salvar(doacao); // O DoacaoService deve lidar com a atualização do EstoqueDoacoes
            System.out.println("--- AdminController.adicionarDoacao: Doação salva com sucesso.");

        } catch (IllegalArgumentException e) {
            System.err.println("--- AdminController: Erro de argumento ao salvar doação (ex: TipoDoacao não encontrado): " + e.getMessage());
            e.printStackTrace();
            return "redirect:/admin?error=tipo_doacao_invalido";
        } catch (Exception e) {
            System.err.println("--- AdminController: Exceção geral ao salvar doação: " + e.getMessage());
            e.printStackTrace();
            return "redirect:/admin?error=salvar_doacao_exception";
        }
        return "redirect:/admin";
    }
}