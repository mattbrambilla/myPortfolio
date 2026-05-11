// Carica la navbar e inizializza tutte le funzionalità
fetch("partials/navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar-container").innerHTML = html;

    const navbar = document.getElementById("navbar");
    const toggleButton = document.querySelector('[data-collapse-toggle="navbar-menu"]');
    const navbarMenu = document.getElementById("navbar-menu");
    const progressBar = document.getElementById("progress-bar");
    const navLinks = document.querySelectorAll(".nav-link");

    // 1. Active page detection
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    let currentFile = pathParts.pop() || "index.html";
    if (!currentFile.includes(".")) currentFile = "index.html";
    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href === currentFile) {
        link.classList.add("active");
      }
    });

    // 2. Mobile menu toggle
    if (toggleButton && navbarMenu) {
      toggleButton.addEventListener("click", () => {
        const isOpen = navbarMenu.classList.contains("open");
        toggleButton.setAttribute("aria-expanded", !isOpen);
        navbarMenu.classList.toggle("open");
        toggleButton.classList.toggle("open");
      });

      // Close menu on nav link click (mobile)
      navLinks.forEach(link => {
        link.addEventListener("click", () => {
          navbarMenu.classList.remove("open");
          toggleButton.classList.remove("open");
          toggleButton.setAttribute("aria-expanded", "false");
        });
      });
    }

    // 3. Scroll effects (progress bar + glassmorphism + compact)
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Progress bar
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
          if (progressBar) progressBar.style.width = scrollPercent + "%";

          // Navbar glassmorphism + compact
          if (scrollY > 50) {
            navbar.classList.add("scrolled", "compact");
          } else {
            navbar.classList.remove("scrolled", "compact");
          }

          ticking = false;
        });
        ticking = true;
      }
    });
    // 4. Dark mode toggle
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
      });
    }
  })
  .catch(err => console.error("Errore durante il caricamento della navbar:", err));
