showProduct()
var splide = new Splide( '.splide', {
  type   : 'loop',
pagination: false,
  perMove: 1,
  padding: { left: 60, right: 60},
  lazyLoad: true,
  breakpoints: {
    9000: {
          perPage: 5,
           gap: 65,
    },
    1000: {
          perPage: 4,
           gap: 65,
    },
    800: {
          perPage: 3,
           gap: 65,
    },
    640: {
        perPage: 2,
         gap: 60,
    },
    440: {
        perPage: 1,
         gap: 65,
    },
  },
} );

splide.mount();

function agregarAlCarrito(e){

  idItem = botonCarrito.getAttribute("data-id");

  if(localStorage.getItem("carrito")){

    carrito = JSON.parse( localStorage.getItem("carrito") );

    let id = -1;
    
    for(let i = 0 ; i<carrito.length ; i++){

      if(carrito[i].id==idItem){
        id = i;
        break;

      }

    }

    if(id!= -1){

      carrito[id].quantity++;

    }else{

      newItem = {
        id: idItem,
        quantity: 1,
      };

      carrito.push(newItem);
    }
    
    carrito = JSON.stringify(carrito);
    localStorage.setItem("carrito", carrito);

  }else{

    newItem = {
      id: idItem,
      quantity: 1
    };

    carrito = JSON.stringify([newItem]);
    localStorage.setItem("carrito",carrito);

  }
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
      icon: 'success',
      title: 'Agregado al carrito'
    })
}




 async function showProduct(){

  idProduct = localStorage.getItem("idProductSaved")
  
  console.log(idProduct);

  let product = await getProductById(idProduct);
  setTimeout(()=>{

    printProduct(product)},1000);
  }







async function getProductById(id){
  const url = "http://localhost:8080/api/products/"+id
  try {
      
      const responseJSON = await fetch(url);
      //console.log(responseJSON.status);
      const response = await responseJSON.json();
      //console.log(response); 
      return response;     
      
      
  } catch (error) {
      console.log(error);
  }
}



function printProduct(product){
  console.log(product)
  const place = document.getElementById('producto-main');

  place.innerHTML = `
  
  <section class="producto-main container-fluid">
        <div class="row m-0 p-0">
            <div class="col-md-6 text-center">
                <img src="${product.photo}" class="imagen-producto" alt="Imagen producto">
            </div>
            <div class="col-md-6 producto-right">

                <div class="producto">
                    <div class="row m-0 p-0">
                        <div class="col-12">
                            <h1 class="text-center">${product.name}</h1>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12">
                            <p class="text-center precio-producto">$${product.price}</p>
                        </div>
                    </div>
                </div>

                <div class="botones-producto">
                    <div class="row m-0 p-0 mt-5">
                        <div class="col-12 text-center">
                          <a href="/assets/pages/carrito.html" class="boton-comprar" id="comprar-ahora">Comprar ahora
                          </a>
                        </div>
                    </div>

                    <div class="row m-0 p-0 mt-4">
                        <div class="col-12 text-center">
                            <button class="boton-carrito" id="agregar-carrito" data-id="${product.id}">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="producto-info mb-5">
        <div class="row m-0 px-5">
            <div class="col-lg-6">
                <p class="producto-desc">Descripción:</p>
                <p>${product.description}</p>
            </div>
        </div>
        <div class="row m-0 px-5">
            <div class="col-lg-6">
                <p class="producto-desc">Tamaño: <span>${product.size}</span></p>
            </div>
        </div>
    </section>

  `;
  botonCarrito = document.getElementById("agregar-carrito");
botonComprar = document.getElementById("comprar-ahora");

botonCarrito.addEventListener("click", agregarAlCarrito);
botonComprar.addEventListener("click", agregarAlCarrito);
} 
