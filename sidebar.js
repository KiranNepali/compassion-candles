// animation sidebar cart
const sidebarCartGsap = () => {
  gsap.to(".sidebar-cart", {
    right: "0",
    duration: 0.8,
  });
};



// open side bar when cart button clicked
const cartBtn = document.querySelector(".cartBtn");
function openSidebar() {
  cartBtn.addEventListener("click", function () {
    sidebarCartGsap();
  });
}

// add to cart function
const cartValue = document.querySelectorAll(".cart-num");
let cartNum = localStorage.getItem("updateNum")
  ? parseInt(localStorage.getItem("updateNum"))
  : 0;
cartValue.forEach((element) => {
  element.textContent = cartNum;
});
const addCart = document.querySelectorAll(".add-cart");
function addToCart() {
  addCart.forEach((element, index) => {
    element.addEventListener("click", function () {
      // increase cart num
      cartNum++;
      cartValue.forEach((item) => {
        item.textContent = cartNum;
      });
      //get detail of added product
      localStorage.setItem("updateNum", cartNum);
      sidebarCartGsap();
      const selectedItem = products.favourite[index];
      renderCartProduct(selectedItem);
    });
  });
}


// close side bar
const closeSidebar = document.querySelector(".close-sidebar");
const closeSidebarGSAP = () => {
  gsap.to(".sidebar-cart", {
    right: "-31vw",
    duration: 0.8,
  });
};
function closeSideCart() {
  closeSidebar.addEventListener("click", function () {
    closeSidebarGSAP();
  });
}




export {
  sidebarCartGsap,
  openSidebar,
  closeSideCart,
  addToCart,
};
