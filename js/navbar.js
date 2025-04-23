// Carica la navbar e inizializza il menu mobile
fetch("partials/navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar-container").innerHTML = html;

    // Inizializza il menu mobile dopo aver caricato la navbar
    const toggleButton = document.querySelector('[data-collapse-toggle="navbar-cta"]');
    const navbarMenu = document.getElementById("navbar-cta");

    if (toggleButton && navbarMenu) {
      toggleButton.addEventListener("click", () => {
        const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
        toggleButton.setAttribute("aria-expanded", !isExpanded);
        navbarMenu.classList.toggle("hidden");
      });
    } else {
      console.error("Navbar toggle button or menu not found in the DOM.");
    }
  })
  .catch(err => console.error("Errore durante il caricamento della navbar:", err));