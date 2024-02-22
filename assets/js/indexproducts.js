
async function getAllProducts(){
    const url = "http://localhost:8080/api/products"
        try {
            
            const responseJSON = await fetch(url);
            const response = await responseJSON.json();

            displayCards(response)                  
        } catch (error) {
            console.log(error);
        }
    }

function displayCards(products) {
    let productCards = products.map(product =>

        `<a href="/assets/pages/product.html" class="grid-product-item text-center" idProduct="${product.id}">
            <img src="${product.photo}" referrerpolicy="no-referrer" class="card-img-top" alt="Bebida tapioca">
            <div class="card-body">
            <p class="card-description text-center" > ${product.name} </p>
            <p class="card-description text-center"> $${product.price} </p>
            <p class="card-text">${product.description}</p>
            </div>
        </a>`
    );
   
    const productosContainerStart = document.getElementById("grid-products-containerStart");
    productosContainerStart.innerHTML = productCards.join("");

    const productos = document.querySelectorAll(".grid-product-item");
    productos.forEach(product=>{
        product.addEventListener("click",(e)=>{
            const keyProduct = product.getAttribute("idProduct");
            localStorage.setItem("idProduct",keyProduct);
    });
});
};

window.onload = function () {
    getAllProducts();
};

  