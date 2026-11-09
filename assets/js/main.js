/**
 * ConsultAnythingTech Main JavaScript
 * Handles accessible mobile navigation, header scroll elevation, and interaction controls.
 */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const menuButton = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Toggle mobile navigation drawer
  function toggleMobileMenu(forceClose = false) {
    if (!menuButton || !mobileMenu) return;

    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    const nextState = forceClose ? false : !isOpen;

    menuButton.setAttribute("aria-expanded", String(nextState));
    if (nextState) {
      mobileMenu.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("hidden");
    }
  }

  if (menuButton) {
    menuButton.addEventListener("click", () => toggleMobileMenu());
  }

  // Close mobile navigation when clicking any mobile link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMobileMenu(true);
    });
  });

  // Close menu on Escape key press
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton && menuButton.getAttribute("aria-expanded") === "true") {
      toggleMobileMenu(true);
      menuButton.focus();
    }
  });

  // Elevate header background on scroll
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});
