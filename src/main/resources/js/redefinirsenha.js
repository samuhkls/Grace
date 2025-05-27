document.addEventListener('DOMContentLoaded', function() {
    // Carrega Toastify dinamicamente
    if (typeof Toastify === 'undefined') {
        const toastifyScript = document.createElement('script');
        toastifyScript.src = 'https://cdn.jsdelivr.net/npm/toastify-js';
        toastifyScript.onload = initResetForm;
        document.head.appendChild(toastifyScript);

        const toastifyStyle = document.createElement('link');
        toastifyStyle.rel = 'stylesheet';
        toastifyStyle.href = 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css';
        document.head.appendChild(toastifyStyle);
    } else {
        initResetForm();
    }

    function initResetForm() {
        const resetForm = document.getElementById('login-form'); // Usando o ID existente no HTML
        
        resetForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const senha = document.getElementById('senha').value;
            const confirmSenha = document.getElementById('confirm-senha').value;

            // Validações
            if (!senha || !confirmSenha) {
                showToast("Por favor, preencha todos os campos.", "error");
                return;
            }

            if (senha.length < 6) {
                showToast("A senha deve ter pelo menos 6 caracteres.", "error");
                return;
            }

            if (senha !== confirmSenha) {
                showToast("As senhas não coincidem. Por favor, verifique.", "error");
                return;
            }

            // Simulação de envio para o servidor
            simulatePasswordReset(senha)
                .then(() => {
                    showToast("Senha redefinida com sucesso! Redirecionando...", "success");
                    
                    // Redireciona após 3 segundos
                    setTimeout(() => {
                        window.location.href = 'login.html'; // Altere para a página desejada
                    }, 3000);
                })
                .catch(error => {
                    showToast("Erro ao redefinir senha. Tente novamente.", "error");
                    console.error("Erro:", error);
                });
        });
    }

    function showToast(message, type) {
        const backgroundColor = type === "error" ? "#f44336" : "#4caf50";
        
        Toastify({
            text: message,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor,
            stopOnFocus: true,
            style: {
                fontFamily: "'Poppins', sans-serif",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }
        }).showToast();
    }

    // Função simulada para reset de senha (substitua pela chamada real à API)
    function simulatePasswordReset(newPassword) {
        return new Promise((resolve, reject) => {
            // Simula um delay de rede
            setTimeout(() => {
                // Simula sucesso 90% das vezes para demonstração
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error("Erro de servidor simulado"));
                }
            }, 1000);
        });
    }
});