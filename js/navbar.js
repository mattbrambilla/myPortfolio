document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.querySelector('[data-collapse-toggle="navbar-cta"]');
    const navbarMenu = document.getElementById("navbar-cta");
  
    toggleButton.addEventListener("click", () => {
      const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
      toggleButton.setAttribute("aria-expanded", !isExpanded);
      navbarMenu.classList.toggle("hidden");
    });
  });