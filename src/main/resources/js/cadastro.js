document.addEventListener('DOMContentLoaded', function() {

    const toastifyScript = document.createElement('script');
    toastifyScript.src = 'https://cdn.jsdelivr.net/npm/toastify-js';
    toastifyScript.onload = initForm;
    document.head.appendChild(toastifyScript);

    const toastifyStyle = document.createElement('link');
    toastifyStyle.rel = 'stylesheet';
    toastifyStyle.href = 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css';
    document.head.appendChild(toastifyStyle);

    function initForm() {
        const cadastroForm = document.getElementById('cadastro-form');
        const emailInput = document.getElementById('email');
        const doadorRadio = document.getElementById('tipo-doador');
        const receptorRadio = document.getElementById('tipo-receptor');


        emailInput.addEventListener('input', function() {
            const emailValue = this.value.trim().toLowerCase();
            const isAdminEmail = emailValue.includes('admin');

            if (isAdminEmail) {

                doadorRadio.disabled = true;
                receptorRadio.disabled = true;

                doadorRadio.checked = false;
                receptorRadio.checked = false;
            } else {

                doadorRadio.disabled = false;
                receptorRadio.disabled = false;
            }
        });

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


    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});