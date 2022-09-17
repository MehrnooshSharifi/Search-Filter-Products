// http://localhost:3000/items

const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products-center");
const btns=document.querySelectorAll(".btn")
let allProductsData = [];
const filters = {
  searchItems: { },
};
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      console.log(res.data);
      allProductsData = res.data;
      renderProducts(res.data, filters);
    })
    .catch((err) => console.log(err));
});

function renderProducts(_products, _filters) {
    const filteredProducts = _products.filter((p) => {
      return p.title.includes(_filters.searchItems)
  });
  productsDOM.innerHTML="";
  filteredProducts.forEach((item, index) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <div class="image-container">
         <img src=${item.image} alt="p-${index}">
        </div>
    <div class="product-desc">
        <p class="product-price">${item.price} $</p>
        <p class="product-title">${item.title}</p>
    </div>`;
    productsDOM.appendChild(productDiv);
  });
}

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  filters.searchItems = e.target.value;
  renderProducts(allProductsData, filters);
});

btns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        // console.log(e.target.dataset.filter)
        const filter = e.target.dataset.filter;
        filters.searchItems=filter;
        // console.log(filter);
        renderProducts(allProductsData,filters)
    })
})
