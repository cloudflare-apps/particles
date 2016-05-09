"use strict";

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var CONTAINER_ID = "eager-particles-js";
  var options = INSTALL_OPTIONS;
  var element = void 0;

  function updateElement() {
    element = Eager.createElement({ selector: "body", method: "prepend" }, element);
    element.id = CONTAINER_ID;
    element.style.backgroundColor = options.backgroundColor;

    window.particlesJS(CONTAINER_ID, {
      particles: {
        number: {
          value: options.lessParticles ? 40 : 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: options.particleColor
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
          color: options.particleColor,
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
        events: {
          onhover: {
            enable: options.interaction.onHover !== "none",
            mode: options.interaction.onHover
          },
          onclick: {
            enable: options.interaction.onClick !== "none",
            mode: options.interaction.onClick
          },
          resize: true
        },
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
    document.addEventListener("DOMContentLoaded", updateElement);
  } else {
    updateElement();
  }

  window.INSTALL_SCOPE = {
    setOptions: function setOptions(nextOptions) {
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