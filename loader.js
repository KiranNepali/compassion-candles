// // loader page
const loadGsap = () => {
    gsap.to(".loader-page", {
      y: "-100vh",
      duration: 1,
      delay: 1,
    });
  };
  window.addEventListener("DOMContentLoaded", function () {
    const loadAnimation = loadGsap();
    loadAnimation.kill();
  });

  export default loadGsap;