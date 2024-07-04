const stock_products = [
    {
      id:1,
      name:"Samsung Galaxy M15",
      brand: "Samsung",
      image: "https://m.media-amazon.com/images/I/81BTRVfsuFL._SX679_.jpg",
      mrp: 16999,
      price: 14799,
      ram: "6 GB",
      internal: "128 GB"
    },
    {
        id:2,
        name:"Samsung Galaxy M34",
        brand: "Samsung",
        image: "https://m.media-amazon.com/images/I/91ItZJh1FDL._SX679_.jpg",
        mrp: 24999,
        price: 21799,
        ram: "6 GB",
        internal: "128 GB"
      },
      {
        id:3,
        name:"Samsung Galaxy M34",
        brand: "Samsung",
        image: "https://m.media-amazon.com/images/I/91ItZJh1FDL._SX679_.jpg",
        mrp: 24999,
        price: 21799,
        ram: "6 GB",
        internal: "128 GB"
      },
      {
        id:4,
        name:"Samsung Galaxy M34",
        brand: "Samsung",
        image: "https://m.media-amazon.com/images/I/91ItZJh1FDL._SX679_.jpg",
        mrp: 24999,
        price: 21799,
        ram: "6 GB",
        internal: "128 GB"
      },
      {
        id:5,
        name:"Samsung Galaxy M15",
        brand: "Samsung",
        image: "https://m.media-amazon.com/images/I/81BTRVfsuFL._SX679_.jpg",
        mrp: 16999,
        price: 14799,
        ram: "6 GB",
        internal: "128 GB"
      },
      {
          id:6,
          name:"Samsung Galaxy M34",
          brand: "Samsung",
          image: "https://m.media-amazon.com/images/I/91ItZJh1FDL._SX679_.jpg",
          mrp: 24999,
          price: 21799,
          ram: "6 GB",
          internal: "128 GB"
        },
        {
          id:7,
          name:"Samsung Galaxy M34",
          brand: "Samsung",
          image: "https://m.media-amazon.com/images/I/91ItZJh1FDL._SX679_.jpg",
          mrp: 24999,
          price: 21799,
          ram: "6 GB",
          internal: "128 GB"
        },
        {
          id:8,
          name:"Samsung Galaxy M34",
          brand: "Samsung",
          image: "https://m.media-amazon.com/images/I/91ItZJh1FDL._SX679_.jpg",
          mrp: 24999,
          price: 21799,
          ram: "6 GB",
          internal: "128 GB"
        }
];

const productSection = document.getElementById("productPage");
const btnCart = document.getElementById("btnCart");
const myModal = new bootstrap.Modal("#myModal");
const cartCount = document.querySelector(".cart-count");
const modalDiv = document.getElementById("myModal");
const tbody = document.getElementById("tbody");

let cartItems = [];


function loadStockProducts(){
  let output="";
  stock_products.forEach((product) => {
    output +=`<div class="col">
    <div class="card h-100">
      <img class="card-img-top" src="${product.image}" alt="">
      <div class="card-body p-4">
        <div class="text-center">
            <h5>${product.name}</h5>
            <span class="text-muted"><b>Brand</b>: ${product.brand}</span>
            <span class="text-muted d-block"><b>Storage</b>: ${product.ram}</span>
            <span class="text-muted text-decoration-line-through">Rs ${product.mrp}</span>
            <span class="fw-bold text-success">Rs ${product.price}</span>
        </div>
      </div>
      <div class="card-footer p-4 bg-transparent border-top-0">
        <div class="text-center">
            <button class="btn btn-primary btnProduct" data-id="${product.id}"><i class="bi bi-cart-fill"></i>
                Add to Cart
            </button>
        </div>
      </div>
    </div>
</div>`;
  });

  productSection.innerHTML= output; 

  const productBtns = document.querySelectorAll(".btnProduct")
  productBtns.forEach((btn) => {
    btn.addEventListener("click", addToCart)
  })
}

loadStockProducts();

btnCart.addEventListener("click", function () {
  myModal.show();
});

function addToCart()
{
  this.disabled = true;
  this.innerHTML = `<i class="bi bi-cart-fill"<\i> Added to Cart`;
  const productId = this.dataset.id;
  const product_details = stock_products.filter((product) => product.id == productId)[0];
  const product = {
    ...product_details,
    quantity: 1,
    amount:product_details.price
  };
  cartItems.push(product);
  cartCount.textContent = cartItems.length;
  updateTotal();
}

modalDiv.addEventListener("shown.bs.modal", () => {
 let output = ``;
 cartItems.forEach((product) => {
  output +=`
   <tr>
   <td><img src='${product.image}' class='img-fluid' width="100px"></td>
   <td>${product.name}</td>
   <td>${product.price.toFixed(2)}</td>
   <td><input type='number' style='width:80px' class='form-control
   txtQty' value='${product.quantity}' min=1  data-id='${product.id}'></td>
   <td>${product.amount.toFixed(2)}</td>
   <td><button class='btn btn-danger btn-sm btnDelete' 
   data-id='${product.id}'><i class="bi bi-trash"></i></button></td>
   </tr> `;
 });
  tbody.innerHTML = output;

  const removeBtns = document.querySelectorAll(".btnDelete");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", removeFromCart); 
  });

  const txtQtys = document.querySelectorAll(".txtQty");
  txtQtys.forEach((txt) => {
    txt.addEventListener("change", updateQty); 
  });

});

function removeFromCart(){
  const id = this.dataset.id; 
  const tr = this.closest("tr");
  cartItems = cartItems.filter((product) => product.id != id); 
  tr.remove(); 
  updateTotal();
}


function updateQty(){
  const id = this.dataset.id;
  const newQty = this.value;
  const amountId =  this.parentElement.nextElementSibling;
  const productIndex = cartItems.findIndex((product) => product.id == id);
  cartItems[productIndex].quantity = newQty;
  cartItems[productIndex].amount = newQty * cartItems[productIndex].price;
  amountId.textContent = (newQty * cartItems[productIndex].price).toFixed(2);
  updateTotal();
}

modalDiv.addEventListener("hide.bs.modal", () => {
  cartCount.textContent = cartItems.length;

  const productBtns = document.querySelectorAll(".btnProduct");

  productBtns.forEach((btn) => {
       const pId = btn.dataset.id;     
       if(!isIdPresent(pId)){
        btn.disabled = false;
       }
  });
}); 

function updateTotal() {
  let totalAmount = 0;
    cartItems.forEach((product) => {
    totalAmount += product.amount;
  });
  const totalId = document.querySelector(".total");
  totalId.textContent =`Total Rs : ${totalAmount.toFixed(2)}`;
}

const isIdPresent = (id) => {  
  for(const product of cartItems){
     if(product.id == id) {
       return true;
     }
  }
  return false;
};