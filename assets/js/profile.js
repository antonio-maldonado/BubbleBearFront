
/* getUserById */
let productos;

if(!localStorage.getItem("login")){
    location.assign("/");
}

async function getAllProducts(){
    const url = "http://localhost:8080/api/products"
    try {
        
        const responseJSON = await fetch(url);
        //console.log(responseJSON.status);
        if(responseJSON.ok){
            productos = await responseJSON.json();

            //productos = response;    
        }
        //console.log(response); 
        
    } catch (error) {
        console.log(error);
    }
}



const urlOrderHasProduct = "http://localhost:8080/api/ordershasproducts";
async function getOrdersHasProducts( url ){
    try {
        const responseJSON = await fetch( url );
        const response = await responseJSON.json(); 
        orderProducts=response;
    } catch(error) {
        console.error(error);
    }
}

getAllProducts();
getOrdersHasProducts(urlOrderHasProduct); 

async function getUserById(id){
    try {
        const url='http://localhost:8080/api/user/'+ id;
        const responseJSON = await fetch(url);
        const response = await responseJSON.json();
        if(response.ok){
            console.log(response);
            return response;
        }
  
    } catch (error) {
     console.log(error)   
    }
    
}
//getUserById(1)


// modificar
async function modifyUser(user){
    const url = `http://localhost:8080/api/user/${user.id}`;
    try{ 
        const response = await fetch(url,{
            methot: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        const responseData = await response.json();

        if(responseJSON.ok){
            console.log(responseData);
        } else {
            console.log("Error en la solicitud");
        }
    } catch (error){
        console.error(error);
    }

}

//Delete User
async function deleteUser(userId){
    const deleteUrl = "http://localhost:8080/api/user/" + userId;
    try {
        const response = await fetch(deleteUrl, {
            method: "DELETE",
        });
            if (!response.ok) {
                throw new Error("Error al eliminar usuario")
            }
        console.log("producto eliminado");
    } catch (error) {
        console.error(console.error);
    } 
}

//deleteUser(1)     Funcionó pero hay que modificar la base de datos



//const storedId = localStorage.getItem("profile");  Obtiene el ID del perfil almacenado en localStorage

async function getUserById(id){
    try {
        const url='http://localhost:8080/api/user/' + id;
        const responseJSON = await fetch(url);
        const response = await responseJSON.json();
        if(response.ok){
            localStorage.setItem("userData", JSON,stringify(response));
            console.log(response);
            return response;
        }
    } catch (error) {
     console.log(error)   
    }
}

let userData = JSON.parse(localStorage.getItem("userData"));

if(userData){
    const fullname = userData.fullname;
    const email = userData.email;
    const id = userData.user_id;

    console.log("Fullname:", fullname);
    console.log("Email:", email);
    console.log("id", id);
}else{
    console.log("no hay datos");
}


let order;
async function getOrders(){
    const orderUrl = "http://localhost:8080/api/orders";
    try{
        const response1 = await fetch(orderUrl);
        
        if (response1.ok) {
      
            const order = await response1.json();
            console.log(order);
            showOrder((order));
        }

   

       
    } catch(error) {
        throw error;
    }
}

getOrders();


let orderProducts;
function showOrder(orderId){ 

    const userID = parseInt((localStorage.getItem("userID")));
    orderId = orderId.filter(value=>value.fk_user_id==userID);
    console.log(orderId);

    console.log(productos)
    console.log(orderProducts)


    let products = orderProducts.map(value=>{

        return value.product;
    });
    const productsArea = document.getElementById("listProducts");
    
    console.log(products);
  
    //productos = productos.filter(value=>products.includes(value.id));

    //  products = orderProducts.map((value,index)=>{

    //     return `${productos[index].name} x ${value.quantity}\n `;
    // });

    //productsArea.innerHTML=(products.join(""));

    let orderHTML = orderId.map( ord =>{
      let productsOrder=orderProducts.filter(value=>value.order==ord.order_id);
    
      productOrder=productsOrder.map(value=>value.product);
       //productsOrder=Object.values(productsOrder).join("");
       productOrder=productos.filter(value=>productOrder.includes(value.id));
       productOrder=productOrder.map(value=>value.name)
      console.log(productOrder);
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


