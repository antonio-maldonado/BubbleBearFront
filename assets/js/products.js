obtenerProductos();
function obtenerProductos() {

    const apiUrl = 'http://localhost:8080/api/products';
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((responseData) => {
        mostrarProductos(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}

function mostrarProductos(products) {
    let productCards = products.map(product =>
        `<a href="../pages/product.html?productoId=${product.id}" onclick="saveIdLocalStorage(${product.id})"  class="grid-product-item text-center">
            <img src="${product.photo}" referrerpolicy="no-referrer" class="card-img-top" alt="Bebida tapioca">
            <div class="card-body">
            <p class="card-description text-center" > ${product.name} </p>
            <p class="card-description text-center"> $${product.price} </p>
            <p class="card-text">${product.description}</p>
            </div>
        </a>`
    );
    const productosContainer = document.getElementById("grid-products-container");
    productosContainer.innerHTML = productCards.join("");
};

function saveIdLocalStorage(id){
    localStorage.setItem("idProductSaved", id)
}