// Add product to cart
function addToCart(product, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product already exists, then increase quantity
  let existing = cart.find(item => item.name === product);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: product, price: parseInt(price), image: image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product + " added to cart! Items in cart: " + cart.length);

  // Update cart icon count
  let icon = document.getElementById("cart-icon");
  if (icon) {
    icon.textContent = "🛒 (" + cart.length + ")";
  }
}

// Show cart items on cart.html
window.onload = function() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let tableBody = document.getElementById("cart-items");
  let totalElement = document.getElementById("cart-total");

  if (tableBody) {
    tableBody.innerHTML = "";
    if (cart.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='5'>Your cart is empty.</td></tr>";
      if (totalElement) totalElement.textContent = "";
    } else {
      let total = 0;
      cart.forEach((item, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
          <td><img src="${item.image}" alt="${item.name}" style="width:60px;height:auto;"></td>
          <td>${item.name}</td>
          <td>₹${item.price}</td>
          <td>${item.quantity}</td>
          <td><button onclick="removeItem(${index})">Remove</button></td>
        `;

        tableBody.appendChild(row);
        total += item.price * item.quantity;
      });
      if (totalElement) {
        totalElement.textContent = "Total: ₹" + total;
      }
    }
  }

  // Clear cart button
  let clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.onclick = function() {
      localStorage.removeItem("cart");
      alert("Cart cleared!");
      location.reload();
    };
  }
};

// Remove individual item
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1); // remove item at index
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload(); // refresh cart page
}