// Script para animação e interatividade do infográfico
document.addEventListener("DOMContentLoaded", function () {
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Seleciona todos os itens do infográfico
    const infograficoItems = document.querySelectorAll('.infografico-item');

    // Função para animar os números nas estatísticas
    function animateNumber(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);

            // Verifica se o número é negativo (como no caso de -45%)
            if (element.textContent.trim().startsWith('-')) {
                element.textContent = `-${currentValue}%`;
            } else {
                element.textContent = `${currentValue}%`;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Efeito de destaque ao passar o mouse sobre os itens
    infograficoItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.15)';

            // Destaca o ícone
            const icon = this.querySelector('.infografico-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.12)';

            // Restaura o ícone
            const icon = this.querySelector('.infografico-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Função para iniciar a animação quando os elementos estiverem visíveis
    function animateOnScroll() {
        infograficoItems.forEach(item => {
            if (isElementInViewport(item) && !item.classList.contains('animated')) {
                // Marca o item como animado
                item.classList.add('animated');

                // Anima o número de estatística
                const statNumber = item.querySelector('.stat-number');
                if (statNumber) {
                    const text = statNumber.textContent.trim();
                    let value;

                    if (text.startsWith('-')) {
                        value = parseInt(text.replace(/[^0-9]/g, ''));
                        setTimeout(() => {
                            animateNumber(statNumber, 0, value, 1500);
                        }, 500);
                    } else if (text.includes('%')) {
                        value = parseInt(text.replace(/[^0-9]/g, ''));
                        setTimeout(() => {
                            animateNumber(statNumber, 0, value, 1500);
                        }, 500);
                    }
                }
            }
        });
    }

    // Inicia a verificação quando a página carrega e durante o scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Verifica uma vez quando a página carrega
}); 