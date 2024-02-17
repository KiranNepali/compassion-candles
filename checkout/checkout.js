// locomotive function 
function loco(){
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
}
loco();

// loader 
import loadGsap from "../loader.js";
loadGsap();

// content animation
gsap.from(".checkout-left", {
  x: "-100vh",
  duration: 1.5,
  delay: 2,
});
gsap.from(".checkout-right", {
  x: "150vh",
  duration: 1.5,
  delay: 2,
});




// render all the cart items 
// Retrieve cartItems from local storage
const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
console.log(cartProducts);

// Create a temporary container to parse the HTML string
const tempContainer = document.createElement('div');
tempContainer.innerHTML = cartProducts;

// Create a container to hold the new product HTML
const newProductContainer = document.querySelector('.order-products');

// Iterate over each product element
cartProducts.forEach(product => {
    // Extract img source and price text
    const imgSrc = product.img;
    const price = product.price;
    const name = product.name;

    // Create new product HTML
    const newProductHTML = `
    <div class="product">
    <div class="img-box">
    <img src="${imgSrc}" alt="">
    </div>
    <span class="product-name">${name}</span>
    <span class="price">$ ${price}</span>
            </div>
        
    `;

    // Append new product HTML to the container
    newProductContainer.innerHTML += newProductHTML;
});


// Function to calculate total price
function calculateTotalPrice() {

  let totalPrice = 0;
    // Retrieve cartItems from local storage
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

  // Iterate over each product element
  cartProducts.forEach(product => {
      // Extract the price of each product and add it to the total price
      totalPrice += parseFloat(product.price);
  });

  // Set the total price in the total-price element
  document.querySelector('.total-price').textContent = `$ ${totalPrice.toFixed(2)}`; // Display total price with 2 decimal places
}

// Call the calculateTotalPrice function
calculateTotalPrice();



const returnCartBtn =  document.querySelector('.bottom-form a');
returnCartBtn.addEventListener('click', function() {
  returnCartBtn.href = "../home/index.html";
  sidebarCartGsap();
});




import { sidebarCartGsap } from "../sidebar.js";
