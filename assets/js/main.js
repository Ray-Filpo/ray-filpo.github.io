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
      tab.setAttribute("tabindex", isSelected ? "0" : "-1");
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
          }, 250);
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

  // Dynamic Copyright Year
  const copyrightYearEl = document.getElementById("copyright-year");
  if (copyrightYearEl) {
    copyrightYearEl.textContent = String(new Date().getFullYear());
  }

  // Back to Top Smooth Scroll
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.focus({ preventScroll: true });
      }
    });
  }

  // Accessible Contact Form Validation & Submission Handling
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");

    const nameError = document.getElementById("contact-name-error");
    const emailError = document.getElementById("contact-email-error");
    const messageError = document.getElementById("contact-message-error");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function clearErrors() {
      [nameInput, emailInput, messageInput].forEach((input) => {
        if (!input) return;
        input.removeAttribute("aria-invalid");
        input.classList.remove("input-error");
      });
      [nameError, emailError, messageError].forEach((errEl) => {
        if (!errEl) return;
        errEl.textContent = "";
        errEl.classList.add("hidden");
      });
      if (formStatus) {
        formStatus.textContent = "";
        formStatus.className = "hidden mb-6 p-4 rounded-xl text-sm font-medium";
      }
    }

    function setFieldError(input, errorEl, message) {
      if (input) {
        input.setAttribute("aria-invalid", "true");
        input.classList.add("input-error");
      }
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove("hidden");
      }
    }

    [nameInput, emailInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener("input", () => {
        if (input.getAttribute("aria-invalid") === "true") {
          input.removeAttribute("aria-invalid");
          input.classList.remove("input-error");
          const errorEl = document.getElementById(`${input.id}-error`);
          if (errorEl) {
            errorEl.textContent = "";
            errorEl.classList.add("hidden");
          }
        }
      });
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      clearErrors();

      let isValid = true;
      let firstInvalidInput = null;

      const nameVal = nameInput ? nameInput.value.trim() : "";
      const emailVal = emailInput ? emailInput.value.trim() : "";
      const messageVal = messageInput ? messageInput.value.trim() : "";

      if (!nameVal) {
        setFieldError(nameInput, nameError, "Please enter your name.");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = nameInput;
      }

      if (!emailVal) {
        setFieldError(emailInput, emailError, "Please enter your email address.");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = emailInput;
      } else if (!emailPattern.test(emailVal)) {
        setFieldError(emailInput, emailError, "Please enter a valid email address.");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = emailInput;
      }

      if (!messageVal) {
        setFieldError(messageInput, messageError, "Please enter your project overview or message.");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = messageInput;
      } else if (messageVal.length < 10) {
        setFieldError(messageInput, messageError, "Message must be at least 10 characters.");
        isValid = false;
        if (!firstInvalidInput) firstInvalidInput = messageInput;
      }

      if (!isValid) {
        if (formStatus) {
          formStatus.textContent = "Please resolve the errors highlighted above.";
          formStatus.className = "mb-6 p-4 rounded-xl text-sm font-medium bg-rose-950/80 border border-rose-800 text-rose-300 block";
        }
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // Valid form submission
      contactForm.reset();
      if (formStatus) {
        formStatus.innerHTML = "Thank you! Your inquiry has been received. We will respond within 24 business hours. You may also email us directly at <a href='mailto:contact@consultanything.tech' class='underline hover:text-white font-mono'>contact@consultanything.tech</a>.";
        formStatus.className = "mb-6 p-4 rounded-xl text-sm font-medium bg-emerald-950/80 border border-emerald-800 text-emerald-300 block";
        formStatus.focus();
      }
    });
  }
});
