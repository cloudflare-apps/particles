"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

(function () {
  if (!window.addEventListener) return; // Check for IE9+

  var RGBA_PATTERN = /rgba?\((\d+),(\d+),(\d+),?(\d+)?\)/;
  var CONTAINER_ID = "eager-particles-js";
  var abs = Math.abs;
  var min = Math.min;
  var round = Math.round;

  var options = INSTALL_OPTIONS;
  var element = void 0;

  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(function (color) {
      var hex = color.toString(16);

      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  }

  function updateElement() {
    var _options = options;
    var particleColor = _options.particleColor;


    element = Eager.createElement({ selector: "body", method: "prepend" }, element);
    element.id = CONTAINER_ID;

    if (options.backgroundColor) {
      element.style.backgroundColor = options.backgroundColor;
    }

    if (!particleColor) {
      var _document$defaultView = document.defaultView.getComputedStyle(document.body).backgroundColor.replace(/\s/g, "").match(RGBA_PATTERN).slice(1, 4).map(function ($) {
        return min(round(abs(parseInt($, 10) - 255) * 0.5), 255);
      });

      var _document$defaultView2 = _slicedToArray(_document$defaultView, 3);

      var r = _document$defaultView2[0];
      var g = _document$defaultView2[1];
      var b = _document$defaultView2[2]; // Find common contrast

      // Particles.js seems to have incomplete support for receiving RGB.

      particleColor = rgbToHex(r, g, b);
    }

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
          value: particleColor
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
          color: particleColor,
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
    window.addEventListener("load", updateElement);
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