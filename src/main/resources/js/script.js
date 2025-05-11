function initMap() {
    const location = { lat: -23.334640, lng: -46.837660 }; 
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: location,
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
    //codigo para mapa usado no rodape
}

// script.js

//codigo para pagina de login
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Impede o envio do formulário

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        // Validação simples
        if (email === "" || senha === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Aqui você pode adicionar mais validações, como verificar o formato do e-mail

        // Se tudo estiver correto, você pode enviar o formulário ou fazer uma requisição AJAX
        alert("Login realizado com sucesso!"); // Exemplo de mensagem de sucesso
        // form.submit(); // Descomente esta linha se quiser enviar o formulário
    });
});

//codigo para pagina de redefinir senha
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const senha = document.getElementById('senha');
    const confirmSenha = document.getElementById('confirm-senha');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error';

    // Limpa mensagens de erro anteriores
    const existingError = document.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }

    // Verifica se as senhas são iguais
    if (senha.value !== confirmSenha.value) {
        errorMessage.textContent = 'As senhas não coincidem.';
        document.querySelector('.login-container').appendChild(errorMessage);
        return;
    }

    // Aqui você pode adicionar a lógica para enviar a nova senha para o servidor
    alert('Senha redefinida com sucesso!');
});


//codigo para pagina de cadastro
// Adicionando um ID único para o campo de confirmação de senha
const confirmSenhaInput = document.createElement('input');
confirmSenhaInput.type = 'password';
confirmSenhaInput.id = 'confirm-senha';
confirmSenhaInput.name = 'confirm-senha';
confirmSenhaInput.required = true;

const confirmSenhaLabel = document.createElement('label');
confirmSenhaLabel.setAttribute('for', 'confirm-senha');
confirmSenhaLabel.textContent = 'Confirme a Senha:';

const formGroup = document.querySelector('.form-group:last-child');
formGroup.appendChild(confirmSenhaLabel);
formGroup.appendChild(confirmSenhaInput);

document.getElementById('cadastro-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmSenha = document.getElementById('confirm-senha').value;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!nome || !email || !senha || !confirmSenha) {
        alert('Por favor, preencha todos os campos obrigatórios.'); // Mensagem de erro
        return;
    }

    // Verifica se as senhas são iguais
    if (senha !== confirmSenha) {
        alert('As senhas não coincidem.'); // Mensagem de erro
        return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados do usuário para o servidor
    // Por exemplo, usando fetch ou XMLHttpRequest para enviar os dados para uma API

    // Simulação de cadastro bem-sucedido
    alert('Cadastro realizado com sucesso!');

    // Redireciona para a página de doações
    window.location.href = "login.html"; // Altere para o caminho correto da sua página de doações
});

//funcoes para a pagina de doacao
function doarOnline() {
    const numeroTelefone = '5511967882241'; // Substitua pelo número de telefone desejado
    const mensagem = 'Olá, gostaria de fazer uma doação!'; // Mensagem pré-definida
    const urlWhatsApp = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank'); // Abre o WhatsApp em uma nova aba
}

function doarPayPal() {
    alert("Você será redirecionado para o PayPal.");
    window.location.href = "https://www.paypal.com"; // Altere para o link correto do PayPal
}

