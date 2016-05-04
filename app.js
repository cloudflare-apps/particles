(function () {
  if (!window.addEventListener) return // Check for IE9+

  let options = INSTALL_OPTIONS
  let element

  particlesJS.load("particles-js", "./vendor/particles.json", function () {
    console.log("callback - particles.js config loaded")
  })

  function updateElement() {
    element = Eager.createElement(document.body, element)
    const eagerParticles = document.createElement("div")

    eagerParticles.id = "particles-js"
    element.appendChild(eagerParticles)
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElement)
  }
  else {
    updateElement()
  }

  window.INSTALL_SCOPE = {
    setOptions(nextOptions) {
      options = nextOptions

      updateElement()
    }
  }
}())
