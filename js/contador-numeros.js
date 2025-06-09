// Script para animação dos contadores na seção "Meus Números"
document.addEventListener("DOMContentLoaded", function () {
    // Função para verificar se um elemento está visível na viewport com margem
    function isElementInViewport(el) {
        if (!el) return false;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Considerar o elemento visível quando 30% dele estiver na viewport
        return (
            rect.top <= windowHeight * 0.7 &&
            rect.bottom >= 0
        );
    }

    // Função para animar a contagem de números
    function animarContador(elemento, inicio, fim, duração, prefixo = '') {
        if (!elemento) return;

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duração, 1);
            const valorAtual = Math.floor(progress * (fim - inicio) + inicio);
            elemento.textContent = `${prefixo}${valorAtual.toLocaleString('pt-BR')}`;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Elementos que contêm os números para animar
    const contadorPacientes = document.getElementById('contador-pacientes');
    const contadorAnos = document.getElementById('contador-anos');

    // Criar flag para controle de animação
    let animacaoIniciada = false;

    // Função para iniciar as animações quando os elementos ficarem visíveis
    function verificarVisibilidade() {
        // Verificar se qualquer contador está visível
        if (!animacaoIniciada &&
            (isElementInViewport(contadorPacientes) || isElementInViewport(contadorAnos))) {

            // Marcar que a animação foi iniciada
            animacaoIniciada = true;

            // Animar contador de pacientes
            if (contadorPacientes) {
                setTimeout(() => {
                    animarContador(contadorPacientes, 0, 5000, 1500, '+');
                }, 300);
            }

            // Animar contador de anos
            if (contadorAnos) {
                setTimeout(() => {
                    animarContador(contadorAnos, 0, 10, 1500, '+');
                }, 500);
            }
        }
    }

    // Verificar quando a página carrega e durante a rolagem
    window.addEventListener('scroll', verificarVisibilidade);
    // Iniciar verificação após um pequeno delay para garantir que o DOM foi renderizado
    setTimeout(verificarVisibilidade, 500);
}); 