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

}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if (email === "" || senha === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        alert("Login realizado com sucesso!");
    });
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const senha = document.getElementById('senha');
    const confirmSenha = document.getElementById('confirm-senha');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error';

    const existingError = document.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }

    if (senha.value !== confirmSenha.value) {
        errorMessage.textContent = 'As senhas não coincidem.';
        document.querySelector('.login-container').appendChild(errorMessage);
        return;
    }

    alert('Senha redefinida com sucesso!');
});


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
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmSenha = document.getElementById('confirm-senha').value;


    if (!nome || !email || !senha || !confirmSenha) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    if (senha !== confirmSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    alert('Cadastro realizado com sucesso!');

    window.location.href = "login.html";
});

function doarOnline() {
    const numeroTelefone = '5511967882241';
    const mensagem = 'Olá, gostaria de fazer uma doação!';
    const urlWhatsApp = `https://wa.me/${numeroTelefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank');
}

function doarPayPal() {
    alert("Você será redirecionado para o PayPal.");
    window.location.href = "https://www.paypal.com";
}

