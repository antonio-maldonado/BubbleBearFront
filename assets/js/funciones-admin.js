
if(!localStorage.getItem("admin")){
    location.assign("/");
}

async function getAllProducts(){
    const url = "http://localhost:8080/api/products"
    try { 
        const responseJSON = await fetch(url);
        const response = await responseJSON.json();
     
        showProducts(response);
    } catch (error) {
        console.log(error);
    }
}

getAllProducts();


function showOrders(orders){
    let order = orders.map( ord =>
        `
        <div class="p-0 m-0 col-12 header-pedido">
            <div class="m-0-p-0 d-flex  justify-content-center">
              <p class="m-0 p-0">${ord.order_id}</p>
            </div>

            <div class="m-0 p-0 d-flex align-items-center justify-content-center">
              <p class="m-0 p-0">${ord.total_amount}</p>
            </div>
            
            <div class="m-0 p-0 d-flex align-items-center justify-content-center">
              <p class="m-0 p-0">${ord.purchase_date}</p>
            </div>

            <div class="icons icon-actions-products text-center m-0 p-0">        
                <a class="icon-link checkoutOrder mb-1 " aria-current="page" idOrder="${ord.order_id}" href="./verPedido.html">
                    <i class="bi bi-eye-fill"></i>
                </a>          
       
                <a class="icon-link deleteOrder p-0 " aria-current="page" idOrder="${ord.order_id}" href="./admin.html">
                    <i class="bi bi-x-square-fill"></i>
                </a> 
            </div>
          </div>
        `
    );
    const orderContainer=document.getElementById("order-container");
    orderContainer.innerHTML=order.join("");

    const deleteOrder = document.querySelectorAll(".deleteOrder");
    deleteOrder.forEach(product => product.addEventListener('click', () => {
        const keyProduct = product.getAttribute("idOrder");
       
        deleteOrderById(parseInt(keyProduct))
        .then(() => {
            console.log("orden eliminada")
        })
        .catch((error) => {
            console.log("No se elimino", error);
        });
        }));
         
    const checkoutOrder = document.querySelectorAll(".checkoutOrder");
        checkoutOrder.forEach(product => product.addEventListener('click', () => {
            const keyProduct = product.getAttribute("idOrder");
            localStorage.setItem("orderId",keyProduct);
         }));
}

function showProducts(products) {
    let productCard = products.map((product) =>
        `
        <div class=" header-product py-3 p-0 m-0 ">
            <p class="id-product ">${product.id}</p>
            <img class="img-product mw-100" src="${product.photo}" alt="bebida de tapioca" referrerpolicy="no-referrer"> 
            <p class="name-product text ">${product.name}</p>
            <p class="price-product ">$${product.price}</p>
            <p class="description-product mw-100">${product.description}</p> 

            <div class="icons icon-actions-products text-center d-flex justify-content-center align-items-center p-0 mw-100">        
                <a class="icon-link checkoutProduct mb-1" aria-current="page p-0" idproduct="${product.id}" href="./checkoutProduct.html">
                    <i class="bi bi-eye-fill"></i>
                </a>          
                <a class="icon-link editProduct mb-1" aria-current="page p-0" idproduct="${product.id}" href="editProduct.html">
                    <i class="bi bi-gear-fill"></i>
                </a>          
                <a class="icon-link deleteProduct p-0" idproduct="${product.id}" aria-current="page" href="./admin.html">
                    <i class="bi bi-x-square-fill"></i>
                </a> 
            </div>
        </div>   
      `
    ); 

    let product = document.getElementById("containerProducts");
    product.innerHTML = productCard.join("");
    
    const viewProduct = document.querySelectorAll(".checkoutProduct");
    viewProduct.forEach(product => product.addEventListener("click", (e) => {

        const keyProduct = product.getAttribute("idProduct");
        localStorage.setItem("product", keyProduct);
    }));

    /* edit product */
    const editProduct = document.querySelectorAll(".editProduct");
    editProduct.forEach(product => product.addEventListener("click", () => {
        const keyProduct = product.getAttribute("idProduct");
        localStorage.setItem("productModify", keyProduct);
    })); 

    const deleteProduct1 = document.querySelectorAll(".deleteProduct");
    deleteProduct1.forEach(product => product.addEventListener('click', () => {
        const keyProduct = product.getAttribute("idProduct");
            deleteProduct(keyProduct)
            .then(() => {
                console.log("producto eliminado");
            })
            .catch((error) => {
                console.log("No se elimino", error);
            });
    }));


};

let arrowProductos = document.querySelectorAll(".arrow-productos");
let productsContainer = document.querySelectorAll(".containerProducts");

arrowProductos.forEach( ( aP , i ) => aP.addEventListener("click", ()=>{

    if ( productsContainer[i].classList.contains( 'hidden' ) ) {
        productsContainer[i].classList.remove('hidden');
    
        setTimeout( function () {
                productsContainer[i].classList.remove( 'visuallyhidden' );   
            }, 0 );
    }else {
        productsContainer[i].classList.add('visuallyhidden');    

         productsContainer[i].addEventListener('transitionend', function(e) {
            productsContainer[i].classList.add('hidden');
        
        }, {
            capture: false,
            once: true,
            passive: false
        });
    }
}) );

// Eliminar producto
async function deleteProduct(keyProduct) {
    const deleteUrl = "http://localhost:8080/api/products/" + keyProduct ;
    try {
        const response = await fetch(deleteUrl, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' ,
                Authorization: `Bearer ${(localStorage.getItem("token"))}`
            }
        });
        
        if(!response.ok){
            throw new Error("Error al eliminar")
        }
        console.log("Producto eliminado"); 
    } catch (error) {
        console.error(error);
    }
}  

const urlOrderHasProduct = "http://localhost:8080/api/ordershasproducts"
async function getOrdersHasProducts( url ){
    try {
        const responseJSON = await fetch( url );
        const response = await responseJSON.json();
    } 
    catch(error) {
        console.error(error);
    }
}
getOrdersHasProducts(urlOrderHasProduct); //Sí funcionó ok gracias tony

// Solicitud Post order_has_product
async function postOrdersHasProducts (ordersHasProducts) { 
    const url = 'http://localhost:8080/api/ordershasproducts'
        try{
        const response = await fetch (url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(ordersHasProducts)
            
        });

    } catch (error){
        console.warn(error);
    }
};

const categoriesUrl = "http://localhost:8080/api/categories"; 

async function getCategoryById (categoryId) {
    const url = `${categoriesUrl}/${categoryId}`;
    ;

    try {
        const response = await fetch(url);

        if (response.ok) {
            const category = await response.json();
            return category;
        } else {
            console.error ("Error al obtener categría por id");
            return null;
        }
    }   catch (error) {
        console.error("ERROR DE RED: ", error);
        return null;
    }
}

async function getOrderById(orderId){
    const orderUrl = "http://localhost:8080/api/orders/" + orderId;
    try{
        const response = await fetch(orderUrl,{
            method:'GET',
            headers: { 'Content-Type': 'application/json' ,
                Authorization: `Bearer ${(localStorage.getItem("token"))}`
            }
        });
        
        if (!response.ok) {
            throw new Error("Error");
        }

        const order = await response.json();

        return order;
    } catch(error) {
        throw error;
    }
}

async function getOrders(){
    const orderUrl = "http://localhost:8080/api/orders";
    try{
        const response = await fetch(orderUrl,{
            method:'GET',
            headers: { 'Content-Type': 'application/json' ,
                Authorization: `Bearer ${(localStorage.getItem("token"))}`
            }
        });
        
        if (!response.ok) {
            throw new Error("Error");
        }

        const order = await response.json();

        showOrders(order);
        return order;
    } catch(error) {
        throw error;
    }
}

getOrders();

const ordersUrl = "http://localhost:8080/api/orders"

async function deleteOrderById(orderId) {
    const url = `${ordersUrl}/${orderId}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' ,
                Authorization: `Bearer ${(localStorage.getItem("token"))}`
            }
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("ERROR DE RED: ", error);
        return false;
    }
}