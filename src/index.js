/*
 * This is the main entry point for Webpack, the compiler & dependency loader.
 * All files that are necessary for your web page and need to be 'watched' for changes should be included here!
 */

// HTML Files
import './index.html';

// Stylesheets
import './css/main.scss';

// Scripts
import './js/main.js';

// modal
document.addEventListener("DOMContentLoaded", () => {
  const raceCols = document.querySelectorAll(".race-col");
  const closeButtons = document.querySelectorAll(".close");

  raceCols.forEach(col => {
    col.addEventListener("click", () => {
      const modalId = col.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add("show");
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").classList.remove("show");
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.classList.remove("show");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector("#night .carousel-track");
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector("#night .carousel-btn.next");
  const prevBtn = document.querySelector("#night .carousel-btn.prev");

  let currentIndex = 0;

  function updateSlide(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  // next slide
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide(currentIndex);
  });

  // previous slide
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide(currentIndex);
  });

  // initialize
  updateSlide(currentIndex);
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const mainpage = document.querySelector("#mainpage");

  let isClicking = false; // whether click or not

  function updateNavbar() {
    if (isClicking) return; 

    // shrink bar
    const shrinkPoint = mainpage.offsetHeight * 0.5;
    if (window.scrollY < shrinkPoint) {
      header.classList.remove("shrink");
    } else {
      header.classList.add("shrink");
    }

    // position indicator
    let current = "";
    const headerHeight = header.offsetHeight;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= headerHeight + 5 && rect.bottom > headerHeight + 5) {
        current = section.id;
      }
    });

    // force to highlight the last section when roll down to the bottom
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      current = sections[sections.length - 1].id;
    }

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        isClicking = true; 
        const headerOffset = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

        setTimeout(() => {
          isClicking = false;
          updateNavbar();
        }, 300);
      }
    });
  });

  window.addEventListener("scroll", updateNavbar);
  updateNavbar(); 
});




