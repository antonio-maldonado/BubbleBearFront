let allOrders;
let productos;
let producto;

if(!localStorage.getItem("login")){
    location.assign("/");
}

async function getOrderById(id){
    try {
        console.log(id)
        const url='http://localhost:8080/api/orders/'+ id;
        const responseJSON = await fetch(url,{
            method:'GET',
            headers: { 'Content-Type': 'application/json' ,
                Authorization: `Bearer ${(localStorage.getItem("token"))}`
            }
        });
        const response = await responseJSON.json();
      
        updateData(response);
        if(response.ok){
            return response;
        }
  
    } catch (error) {
     console.log(error)   
    }
    
}

getOrderById(localStorage.getItem("orderId"))

function updateData(order){
    const quantities = document.getElementById("quantities");
    const products = document.getElementById("listProducts");
    const total = document.getElementById("totalAmount");
    const fecha = document.getElementById("dateOrder");

    const quantity = order.products.reduce((acu,val)=>val.quantity+acu,0);

    quantities.value=quantity;

    const productsList = order.products.map(product=>product.quantity + "x "+product.product.name)
    products.value=productsList.join();
    total.value="$"+order.total_amount
    fecha.value=order.purchase_date;
}