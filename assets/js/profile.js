
let productos;

if(!localStorage.getItem("login")){
    location.assign("/");
}

const id = localStorage.getItem("user_id");

async function getAllProducts(){
    const url = "http://localhost:8080/api/products"
    try {
        const responseJSON = await fetch(url);
        if(responseJSON.ok){
            productos = await responseJSON.json();
        }
    } catch (error) {
        console.log(error);
    }
}

const urlOrderHasProduct = "http://localhost:8080/api/ordershasproducts";
async function getOrdersHasProducts( url ){
    try {
        const responseJSON = await fetch( url,{
            method:'GET',
            headers: { 'Content-Type': 'application/json' ,
                Authorization: `Bearer ${(localStorage.getItem("token"))}`
            }
        } );
        const response = await responseJSON.json(); 
        orderProducts=response;
    } catch(error) {
        console.error(error);
    }
}

async function getUserById(id){
    try {
        const url='http://localhost:8080/api/user/'+ id;
        const responseJSON = await fetch(url,{
            method:'GET',
            headers: { 'Content-Type': 'application/json' ,
                Authorization: `Bearer ${(localStorage.getItem("token"))}`
            }
        });
        const response = await responseJSON.json();
     
        const datosContainer=document.getElementById("data");
        const datos=`
            <div class="input-group col-12">
                <label class="email" for="correo">Nombre de usuario</label>
                <input class="entrada shadow" type="text" id="name" value="${response.fullname}"  readonly>
                <div class="w-100" id="error-name"></div>
            </div>
            <div class="input-group col-12">
                <label class="email" for="correo">Correo Electrónico</label>
                <input class="entrada shadow" type="email" id="correo" value="${response.email}"  readonly>
                <div class="w-100" id="error-email"></div>
            </div>`
        datosContainer.innerHTML=datos;
        showOrders(response.orders);

        if(response.ok){
            return response;
        }
    } catch (error) {
     console.log(error)   
    }
}

getUserById(localStorage.getItem("user_id"))

async function modifyUser(user){
    const url = `http://localhost:8080/api/user/${user.id}`;
    try{ 
        const response = await fetch(url,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json' ,
                Authorization: `Bearer ${(localStorage.getItem("token"))}`},
            body: JSON.stringify(user)
        });
        const responseData = await response.json();

    } catch (error){
        console.error(error);
    }
}

async function deleteUser(userId){
    const deleteUrl = "http://localhost:8080/api/user/" + userId;
    try {
        const response = await fetch(deleteUrl, {
            method: "DELETE", 
            headers: {'Content-Type': 'application/json' ,
            Authorization: `Bearer ${(localStorage.getItem("token"))}`},
        });
        if (!response.ok) {
            throw new Error("Error al eliminar usuario")
        }
    } catch (error) {
        console.error(console.error);
    } 
}

let order;
async function getOrders(){
    const orderUrl = "http://localhost:8080/api/orders";
    try{
        const response1 = await fetch(orderUrl,{
            method:'GET',
            headers: { 'Content-Type': 'application/json' ,
                Authorization: `Bearer ${(localStorage.getItem("token"))}`
            }
        } );
        
        if (response1.ok) {
            const order = await response1.json();
            showOrder((order));
        }
       
    } catch(error) {
        throw error;
    }
}

function showOrders(orders){
    const ordersData = orders.map(order=>
    `   <div class="p-0 m-0 col-12 header-pedido">
            <div class="m-0-p-0 d-flex  justify-content-center">
              <p class="m-0 p-0">$${order.total_amount}</p>
            </div>

            <div class="m-0 p-0 d-flex align-items-center justify-content-center">
              <p class="m-0 p-0">${order.purchase_date}</p>
            </div>
            <div class="m-0 p-0 d-flex align-items-center justify-content-center">
              <p class="m-0 p-0">${order.products.map( ({product})=>product.name).join()}</p>
            </div>

            <div class="icons icon-actions-products text-center m-0 p-0">        
                <a class="icon-link checkoutOrder mb-1 " aria-current="page" idOrder="${order.order_id}" href="./verPedido.html">
                    <i class="bi bi-eye-fill"></i>
                </a>          
            </div>
        </div>`
    );
    
    const orderContainer=document.getElementById("order-conteiner");
    orderContainer.innerHTML=ordersData.join("");

    const checkoutOrder = document.querySelectorAll(".checkoutOrder");
    checkoutOrder.forEach(product => product.addEventListener('click', () => {
        const keyProduct = product.getAttribute("idOrder");
        localStorage.setItem("orderId",keyProduct);
     }));
}

let orderProducts;
function showOrder(orderId){ 

    const userID = parseInt((localStorage.getItem("userID")));
    orderId = orderId.filter(value=>value.fk_user_id==userID);

    let products = orderProducts.map(value=>{
        return value.product;
    });

    let orderHTML = orderId.map( ord =>{
    let productsOrder=orderProducts.filter(value=>value.order==ord.order_id);
    
    productOrder=productsOrder.map(value=>value.product);
    productOrder=productos.filter(value=>productOrder.includes(value.id));
    productOrder=productOrder.map(value=>value.name)
      
    return  `
        <div class="p-0 m-0 col-12 header-pedido">
            <div class="m-0-p-0 d-flex  justify-content-center">
              <p class="m-0 p-0">${ord.total_amount}</p>
            </div>

            <div class="m-0 p-0 d-flex align-items-center justify-content-center">
              <p class="m-0 p-0">${ord.purchase_date}</p>
            </div>
            
            <div class="m-0 p-0 d-flex align-items-center justify-content-center">
              <p class="m-0 p-0">${productOrder}</p>
            </div>

            <div class="icons icon-actions-products text-center m-0 p-0">        
                <a class="icon-link checkoutOrder mb-1 " aria-current="page" idOrder="${ord.order_id}" href="./verPedido.html">
                    <i class="bi bi-eye-fill"></i>
                </a>          
            </div>
          </div>
        `}
);

    const orderContainer=document.getElementById("order-conteiner");
    orderContainer.innerHTML=orderHTML.join("");

    const checkoutOrder = document.querySelectorAll(".checkoutOrder");
    checkoutOrder.forEach(product => product.addEventListener('click', () => {
        const keyProduct = product.getAttribute("idOrder");
        localStorage.setItem("orderId",keyProduct);
     }));
}