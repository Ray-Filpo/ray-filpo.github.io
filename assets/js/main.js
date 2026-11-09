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

  // Product Portfolio Filtering
  const filterTabs = document.querySelectorAll(".product-filter-tab");
  const productCards = document.querySelectorAll(".product-card");

  function filterProducts(activeCategory, activeTab) {
    filterTabs.forEach((tab) => {
      const isSelected = tab === activeTab;
      tab.setAttribute("aria-selected", String(isSelected));
      if (isSelected) {
        tab.classList.add("text-white", "bg-indigo-600", "shadow-sm", "shadow-indigo-600/30");
        tab.classList.remove("text-slate-400", "hover:text-white", "hover:bg-slate-800/60");
      } else {
        tab.classList.remove("text-white", "bg-indigo-600", "shadow-sm", "shadow-indigo-600/30");
        tab.classList.add("text-slate-400", "hover:text-white", "hover:bg-slate-800/60");
      }
    });

    productCards.forEach((card) => {
      const cardCategories = (card.getAttribute("data-category") || "").split(/\s+/);
      const isMatch = activeCategory === "all" || cardCategories.includes(activeCategory);

      if (isMatch) {
        card.classList.remove("hidden");
        requestAnimationFrame(() => {
          card.classList.remove("product-card-hidden");
        });
      } else {
        card.classList.add("product-card-hidden");
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
          card.classList.add("hidden");
        } else {
          setTimeout(() => {
            if (card.classList.contains("product-card-hidden")) {
              card.classList.add("hidden");
            }
          }, 200);
        }
      }
    });
  }

  filterTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      const filterCategory = tab.getAttribute("data-filter") || "all";
      filterProducts(filterCategory, tab);
    });

    // ARIA keyboard navigation for tablist
    tab.addEventListener("keydown", (event) => {
      let nextIndex = null;
      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % filterTabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + filterTabs.length) % filterTabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = filterTabs.length - 1;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        filterTabs[nextIndex].focus();
        filterTabs[nextIndex].click();
      }
    });
  });
});
