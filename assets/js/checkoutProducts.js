
const storedId = localStorage.getItem("product");//"1"

if(!localStorage.getItem("admin")){
    location.assign("/");
}

let productoUno;
async function getProduct(){
    const url = "http://localhost:8080/api/products/"+storedId;
    try {
        
        const responseJSON = await fetch(url);

        const response = await responseJSON.json();
        productoUno= response;
        const name1 = document.getElementById("nom-producto");
        const price = document.getElementById("price");
        const size = document.getElementById("size");
        const stock = document.getElementById("stock");
        const description = document.getElementById("descripcion");
        const hide = document.getElementById("disguise");
        const photo = document.getElementById("photo");

        name1.setAttribute("value", productoUno.name);
        price.setAttribute("value", productoUno.price);
        size.setAttribute("value", productoUno.size);
        stock.setAttribute("value", productoUno.stock);
        photo.setAttribute("src", productoUno.photo)
        description.innerHTML = productoUno.description;
        hide.setAttribute("value", productoUno.hide);
    } catch (error) {
        console.log(error);
    }
}

getProduct();