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
document.addEventListener("DOMContentLoaded", function () {
  // Função para inicializar animações
  if (window.SimpleAnime) {
    new SimpleAnime()
  }
})

// === FAQ ACCORDION FUNCTIONALITY ===
function toggleFaq(element) {
  const faqItem = element.parentElement
  const faqAnswer = faqItem.querySelector(".faq-answer")
  const isActive = faqItem.classList.contains("active")

  // Fechar todos os outros accordions
  document.querySelectorAll(".faq-item.active").forEach((item) => {
    if (item !== faqItem) {
      item.classList.remove("active")
    }
  })

  // Toggle do accordion atual
  if (isActive) {
    faqItem.classList.remove("active")
  } else {
    faqItem.classList.add("active")
  }
}
