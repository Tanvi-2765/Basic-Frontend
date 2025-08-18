document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPricedisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `<span>${product.name} - $${product.price.toFixed(
      2
    )}</span>
    <button data-id="${product.id}">Add to cart</button>`;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = ""; // Clear previous items
    let totalPrice = 0;

    if (cart.length > 0) {
      // Show cart items
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item"); // optional for styling
        cartItem.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button class="remove-button" data-id="${index}">Remove</button>
      `;
        cartItems.appendChild(cartItem);
      });

      totalPricedisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      // No items in cart
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPricedisplay.textContent = `$0.00`;
    }
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-button")) {
      const removeIndex = parseInt(e.target.getAttribute("data-id"));
      removeItem(removeIndex);
    }
  });

  function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout successfully!");
    renderCart();
  });
  renderCart();
});
