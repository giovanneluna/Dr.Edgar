const root = document.documentElement
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
  "--marquee-elements-displayed"
)
const marqueeContent = document.querySelector("ul.marquee-content")

root.style.setProperty("--marquee-elements", marqueeContent.children.length)

for (let i = 0; i < marqueeElementsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true))
}

// scrow automotico

//Animação
if (window.SimpleAnime) {
  new SimpleAnime()
}

// Inicializar animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
  // Função para inicializar animações
  if (window.SimpleAnime) {
    new SimpleAnime();
  }
});
