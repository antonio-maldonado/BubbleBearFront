const url = "http://localhost:8080/api/products"; 

async function postProduct (product) {

    try {
        const response = await fetch (url, {
            method:'GET',
            headers: { 'Content-Type': 'application/json' ,
                Authorization: `Bearer ${(localStorage.getItem("token"))}`
            }
            ,body: JSON.stringify(product),
    });    
        if (response.ok) {
            const data = await response.json();
        } else {
            console.error("Error al crear producto");
        }
    }catch (error) {
        console.error("Error de red: ", error);
    } 
}

















/* solicitus get */



/* async function getAllProducts(){
const url = " http://localhost:8080/api/products"
    try {
        
        const responseJson = await fetch(url);
        const resolve = await responseJson.json()
        console.log(resolve);
        
    } catch (error) {
        console.log(error);
    }


}

getAllProducts() */


