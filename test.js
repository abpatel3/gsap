document.addEventListener("DOMContentLoaded", () => {
  let tl = gsap.timeline();

  tl.from(".header-logo", {
    y: "-100%",
    duration: 0.4,
    delay: 0.2,
    opacity: 0,
  });

  tl.from("nav.hidden a", {
    y: "-100%",
    duration: 0.2,
    opacity: 0,
    stagger: 0.05,
  });

  tl.from(".appointment-btn, .tickets-btn, #mobile-menu-btn", {
    y: "-100%",
    duration: 0.4,
    opacity: 0,
    stagger: 0.1,
  }, "-=0.2");
});

let menuBtn = document.querySelector("#mobile-menu-btn");
let closeBtn = document.querySelector("#close-menu-btn");

menuBtn.addEventListener("click", () => {
  let tl = gsap.timeline();
  tl.to("#mobile-menu", {
    x: "0%",
    duration: 0.5,
    ease: "power2.out",
  });
  tl.from("#mobile-menu  .mobile-menu-logo", {
    y: "100%",
    duration: 0.5,
    opacity: 0,
    stagger: 0.05,
    delay: 0.5,
  });
  tl.from("#mobile-menu nav a", {
    x: 50,
    duration: 0.5,
    opacity: 0,
    stagger: 0.3,
  });
  tl.from("#mobile-menu .mobile-appointment-btn", {
    y: 50,
    duration: 0.5,
    opacity: 0,
  });
  tl.from("#mobile-menu .mobile-social-links a", {
    y: 50,
    duration: 0.5,
    opacity: 0,
    stagger: 0.2,
  });
});

closeBtn.addEventListener("click", () => {
  gsap.to("#mobile-menu", {
    x: "100%",
    duration: 0.5,
    ease: "power2.out",
  });
});

let isScrolled = false;

window.addEventListener("scroll", () => {
  let scrollcount = window.scrollY;
  let headerContainer = document.querySelector("#header-container");
  let whiteLinks = document.querySelectorAll(
    "#header nav a, #header .appointment-btn, #header #mobile-menu-btn, #header a.header-logo"
  );

  let shouldScroll = scrollcount > 40;

  if (shouldScroll !== isScrolled) {
    isScrolled = shouldScroll;

    // Header BG
    gsap.to("#header", {
      backgroundColor: isScrolled ? "#fff" : "transparent",
      duration: 0.7,
      ease: "cubic-bezier(0.4, 0, 0.2, 1)"
    });

    gsap.to(headerContainer, {
      height: isScrolled ? "60px" : "80px",
      duration: 0.7,
      ease: "cubic-bezier(0.4, 0, 0.2, 1)"
    });

    // Links color
    whiteLinks.forEach((link) => {
      gsap.to(link, {
        color: isScrolled ? "#000" : "#fff",
        duration: 0.7,
        ease: "cubic-bezier(0.4, 0, 0.2, 1)"
      });
    });

    // // Tailwind classes
    // headerContainer.classList.toggle("h-16", isScrolled);
    // headerContainer.classList.toggle("h-24", !isScrolled);
  }
});


let currentSplitTexts = []; // cleanup mate

function sliderAnimation() {
  let tl = gsap.timeline();
  let heroTitle = document.querySelectorAll(".slick-current .hero-title");
  let heroDescription = document.querySelectorAll(".slick-current .hero-description");
  let heroBtn = document.querySelectorAll(".slick-current .hero-btn");
  // 👉 Cleanup old SplitText (IMPORTANT)
  console.log("before", currentSplitTexts);
  currentSplitTexts.forEach(split => split.revert());
  console.log("after", currentSplitTexts);
  currentSplitTexts = [];

  // 👉 Initial state set (flash fix)
  gsap.set([heroTitle, heroDescription, heroBtn], {
    opacity: 1
  });

  // ===== TITLE =====
  heroTitle.forEach((text) => {
    let split = new SplitText(text, { type: "words,chars" });
    currentSplitTexts.push(split);

    tl.fromTo(split.chars,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: {
          each: 0.04,
          from: "start"
        }
      }
    );
  });

  // ===== DESCRIPTION =====
  heroDescription.forEach((desc) => {
    let split = new SplitText(desc, { type: "words,chars" });
    currentSplitTexts.push(split);

    tl.fromTo(split.chars,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.02
      },
      "-=0.4"
    );
  });

  // ===== BUTTON =====
  heroBtn.forEach((btn) => {
    tl.fromTo(btn,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      },
      "-=0.3"
    );
  });
}

$('.hero-slider')
  .on('init', function () {
    sliderAnimation(); // first slide
  })
  .on('beforeChange', function () {
    // 👉 Flash prevent
    gsap.set(".hero-title, .hero-description, .hero-btn", {
      opacity: 0
    });
  })
  .on('afterChange', function () {
    sliderAnimation(); // every slide
  })
  .slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1200,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  });