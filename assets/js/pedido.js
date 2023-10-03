let allOrders;
let productos;
let producto;
async function getOrders(){
    const orderUrl = "http://localhost:8080/api/orders";
    try{
        const response = await fetch(orderUrl);
            
        if (response.ok) {
             allOrders = await response.json();
            printForm(allOrders);

        }else{
    
        throw new Error("Error");
        }

    } catch(error) {
        throw error;
    }
}

async function getProduct(id){
    const url = "http://localhost:8080/api/products/" + id;
 
        const responseJSON = await fetch(url);

        const producto = await responseJSON.json();
        return producto;
}

async function getAllProducts(){
    const url = "http://localhost:8080/api/products"
    try {
        
        const responseJSON = await fetch(url);
        //console.log(responseJSON.status);
        if (responseJSON.ok) {
            productos = await responseJSON.json();
         
        //console.log(response);   
        }
    } catch (error) {
        console.log(error);
    }
}

function print1(orderProducts){
    const idOrder=localStorage.getItem("orderId");
    console.log(orderProducts)
    orderProducts=orderProducts.filter(order=>order.order == (parseInt(idOrder)));
    const cantidad = document.getElementById("quantities");
    const sum=orderProducts.reduce((accumulator,value)=>accumulator+parseInt(value.quantity),0);

    cantidad.setAttribute("value",sum);

    let products = orderProducts.map(value=>{

        return value.product;
    });
    const productsArea = document.getElementById("listProducts");
    
    console.log(products);
  
    console.log(productos);
    productos = productos.filter(value=>products.includes(value.id));
    console.log("aqui")
    console.log(productos);
     products = orderProducts.map((value,index)=>{

        return `${productos[index].name} x ${value.quantity}\n `;
    });

    productsArea.innerHTML=(products.join(""));
}

function printForm(orders){
    const idOrder=localStorage.getItem("orderId");
    orders=orders.filter(order=>order.order_id == (idOrder));
    console.log(orders);
    const totalAmount=document.getElementById("totalAmount");
    const dateOrder = document.getElementById("dateOrder");

    totalAmount.setAttribute("value","$"+orders[0].total_amount);
    dateOrder.setAttribute("value",Date(orders[0].purchase_date));
}
getAllProducts();
getOrders();
//

const urlOrderHasProduct = "http://localhost:8080/api/ordershasproducts"
async function getOrdersHasProducts( url ){
    try {
        const responseJSON = await fetch( url );
        const response = await responseJSON.json(); 
        print1(response);
    } 
    catch(error) {
        console.error(error);
    }
}
getOrdersHasProducts(urlOrderHasProduct); 