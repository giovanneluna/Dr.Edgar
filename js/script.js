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

// === AVIF SUPPORT CHECK AND FALLBACK ===
function checkAvifSupport() {
  return new Promise((resolve) => {
    const avif = new Image()
    avif.onload = () => resolve(true)
    avif.onerror = () => resolve(false)
    avif.src =
      "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A="
  })
}

// === MOBILE LAYOUT FIXES ===
function initMobileFixes() {
  // Detectar se é dispositivo móvel
  const isMobile = window.innerWidth <= 768
  const isTouch = "ontouchstart" in window

  if (isMobile || isTouch) {
    // Verificar suporte a AVIF
    checkAvifSupport().then((supportsAvif) => {
      if (!supportsAvif) {
        console.log("AVIF não suportado, implementando fallbacks...")
        // Aqui você pode implementar lógica para carregar versões JPG das imagens
      }
    })

    // Corrigir problemas específicos da seção de especialidades
    const especialidadeSection = document.querySelector(
      ".container-section-especialidade-premium"
    )
    const especialidadeCards = document.querySelectorAll(
      ".especialidade-premium-card"
    )

    if (especialidadeSection) {
      // Garantir que a seção não tenha overflow horizontal
      especialidadeSection.style.overflowX = "hidden"
      especialidadeSection.style.maxWidth = "100%"
    }

    if (especialidadeCards.length) {
      especialidadeCards.forEach((card) => {
        // Remover transforms que podem causar problemas em mobile
        card.style.willChange = "auto"

        // Otimizar imagens para mobile
        const cardImage = card.querySelector(
          ".card-premium-image-container img"
        )
        if (cardImage) {
          cardImage.style.transform = "none"
          cardImage.loading = "lazy"

          // Adicionar listener para erro de carregamento
          cardImage.addEventListener("error", function () {
            console.log("Erro ao carregar imagem:", this.src)
            this.style.backgroundColor = "#f0f0f0"
            this.style.minHeight = "160px"
          })
        }

        // Melhorar touch interaction
        card.addEventListener("touchstart", function () {
          this.style.opacity = "0.9"
        })

        card.addEventListener("touchend", function () {
          this.style.opacity = "1"
        })
      })
    }

    // Corrigir problemas de altura viewport em mobile
    const updateVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    updateVH()
    window.addEventListener("resize", updateVH)
    window.addEventListener("orientationchange", () => {
      setTimeout(updateVH, 100)
    })
  }
}

// Funções que serão executadas quando o DOM for carregado
window.addEventListener("load", () => {
  initSmoothScroll()
  initAnimaScroll()
  initInfographics()
  initMobileFixes() // Adicionar correções mobile
})
