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

  // Animate dropdown items khi hover
  const dropdown = document.querySelector('.nav-item.dropdown');

  dropdown?.addEventListener('mouseenter', () => {
    gsap.from(".dropdown-menu .dropdown-item", {
      opacity: 0,
      x: -20,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out"
    });
  });
}
