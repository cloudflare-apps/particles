"use strict";

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var options = INSTALL_OPTIONS;
  var element = void 0;

  particlesJS.load("particles-js", "./vendor/particles.json", function () {
    console.log("callback - particles.js config loaded");
  });

  function updateElement() {
    element = Eager.createElement(document.body, element);
    var eagerParticles = document.createElement("div");

    eagerParticles.id = "particles-js";
    element.appendChild(eagerParticles);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateElement);
  } else {
    updateElement();
  }

  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
      options = nextOptions;

      updateElement();
    }
  };
})();