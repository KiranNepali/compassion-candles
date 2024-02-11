// locomotive scroll
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  smoothMobile: true,

  multiplier: 1.5,
  lerp: 0.08,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed",
});

let images = gsap.utils.toArray(".z-out");

images.forEach((item, index) => {
  let exptl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
      end: "top 5%",
      scrub: 2,
      markers: true,
      scroller: "#main",
    },
  });
  exptl.from(item, {
    x: 100,
    opacity: 0,
    duration: 1,
  });
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

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

// Import the products array from shop.js
import products from "../shop/shop.js";

// Retrieve the product ID from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get("id");

// Find the corresponding product in the products array
const shopProduct = products.shop.find(
  (item) => item.id === parseInt(productID)
);

// Update the HTML elements with the product details
document.querySelector(".product-img").src = shopProduct.img;
document.querySelector(".product-name").innerText = shopProduct.name;
document.querySelector(".product-price").innerText = shopProduct.price;

// Find the corresponding product in the products array
const favouriteProduct = products.favourite.find(
  (item) => item.id === parseInt(productID)
);

// Update the HTML elements with the product details
document.querySelector(".product-img").src = favouriteProduct.img;
document.querySelector(".product-name").innerText = favouriteProduct.name;
document.querySelector(".product-price").innerText = favouriteProduct.price;
