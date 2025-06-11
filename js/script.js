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

// === FORÇA RENDERIZAÇÃO PARA iOS ===
function forceIOSRender() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

  if (isIOS) {
    console.log("🔄 Força renderização para iOS...")

    // Forçar repaint dos elementos críticos
    const criticalElements = document.querySelectorAll(
      ".container-section-especialidade-premium, .especialidade-premium-card, .especialidade-badge"
    )

    criticalElements.forEach((element) => {
      if (element) {
        // Força repaint
        const originalDisplay = element.style.display
        element.style.display = "none"
        element.offsetHeight // trigger reflow
        element.style.display = originalDisplay
      }
    })

    // Força reflow geral
    document.body.style.transform = "translateZ(0)"
    setTimeout(() => {
      document.body.style.transform = ""
    }, 50)
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

// === FONT LOADING CHECK FOR IPHONE/SAFARI ===
function checkFontLoading() {
  // Verificar se é iPhone/iPad/Safari
  const isAppleDevice = /iPhone|iPad|iPod|Safari/i.test(navigator.userAgent)
  const isChrome = /Chrome/i.test(navigator.userAgent)

  if (isAppleDevice && !isChrome) {
    console.log(
      "Dispositivo Apple detectado - verificando carregamento de fontes..."
    )

    // Garantir que Poppins seja aplicada corretamente
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(function () {
          const fontLoaded = document.fonts.check("16px Poppins")

          if (fontLoaded) {
            console.log("✅ Fonte Poppins carregada com sucesso!")
            document.body.classList.add("font-loaded")
          } else {
            console.log(
              "⚠️ Fonte Poppins não detectada - aplicando fallback..."
            )
            // Forçar aplicação da fonte
            const style = document.createElement("style")
            style.innerHTML = `
            *, *::before, *::after {
              font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
            }
          `
            document.head.appendChild(style)
          }
        })
        .catch(function () {
          console.log(
            "⚠️ Erro no carregamento de fontes - aplicando fallback..."
          )
          // Aplicar fallback em caso de erro
          document.body.style.fontFamily =
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        })
    } else {
      // Fallback para navegadores que não suportam document.fonts
      setTimeout(function () {
        console.log(
          "📱 Aplicando fonte diretamente para dispositivos mais antigos..."
        )
        document.body.style.fontFamily =
          '"Poppins", -apple-system, BlinkMacSystemFont, sans-serif'
      }, 100)
    }
  }
}

// === MOBILE LAYOUT FIXES ===
function initMobileFixes() {
  // Detectar se é dispositivo móvel e iOS
  const isMobile = window.innerWidth <= 768
  const isTouch = "ontouchstart" in window
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === "[object SafariRemoteNotification]"
    })(
      !window["safari"] ||
        (typeof safari !== "undefined" && safari.pushNotification)
    )

  if (isMobile || isTouch) {
    console.log("📱 Dispositivo móvel detectado:", { isIOS, isSafari })

    // Adicionar classe para iOS
    if (isIOS) {
      document.body.classList.add("ios-device")
      document.documentElement.classList.add("ios-device")

      // Marcar como carregado após um breve delay para força renderização
      setTimeout(() => {
        document.body.classList.add("loaded")
        console.log("✅ iOS device loaded and rendering optimized")
      }, 100)
    }

    // Verificar suporte a AVIF
    checkAvifSupport().then((supportsAvif) => {
      if (!supportsAvif) {
        console.log("⚠️ AVIF não suportado, implementando fallbacks...")
        // Converter imagens AVIF para JPG
        const avifImages = document.querySelectorAll('img[src*=".avif"]')
        avifImages.forEach((img) => {
          const newSrc = img.src.replace(".avif", ".jpg")
          console.log("🔄 Convertendo:", img.src, "→", newSrc)
          img.src = newSrc
        })
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

      // Correções específicas para iOS
      if (isIOS) {
        especialidadeSection.style.transform = "translateZ(0)"
        especialidadeSection.style.backfaceVisibility = "hidden"
        especialidadeSection.style.webkitBackfaceVisibility = "hidden"
      }
    }

    if (especialidadeCards.length) {
      console.log(
        `🎴 Processando ${especialidadeCards.length} cards de especialidade`
      )

      especialidadeCards.forEach((card, index) => {
        // Remover transforms que podem causar problemas em mobile
        card.style.willChange = "auto"

        // Correções específicas para iOS
        if (isIOS) {
          card.style.transform = "translateZ(0)"
          card.style.backfaceVisibility = "hidden"
          card.style.webkitBackfaceVisibility = "hidden"
        }

        // Otimizar imagens para mobile
        const cardImage = card.querySelector(
          ".card-premium-image-container img"
        )
        if (cardImage) {
          cardImage.style.transform = "none"

          // Remover lazy loading para iOS
          if (isIOS) {
            cardImage.removeAttribute("loading")
            cardImage.style.display = "block"
            cardImage.style.visibility = "visible"
            cardImage.style.opacity = "1"
          }

          // Adicionar listener para erro de carregamento aprimorado
          cardImage.addEventListener("error", function () {
            console.log("❌ Erro ao carregar imagem:", this.src)

            // Tentar diferentes formatos
            if (this.src.includes(".avif")) {
              console.log("🔄 Tentando carregar versão JPG...")
              this.src = this.src.replace(".avif", ".jpg")
            } else if (this.src.includes(".webp")) {
              console.log("🔄 Tentando carregar versão JPG...")
              this.src = this.src.replace(".webp", ".jpg")
            } else {
              console.log("📦 Aplicando placeholder...")
              // Mostrar placeholder
              this.style.backgroundColor = "#f0f0f0"
              this.style.minHeight = "160px"
              this.style.display = "flex"
              this.style.alignItems = "center"
              this.style.justifyContent = "center"
              this.style.color = "#999"
              this.style.fontSize = "14px"
              this.alt = "Imagem não disponível"
            }
          })

          // Forçar carregamento para iOS
          if (isIOS) {
            cardImage.addEventListener("load", function () {
              console.log(`✅ Imagem ${index + 1} carregada com sucesso`)
            })
          }
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

    // Força reflow para iOS após um delay
    if (isIOS) {
      setTimeout(() => {
        console.log("🔄 Forçando reflow para iOS...")
        if (especialidadeSection) {
          especialidadeSection.style.display = "none"
          especialidadeSection.offsetHeight // Força reflow
          especialidadeSection.style.display = "block"

          // Verificar se os cards estão visíveis
          setTimeout(() => {
            const visibleCards = document.querySelectorAll(
              '.especialidade-premium-card:not([style*="display: none"])'
            )
            console.log(`👀 Cards visíveis após reflow: ${visibleCards.length}`)
          }, 100)
        }
      }, 500)
    }
  }
}

// Funções que serão executadas quando o DOM for carregado
window.addEventListener("load", () => {
  initSmoothScroll()
  initAnimaScroll()
  initInfographics()
  initMobileFixes() // Adicionar correções mobile
  checkFontLoading() // Verificar carregamento de fontes

  // Força renderização específica para iOS após carregamento completo
  setTimeout(() => {
    forceIOSRender()
  }, 200)
})
