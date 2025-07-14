import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initLayoutAnimations() {
  gsap.from("app-header", {
    opacity: 0,
    y: -50,
    duration: 1,
  });

  gsap.from(".hero", {
    scrollTrigger: {
      trigger: ".hero",
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
  });

  gsap.from("app-features", {
    scrollTrigger: {
      trigger: "app-features",
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
  });

  gsap.from("app-home", {
    scrollTrigger: {
      trigger: "app-home",
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
  });

  gsap.from("footer", {
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
    },
    opacity: 0,
    y: 50,
    duration: 1,
  });
}
