package br.com.grace.controller;

import br.com.grace.model.Doacao;
import br.com.grace.service.DoacaoService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/doacoes")
public class DoacaoController {
    private final DoacaoService service;

    public DoacaoController(DoacaoService service) { this.service = service; }

    @GetMapping("/nova")
    public String formDoacao(Doacao doacao) { return "doacao"; }

    @PostMapping("/cadastrar")
    public String cadastrar(Doacao doacao) {
        service.salvar(doacao);
        return "redirect:/doacoes/listar";
    }

    @GetMapping("/listar")
    public String listar(Model model) {
        model.addAttribute("doacoes", service.listar());
        return "doacoes";
    }
}
