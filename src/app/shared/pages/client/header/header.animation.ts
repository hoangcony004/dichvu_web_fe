import { gsap } from "gsap";

export function initHeaderAnimation() {
  // Animate toàn nav bar khi load
  gsap.from("nav.navbar", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power2.out"
  });

  // Animate từng item khi load
  gsap.from("nav.navbar .nav-item", {
    opacity: 0,
    y: -20,
    stagger: 0.1,
    duration: 0.8,
    ease: "power2.out"
  });

  // Dropdown Dịch vụ - Hover + Click
  const dropdownService = document.querySelector('#navbarDropdown');
  dropdownService?.addEventListener('mouseenter', animateServiceDropdown);
  dropdownService?.addEventListener('shown.bs.dropdown', animateServiceDropdown);

  function animateServiceDropdown() {
    const items = document.querySelectorAll(".dropdown-menu[aria-labelledby='navbarDropdown'] .dropdown-item");
    gsap.set(items, { opacity: 0, x: -20 });
    gsap.to(items, {
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    });
  }

  // Dropdown User - Hover + Click
  const userDropdown = document.querySelector('#userDropdown');
  userDropdown?.addEventListener('mouseenter', animateUserDropdown);
  userDropdown?.addEventListener('shown.bs.dropdown', animateUserDropdown);

  function animateUserDropdown() {
    const items = document.querySelectorAll(".dropdown-menu[aria-labelledby='userDropdown'] .dropdown-item");
    gsap.set(items, { opacity: 0, x: -20 });
    gsap.to(items, {
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    });
  }

  // Mobile search popup
  const observer = new MutationObserver(() => {
    const popup = document.querySelector('.mobile-search-popup');
    if (popup) {
      gsap.fromTo(
        popup,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        }
      );
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Navbar Toggler - Animate #navbarNav collapse
  const navbarNav = document.querySelector('#navbarNav');
  navbarNav?.addEventListener('shown.bs.collapse', () => {
    const navItems = navbarNav.querySelectorAll('.nav-item');
    gsap.set(navItems, { opacity: 0, y: -10, visibility: 'visible' }); // y khớp transform ban đầu
    gsap.to(navItems, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.4,
      ease: "power2.out"
    });
  });
  
  
  
}
