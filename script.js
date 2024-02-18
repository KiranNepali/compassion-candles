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


// loader animation 
import loadGsap from "./loader.js";
loadGsap();

// render shop products 
import products from "./products.js";
function renderFavouriteProducts() {
  const shopContainer = document.querySelector(".favourite-container");
  products.favourite.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("favourite-card");
    card.innerHTML = `
          <div class="img-box"><a href="../product-detail/product-detail.html?id=${item.id}"><img src="${item.img}"  /></a></div>
          <span class="name">${item.name}</span>
          <div class="desc">
              <span>$ ${item.price}</span> <span class="add-cart"> add to cart</span>
          </div>
      `;
    shopContainer.appendChild(card);
  });
};
renderFavouriteProducts();

// render  total cart number 
const cartValue = document.querySelectorAll(".cart-num");
let cartNum = localStorage.getItem("updateNum")
  ? parseInt(localStorage.getItem("updateNum"))
  : 0;
cartValue.forEach((element) => {
  element.textContent = cartNum;
});


// render cart products function 
function renderCartProducts(){
    // Retrieve cart products from local storage
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    
    
    const sidebarMidContainer = document.querySelector('.sidebar-mid');
    
    cartProducts.forEach((product) =>{
      sidebarMidContainer.innerHTML += `
      <div class="single-product">
              <div class="cart-img">
                <img src="${product.img}" alt="">
              </div>
              <div class="desc">
                <h4 class="name">${product.name}</h4>
                <div class="edit-num">
                  <div class="product-num">1</div>
                  <h4 class="remove-single-product">remove</h4>
                </div>
              </div>
              <div class="price">$ ${product.price}</div>
      </div>
      `
    })
  }
  renderCartProducts();


  // add to cart function 
function addToCart(){
    document.addEventListener('DOMContentLoaded', function(){
      const addCartBtn = document.querySelectorAll(".add-cart");
      addCartBtn.forEach((btns) => {
          btns.addEventListener('click', function(){
            // increase cart num 
            const cartValue = document.querySelectorAll(".cart-num");
            let cartNum = localStorage.getItem("updateNum")
              ? parseInt(localStorage.getItem("updateNum"))
              : 0;
            cartNum += 1;
            cartValue.forEach((element) => {
              element.textContent = cartNum;
            });
            localStorage.setItem('updateNum', cartNum);


            // open sidebar 
            sidebarCartGsap();


            // save clicked product info in variable
            const card = this.closest(".favourite-card");
            const img = card.querySelector('img').getAttribute('src');
            const name = card.querySelector(".name").textContent;
            // const price = parseFloat(card.querySelector(".desc span").textContent);
            const priceText = card.querySelector(".desc span").textContent;
            const price = parseFloat(priceText.replace(/\$/g, ""));
            


            // render product in cart 
            const sidebarMidContainer = document.querySelector('.sidebar-mid');
              sidebarMidContainer.innerHTML += `
              <div class="single-product">
              <div class="cart-img">
              <img src="${img}" alt="">
            </div>
            <div class="desc">
              <h4 class="name">${name}</h4>
              <div class="edit-num">
                <div class="product-num">1</div>
                <h4 class="remove-single-product">remove</h4>
              </div>
            </div>
            <div class="price">$ ${price}</div>
                      </div>
              `

            
            // Retrieve cart products from local storage
            const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
            // Add the new product to the cart products array
            cartProducts.push({img: img, name: name, price: price});
          // Save the updated cart products array to local storage
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
            console.log(cartProducts);
            
          
          })
          
      })
    })
  }
  addToCart();




// remove single product function 
function removeSingleProduct(){
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-single-product')) {
            // increase cart num 
            const cartValue = document.querySelectorAll(".cart-num");
            let cartNum = localStorage.getItem("updateNum")
                ? parseInt(localStorage.getItem("updateNum"))
                : 0;
            cartNum -= 1;
            cartValue.forEach((element) => {
                element.textContent = cartNum;
            });
            localStorage.setItem('updateNum', cartNum);

            // Retrieve cart products from local storage
            const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

            // Find the index of the product to remove
            const productContainer = event.target.closest('.single-product');
            const index = cartProducts.indexOf(productContainer);


            // Remove the product from the array
            cartProducts.splice(index, 1);

            // remove this container from dom 
            productContainer.remove();

            //save updated cart products in local storage
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts));


            console.log(cartProducts);
        }
    });
}
removeSingleProduct();



// remove all cart products function 
function removeAllCart(){
  const removeCartBtn = document.querySelector(".remove-cart");
  removeCartBtn.addEventListener('click', function(){
    // Retrieve cart products from local storage
    let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
    
    //remove array
    cartProducts = [];
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    
    // remove content in sidebar 
    const sidebarMidContainer = document.querySelector('.sidebar-mid');
    sidebarMidContainer.innerHTML = '';

    // make cart num 0
    const cartValue = document.querySelectorAll(".cart-num");
    let cartNum = localStorage.getItem("updateNum")
      ? parseInt(localStorage.getItem("updateNum"))
      : 0;
    cartNum = 0;
    cartValue.forEach((element) => {
      element.textContent = cartNum;
    });
    localStorage.setItem('updateNum', cartNum);
    console.log(cartProducts);
})
}
removeAllCart();






// Importing for sidecart
import { sidebarCartGsap,openSidebar, closeSideCart } from './sidebar.js';
openSidebar();
closeSideCart();

