<script>
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('[role="tabpanel"]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.add('hidden'));

            tab.classList.add('active');
            const target = document.getElementById(tab.getAttribute('aria-controls'));
            target.classList.remove('hidden');
            target.classList.add('active');
        });
    });
</script>
