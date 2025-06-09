// Máscara para campo de telefone
document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.querySelector('input[name="Telefone"]')

  if (phoneInput) {
    // Função para formatar o número
    function formatPhone(value) {
      // Remove todos os caracteres não numéricos
      value = value.replace(/\D/g, "")

      // Limita a 11 dígitos (DDD + número)
      if (value.length > 11) {
        value = value.slice(0, 11)
      }

      // Aplica a máscara
      if (value.length > 0) {
        // Adiciona parênteses para o DDD
        value = "(" + value

        if (value.length > 3) {
          // Fecha o parêntese após o DDD
          value = value.slice(0, 3) + ") " + value.slice(3)
        }

        if (value.length > 10) {
          // Adiciona hífen antes dos últimos 4 dígitos para celular
          value = value.slice(0, 10) + "-" + value.slice(10)
        }
      }

      return value
    }

    // Evento de input para digitação normal
    phoneInput.addEventListener("input", function (e) {
      e.target.value = formatPhone(e.target.value)
    })

    // Evento de paste para quando o usuário cola um número
    phoneInput.addEventListener("paste", function (e) {
      // Previne o comportamento padrão de colar
      e.preventDefault()

      // Obtém o texto colado
      const pastedText = (e.clipboardData || window.clipboardData).getData(
        "text"
      )

      // Formata o número e o insere no campo
      phoneInput.value = formatPhone(pastedText)
    })

    // Visual feedback ao focar no campo
    phoneInput.addEventListener("focus", function () {
      if (!phoneInput.value) {
        phoneInput.value = "("
      }
    })

    phoneInput.addEventListener("blur", function () {
      if (phoneInput.value === "(") {
        phoneInput.value = ""
      }
    })

    // Corrige o pattern para aceitar o formato com máscara
    phoneInput.setAttribute("pattern", "\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}")
    phoneInput.setAttribute("placeholder", "(XX) XXXXX-XXXX")
    phoneInput.setAttribute("maxlength", "16") // (XX) XXXXX-XXXX = 16 caracteres

    // Adiciona uma classe para estilização adicional
    phoneInput.classList.add("phone-mask")
  }
})
