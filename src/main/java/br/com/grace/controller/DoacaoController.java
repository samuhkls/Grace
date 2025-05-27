package br.com.grace.controller;

import br.com.grace.model.Usuario;
import br.com.grace.service.DoacaoService;
import br.com.grace.service.EstoqueDoacoesService;
import br.com.grace.service.TipoDoacaoService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/usuarios")
public class DoacaoController {

    private final DoacaoService doacaoService;
    private final TipoDoacaoService tipoDoacaoService;
    private final EstoqueDoacoesService estoqueService;

    public DoacaoController(DoacaoService doacaoService,
                            TipoDoacaoService tipoDoacaoService,
                            EstoqueDoacoesService estoqueService) {
        this.doacaoService = doacaoService;
        this.tipoDoacaoService = tipoDoacaoService;
        this.estoqueService = estoqueService;
    }

    @GetMapping("/doacoes")
    public String formDoacao(HttpSession session, Model model) {
        Usuario u = (Usuario) session.getAttribute("usuarioLogado");
        if (u == null) {
            return "redirect:/usuarios/login";
        }

        model.addAttribute("categorias", tipoDoacaoService.listarCategorias());
        model.addAttribute("estoque", estoqueService.listarEstoque());
        return "doacoes";
    }

    @PostMapping("/doacoes")
    public String doar(@RequestParam Long tipoId,
                       @RequestParam Integer quantidade,
                       HttpSession session) {

        Usuario u = (Usuario) session.getAttribute("usuarioLogado");
        if (u == null) {
            return "redirect:/usuarios/login";
        }

        doacaoService.realizarDoacao(u, tipoId, quantidade);
        return "redirect:/usuarios/doacoes?sucesso";
    }
}
