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

// GSAP

const tl = gsap.timeline();

tl.from([".navbar h3", ".navbar h2"], {
  y: "-6rem",
  duration: 1,
  delay: 1.8,
});

tl.from(".top-hero", {
  x: -500,
  opacity: "0",
  duration: 2,
});

tl.to(".bottom-hero h1", {
  x: "-29vw",
  scrollTrigger: {
    scroller: "#main",
    trigger: ".hero .bottom-hero",
    start: "top 50%",
    end: "top top",
    // markers: true,
    scrub: 2,
  },
});

// footer h1 gsap
tl.from(".links h1", {
  x: "-100vh",
  duration: 2,
  scrollTrigger: {
    scroller: "#main",
    trigger: ".collections h1",
    // markers: true,
    start: "top 20%",
    end: "top -20",
    scrub: 2.5,
  },
  stagger: 0.2,
});

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

// add to cart function
const cartValue = document.querySelectorAll(".cart-num");
let cartNum = localStorage.getItem("updateNum")
  ? parseInt(localStorage.getItem("updateNum"))
  : 0;
cartValue.forEach((element) => {
  element.textContent = cartNum;
});

const addCart = document.querySelectorAll(".add-cart");
addCart.forEach((element) => {
  element.addEventListener("click", function () {
    cartNum++;
    cartValue.forEach((item) => {
      item.textContent = cartNum;
    });
    localStorage.setItem("updateNum", cartNum);
    sidebarCartGsap();
  });
});
// remove cart
const removeCart = document.querySelector(".remove-cart");
removeCart.addEventListener("click", function () {
  cartNum = 0;
  cartValue.forEach((item) => {
    item.textContent = cartNum;
  });
  localStorage.setItem("updateNum", cartNum);
});

// open side bar when cart button clicked
const cartBtn = document.querySelector(".cartBtn");
cartBtn.addEventListener("click", function () {
  sidebarCartGsap();
});

// animation sidebar cart
const sidebarCartGsap = () => {
  gsap.to(".sidebar-cart", {
    right: "0",
    duration: 0.8,
  });
};

// close side bar
const closeSidebar = document.querySelector(".close-sidebar");
closeSidebar.addEventListener("click", function () {
  closeSidebarGSAP();
});
const closeSidebarGSAP = () => {
  gsap.to(".sidebar-cart", {
    right: "-31vw",
    duration: 0.8,
  });
};

// render deature product
// Import the products array from shop.js
import products from "../shop/shop.js";
function favouriteProducts() {
  let card = "";
  products.favourite.forEach((item) => {
    card += `
    <div class="favourite-card">
         <a href='../product-detail/product-detail.html?id=${item.id}'><img src="${item.img}" alt=""/></a>  
          <span class="name">${item.name}</span>
                <div class="desc">
                <span>${item.price}</span> <span class="add-cart"> add to cart</span>
          </div>
      </div>
    
    `;
  });
  document.querySelector(".favourite-card-container").innerHTML = card;
}
favouriteProducts();

// // render added prodcut in side bar

// products.shop.forEach((item) => {
//   console.log(item);
// });
