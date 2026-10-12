
"use strict";

// ========================================
// MENÚ RESPONSIVE
// ========================================

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const abierto = nav.classList.toggle("abierto");
    menuToggle.setAttribute("aria-expanded", String(abierto));
  });

  nav.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      nav.classList.remove("abierto");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      nav.classList.remove("abierto");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ========================================
// AÑO AUTOMÁTICO
// ========================================

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// ========================================
// ANIMACIONES AL DESPLAZARSE
// ========================================

const elementos = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observer.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -20px 0px"
    }
  );

  elementos.forEach((elemento) => {
    observador.observe(elemento);
  });
} else {
  elementos.forEach((elemento) => {
    elemento.classList.add("visible");
  });
}

// ========================================
// FILTROS DEL PORTAFOLIO
// ========================================

const botonesFiltro = document.querySelectorAll(".filtro");
const proyectos = document.querySelectorAll(".proyecto");

botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", () => {
    botonesFiltro.forEach((otro) => {
      otro.classList.remove("activo");
    });

    boton.classList.add("activo");

    const categoria = boton.dataset.filter;

    proyectos.forEach((proyecto) => {
      const coincide =
        categoria === "todos" ||
        proyecto.dataset.category === categoria;

      proyecto.classList.toggle("oculto", !coincide);
    });
  });
});

// ========================================
// LUZ QUE SIGUE AL CURSOR
// ========================================

const cursorLuz = document.querySelector(".cursor-luz");

if (
  cursorLuz &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {
  window.addEventListener(
    "pointermove",
    (evento) => {
      cursorLuz.style.left = evento.clientX + "px";
      cursorLuz.style.top = evento.clientY + "px";
    },
    { passive: true }
  );
}

// ========================================
// MOVIMIENTO SUAVE DEL PERSONAJE
// ========================================

const personaje = document.querySelector(".personaje");
const heroVisual = document.querySelector(".hero-visual");

if (personaje && heroVisual) {
  // La animación principal está definida en CSS.
  // Este código añade una inclinación sutil con el ratón.

  const movimientoReducido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const dispositivoConRaton = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  if (dispositivoConRaton.matches && !movimientoReducido.matches) {
    let inclinacionX = 0;
    let inclinacionY = 0;
    let actualX = 0;
    let actualY = 0;
    let cuadroAnimacion = null;

    function moverPersonaje() {
      actualX += (inclinacionX - actualX) * 0.045;
      actualY += (inclinacionY - actualY) * 0.045;

      personaje.style.setProperty(
        "--inclinacion-x",
        actualX.toFixed(2) + "deg"
      );

      personaje.style.setProperty(
        "--inclinacion-y",
        actualY.toFixed(2) + "deg"
      );

      cuadroAnimacion = requestAnimationFrame(moverPersonaje);
    }

    heroVisual.addEventListener("pointermove", (evento) => {
      const rect = heroVisual.getBoundingClientRect();

      const x = (evento.clientX - rect.left) / rect.width;
      const y = (evento.clientY - rect.top) / rect.height;

      inclinacionY = (x - 0.5) * 5;
      inclinacionX = (0.5 - y) * 3;

      if (!cuadroAnimacion) {
        moverPersonaje();
      }
    });

    heroVisual.addEventListener("pointerleave", () => {
      inclinacionX = 0;
      inclinacionY = 0;
    });
  }
}

// ========================================
// FIN DEL JAVASCRIPT
// ========================================
