let total = [];
let response;

calcularTotal();
async function getAllProducts(){
    const url = "http://localhost:8080/api/products"
    try {
        
        const responseJSON = await fetch(url);
        //console.log(responseJSON.status);
         response = await responseJSON.json();
        //console.log(response); 
        console.log(response);
        loadProducts(response)      
    } catch (error) {
        console.log(error);
    }
}
    
getAllProducts();

function calcularTotal(){
    let subtotal = 0;

    const subtotalBox = document.getElementById("subTotalAmount");
    const totalBox = document.getElementById("totalAmount");
    const precioProductos = document.querySelectorAll(".precio-producto");
    const cantidadProductos = document.querySelectorAll(".cantidad");

    precioProductos.forEach((value,index)=>{
        subtotal += parseInt(value.innerHTML) * parseInt(cantidadProductos[index].value);
    });

    subtotalBox.innerHTML = subtotal;
    totalBox.innerHTML = subtotal + 50;
}

function loadProducts(productos){

    let carrito = JSON.parse(localStorage.getItem("carrito"));
    const container = document.getElementById("container-carrito");
    let idsCarrito = carrito.map(value => parseInt(value.id));
    
    productos = productos.filter(value => idsCarrito.includes((value.id)))
    console.log(productos);
    productos = productos.map( (value,index) => {
        
        return `
        <div class="row g-0 align-items-center addedProduct ">
                    
            <div class="col-md-8">
                <div class="row">
                    <div class="col-3 m-0 p-0 d-flex align-items-center justify-content-center img-carrito" >
                        <img src="${value.photo}" class="img-fluid " alt="...">
                    </div>

                    <div class="col-9 text-center d-flex align-items-center justify-content-center flex-column">
                        <div class="row">
                            <h1 class=" title-drinks">${value.name} </h1>
                        </div>

                        <div class="row">
                            <p class="product-description">${value.description} </p>
                        </div>
                    </div>   
                </div>
            </div>
            
            
            <div class="col-md-4">
                <div class="row">
                    <div class="col-6 text-center">
                        <p class="product-description"> Precio: $ <span class="precio-producto">${value.price}</span> </p>
                        <label class="counter" for="contador"> Cantidad: </label>
                        <input type="number" class="cantidad" id="counter${value.id}" min="0" max="10" step="1" value="${carrito[index].quantity}"> 
                    </div>

                    <div class="col-3 d-flex align-items-center justify-content-center flex-column botones-cantidad" >
                        <div class="row">
                            <div class="col-12">
                                <i class="bi bi-plus-square-fill boton-mas" data-id=${value.id}></i> 
                            </div>   
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <i class="bi bi-dash-square-fill boton-menos" data-id=${value.id}></i> 
                            </div>   
                        </div>
                    </div>
            
                    <div class="col-3 text-center d-flex align-items-center justify-content-center ">
                        <a class="row" href="./carrito.html">                
                            <i class="bi bi-trash3 size-icon icon-delete" data-id=${value.id}></i>  
                        </a>
                    </div>
                </div> 
            </div>
        </div>
        `
    }
    );
    
    container.innerHTML = productos.join("");
    calcularTotal();
    
    botonMas = document.querySelectorAll(".boton-mas");
    botonMenos = document.querySelectorAll(".boton-menos");
    botonEliminar = document.querySelectorAll(".icon-delete");
  

    botonMas.forEach(element => {
        element.addEventListener("click",(e)=>{
            const id = element.getAttribute("data-id");
            const cantidad=document.getElementById(`counter${id}`);
            
            if(cantidad.value<10){
                cantidad.value=parseInt(cantidad.value)+1;
            }
            
            let idProducto = -1; 
            let carrito = JSON.parse( localStorage.getItem("carrito"));
            carrito = JSON.parse( localStorage.getItem("carrito") );
            
            for(let i = 0 ; i<carrito.length ; i++){
                if(carrito[i].id==id){
                    idProducto = i;
                    break;
                }
            }

            carrito[idProducto].quantity= cantidad.value;
            localStorage.setItem("carrito",JSON.stringify(carrito));
            calcularTotal();    
        });
        
        });

        botonMenos.forEach(element => {
            element.addEventListener("click",(e)=>{
                const id = element.getAttribute("data-id");
                const cantidad=document.getElementById(`counter${id}`);

                if(cantidad.value>1){
                    cantidad.value=parseInt(cantidad.value)-1;
                }

                let idProducto = -1; 
                let carrito = JSON.parse( localStorage.getItem("carrito"));
                carrito = JSON.parse( localStorage.getItem("carrito") );
                
                for(let i = 0 ; i<carrito.length ; i++){
                    if(carrito[i].id==id){
                        idProducto = i;
                        break;
                    }
                }

                carrito[idProducto].quantity= cantidad.value;
                localStorage.setItem("carrito",JSON.stringify(carrito));
                calcularTotal();
            

            });
            
    });

        botonEliminar.forEach( element => {
        
            element.addEventListener("click", e =>{
            
                const id = element.getAttribute("data-id");
                carrito = JSON.parse(localStorage.getItem("carrito"));
                carrito = JSON.stringify( carrito.filter(value => value.id != parseInt(id)) );
            
                localStorage.setItem("carrito",carrito);
                calcularTotal();
        
            } );
        });
}
//loadProducts();
calcularTotal();


botonSubmit = document.getElementById("carrito-submit");
botonSubmit.addEventListener("click", (e) => {

    //e.preventDefault();
    if(!localStorage.getItem("carrito")||JSON.parse( localStorage.getItem("carrito")).length<1 ){
    
        const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
        })

        Toast.fire({
            icon: 'error',
            title: 'No hay nada en el carrito :('
        });
    }

    const totalBox = document.getElementById("totalAmount");
    const orders1 = {
        purchase_date:  new Date().toJSON().slice(0, 10),
        total_amount: parseInt(totalBox.innerHTML),
        fk_user_id: 3
    }

    postOrders(orders1);
    setTimeout(()=>{   getOrders();},500);
 

    //postOrders(orderObject);

   
    calcularTotal();
    localStorage.removeItem("carrito");
});

function getAllOrders(orders){
     let carrito = JSON.parse( localStorage.getItem("carrito"));
  
     console.log(orders);
    orders=(orders[orders.length-1])
    const precioProductos = document.querySelectorAll(".precio-producto");
    const cantidadProductos = document.querySelectorAll(".cantidad");
    let orderProducts;

    carrito.forEach((cart,index)=>{
        
        orderProducts = {
            quantity: parseInt(cantidadProductos[index].value),
            product: parseInt(cart.id),
            priceProduct: parseInt(precioProductos[index].innerHTML),
            order: orders.order_id
        }
         console.log(orderProducts)
         postOrdersHasProducts(orderProducts);
    })
    return orders;
}

async function getOrders(){
    const orderUrl = "http://localhost:8080/api/orders";
    try{
        const response = await fetch(orderUrl);
        
        if (!response.ok) {
            throw new Error("Error");
        }

        const allOrders = await response.json();
  
        getAllOrders(allOrders);
    } catch(error) {
        throw error;
    }
}
/* método post Crear Order */

async function postOrders (orders) { 
    const url = 'http://localhost:8080/api/orders'
        try{
        const response = await fetch (url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(orders)
            
        });

    } catch (error){
        console.warn(error);
    }
};

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