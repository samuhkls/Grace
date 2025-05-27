package br.com.grace.controller;

import br.com.grace.model.Usuario;
import br.com.grace.service.UsuarioService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
@RequestMapping("/usuarios")
public class UsuarioController {
    private final UsuarioService service;

    public UsuarioController(UsuarioService service) { this.service = service; }

    @GetMapping("/cadastro")
    public String formCadastro(Usuario usuario) { return "cadastro"; }

    @PostMapping("/cadastrar")
    public String cadastrar(Usuario usuario) {
        service.salvar(usuario);
        return "redirect:/login";
    }

    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String senha,
                        Model model, HttpSession session) {
        Optional<Usuario> sucesso = service.autenticar(email, senha);
        if (sucesso.isPresent()) {
            session.setAttribute("usuarioLogado", sucesso.get());  // armazenando o usuario na sessao para uso futuro
            return "redirect:/";
        } else {
            model.addAttribute("erro", "Usuário ou senha inválidos!");
            return "login";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate(); // limpa a sessão
        return "redirect:/login";
    }


}