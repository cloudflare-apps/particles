"use strict";

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var _window = window;
  var tinycolor = _window.tinycolor;

  var CONTAINER_ID = "eager-particles-js";
  var getComputedStyle = document.defaultView.getComputedStyle.bind(document.defaultView);
  var options = INSTALL_OPTIONS;
  var element = void 0;

  function getParticleColor() {
    var particleColor = void 0;

    if (options.particleColor) {
      particleColor = tinycolor(options.particleColor);
    } else {
      var backgroundColor = options.backgroundColor || getComputedStyle(document.body).backgroundColor;
      var components = tinycolor(backgroundColor).toHsl();

      // Find contrasting color.
      components.l = Math.abs((components.l + 0.5) % 1) + (1 - components.s) * 0.1;
      particleColor = tinycolor(components);
    }

    return {
      hex: particleColor.toHexString(),
      rgb: particleColor.toRgb()
    };
  }

  function getInteractivityEvents() {
    return {
      onhover: {
        enable: options.interaction.onHover !== "none",
        mode: options.interaction.onHover
      },
      onclick: {
        enable: options.interaction.onClick !== "none",
        mode: options.interaction.onClick
      },
      resize: true
    };
  }

  function updateElement() {
    var particleColor = getParticleColor();

    element = Eager.createElement({ selector: "body", method: "prepend" }, element);
    element.id = CONTAINER_ID;

    if (element.parentNode.tagName !== "BODY") {
      element.parentNode.setAttribute("data-particle-parent", "");
    }

    element.style.backgroundColor = options.backgroundColor;

    window.particlesJS(CONTAINER_ID, {
      particles: {
        number: {
          value: options.fewerParticles ? 40 : 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: particleColor.hex
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 5
          }
        },
        opacity: {
          value: 0.8,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 160,
          color: particleColor.hex,
          opacity: 0.45,
          width: 1
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: options.behavior.outMode,
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "window",
        events: getInteractivityEvents(),
        modes: {
          grab: {
            distance: 200,
            line_linked: {
              opacity: 0.4
            }
          },
          bubble: {
            distance: 350,
            size: 3.1,
            duration: 2,
            opacity: 0.8,
            speed: 3
          },
          repulse: {
            distance: 80,
            duration: 0.3
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }

  if (document.readyState === "loading") {
    window.addEventListener("load", updateElement);
  } else {
    updateElement();
  }

  window.INSTALL_SCOPE = {
    setColors: function setColors(nextOptions) {
      options = nextOptions;

      if (!window.pJSDom) {
        updateElement();
        return;
      }

      if (element) element.style.backgroundColor = options.backgroundColor;

      var _getParticleColor = getParticleColor();

      var hex = _getParticleColor.hex;
      var rgb = _getParticleColor.rgb;


      window.pJSDom.forEach(function (_ref) {
        var particles = _ref.pJS.particles;

        particles.color.value = hex;
        particles.color.rgb = rgb;

        particles.line_linked.color = hex;
        particles.line_linked.color_rgb_line = rgb;
      });
    },
    setCommon: function setCommon(nextOptions) {
      options = nextOptions;

      if (!window.pJSDom) {
        updateElement();
        return;
      }

      window.pJSDom.forEach(function (_ref2) {
        var pJS = _ref2.pJS;

        pJS.particles.move.out_mode = options.behavior.outMode;
        pJS.interactivity.events = getInteractivityEvents();
      });
    },
    setResetworthy: function setResetworthy(nextOptions) {
      options = nextOptions;

      if (window.pJSDom) {
        window.pJSDom.forEach(function ($) {
          return $.pJS.fn.vendors.destroypJS();
        });
      }
      updateElement();
    }
  };
})();