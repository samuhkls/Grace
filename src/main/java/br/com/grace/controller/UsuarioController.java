package br.com.grace.controller;

import br.com.grace.model.Grupo;
import br.com.grace.model.Usuario;
import br.com.grace.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;

import java.util.Optional;


@Controller
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping("/cadastro")
    public String mostrarFormularioCadastro(Model model) {
        model.addAttribute("usuario", new Usuario());
        return "cadastro"; // nome do HTML (cadastro.html)
    }

    @PostMapping("/cadastrar")
    public String cadastrarMembro(@ModelAttribute Usuario usuario, Model model) {

        usuario.setTipo(Grupo.MEMBRO);

        usuarioRepository.save(usuario);

        model.addAttribute("mensagem", "Usuário cadastrado com sucesso!");
        return "redirect:/login"; // Redireciona para a página de login após cadastro
    }

    public String cadastrarAdministrador(String nome, String email, String senha, Usuario solicitante) {
        if (solicitante == null || solicitante.getTipo() != Grupo.ADMINISTRADOR) {
            throw new RuntimeException("Apenas administradores podem cadastrar novos administradores.");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(senha); // Em produção, encriptar senha
        usuario.setTipo(Grupo.ADMINISTRADOR);
        usuarioRepository.save(usuario);
        return "redirect:/login";
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }


}
