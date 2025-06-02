package br.com.grace.service;

import br.com.grace.model.Doacao;
import br.com.grace.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService implements NotificationService{

    private final JavaMailSender mailSender;

    // Pega o username (email remetente) do application.properties
    @Value("${spring.mail.username}")
    private String emailRemetente;

    @Autowired
    public EmailNotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    @Override
    public void enviarEmailAgradecimento(Doacao doacao) {
        if (doacao == null || doacao.getUsuario() == null || doacao.getUsuario().getEmail() == null) {
            System.err.println("Email de agradecimento não pode ser enviado: dados da doação ou do usuário incompletos.");
            return;
        }

        Usuario doador = doacao.getUsuario();
        String emailDestino = doador.getEmail();
        String nomeDoador = doador.getNome() != null ? doador.getNome() : "Doador(a)";
        String tipoItemDoado = doacao.getTipoDoacao() != null ? doacao.getTipoDoacao().getNome() : "item(ns)";
        Integer quantidade = doacao.getQuantidade() != null ? doacao.getQuantidade() : 0;

        System.out.println("Preparando para enviar e-mail de agradecimento para: " + emailDestino);
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(emailRemetente); // Usa o e-mail configurado
            message.setTo(emailDestino);
            message.setSubject("Agradecimento pela sua Doação - Igreja Nova Sião");

            String textoEmail = String.format(
                    "Prezado(a) %s,\n\n" +
                            "Em nome da Igreja Pentecostal Nova Sião, expressamos nossa sincera gratidão pela sua generosa doação de %d unidade(s) de %s.\n\n" +
                            "Sua contribuição é fundamental e nos permite continuar nossos projetos e abençoar muitas vidas em nossa comunidade.\n\n" +
                            "Que Deus o(a) recompense abundantemente!\n\n" +
                            "Atenciosamente,\n" +
                            "Equipe Grace\n" +
                            "Igreja Pentecostal Nova Sião",
                    nomeDoador, quantidade, tipoItemDoado
            );
            message.setText(textoEmail);
            mailSender.send(message);
            System.out.println("E-mail de agradecimento enviado com sucesso para: " + emailDestino);

        } catch (Exception e) {
            System.err.println("Erro ao enviar e-mail de agradecimento para " + emailDestino + ": " + e.getMessage());
            e.printStackTrace(); // Ajuda a depurar problemas de envio
        }
    }

}
