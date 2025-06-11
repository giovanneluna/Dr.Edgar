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

// Função para adicionar efeito de smooth scroll aos links
function initSmoothScroll() {
  const linksInternos = document.querySelectorAll('.js-menu a[href^="#"]')

  function scrollToSection(event) {
    event.preventDefault()
    const href = event.currentTarget.getAttribute("href")
    const section = document.querySelector(href)

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  linksInternos.forEach((link) => {
    link.addEventListener("click", scrollToSection)
  })
}

// Função para animar os elementos quando entrarem na viewport
function initAnimaScroll() {
  const sections = document.querySelectorAll("[data-anime]")

  function animaScroll() {
    const windowTop = window.pageYOffset + window.innerHeight * 0.75

    sections.forEach((section) => {
      if (windowTop > section.offsetTop) {
        section.classList.add("anime")
      }
    })
  }

  if (sections.length) {
    animaScroll()
    window.addEventListener("scroll", animaScroll)
  }
}

// Função para inicializar os infográficos
function initInfographics() {
  const infographicCards = document.querySelectorAll(".infographic-card")

  if (infographicCards.length) {
    infographicCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.classList.add("active")
      })

      card.addEventListener("mouseleave", () => {
        card.classList.remove("active")
      })
    })
  }
}

// Funções que serão executadas quando o DOM for carregado
window.addEventListener("load", () => {
  initSmoothScroll()
  initAnimaScroll()
  initInfographics()
})
