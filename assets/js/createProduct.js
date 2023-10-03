//---------------Crear producto
class NewProduct {
  constructor(name, price, size, stock, disguise, description, photoFile,flavor, category) {
    
    this.name = name;
    this.price = price;
    this.size = size;
    this.stock = stock;
    this.hide = disguise;
    this.photo = photoFile;
    this.description = description;
    this.flavor=flavor;
    this.category = {
      id: 1,
      sale: true,
      outstanding: true,
    };
  }
  


/*Calculating ID for each product*/
  calculateProductID() {
    if (localStorage.getItem("products")) {
      let productos = JSON.parse(localStorage.getItem("products"));
      return (parseInt(productos[productos.length - 1]?.id) + 1) || 0;
    } else {
      return 0;
    }
  };

/*Function to save data in LS*/
//   loadDataLocalStorage() {
//     let products;
//     if (localStorage.getItem("products")) {
     
//       products = JSON.parse(localStorage.getItem("products"));
//       products.push(this);
//     } else {
//       products = [this];
//     }
//     localStorage.setItem("products", JSON.stringify(products));
//   };
// };
}
/*uploaded image*/
let urlImg = "";
const img = document.getElementById("photoFile");
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxoltjl8n/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "sues4ajl";
const button = document.getElementById("save-button");

img.addEventListener("change",  async (e)=> {
  button.disabled=true;
  button.classList.add("invisible");
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

   const res = await axios.post(
        CLOUDINARY_URL,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },

        }
    );
    urlImg = res.data.url;
     img.setAttribute("data-url", urlImg);
    console.log(urlImg);
    button.disabled=false;
    button.classList.remove("invisible");
  // const formdata = new FormData();
  // formdata.append("image",e.target.files[0]);

  // fetch("https://api.imgur.com/3/image", {
  //   method: "post",
  //   body: formdata,
  //   headers: {
  //     Authorization: `Client-ID c441a4c0ed1d8f4`,
  //   },
  // })
  //   .then((data) => data.json())
  //   .then((data) => {
  //     urlImg = data.data.link;
  //     img.setAttribute("data-url", urlImg);
  //     console.log(urlImg);
  //   });

  
});

 // solicitud post 
const url = "http://localhost:8080/api/products"; 

async function createProduct (product) {

    try {
        const response = await fetch (url, {
            method: "POST", 
            headers: { 'Content-Type': 'application/json' ,
        }
        ,
        body: JSON.stringify(product)
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



/********************************************* */

const form = document.getElementById("formCreateProduct");

form.addEventListener("submit", function (event) {

  const infoErrorBox = document.getElementById('form-error-info');
  const nomProductoInput = document.getElementById('nom-producto').value;
  const priceInput = document.getElementById('price').value;
  const sizeInput = document.getElementById('size').value;
  const stockInput = document.getElementById('stock').value;
  const disguiseInput = document.getElementById('disguise').value;
  const descriptionInput = document.getElementById('description').value;
 const dataUrl = img.getAttribute("data-url");
 const flavor = document.getElementById("flavor").value;
 const category = document.getElementById("category").value;

  const lettersRegExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
  const nRegExp = /^\d{1,}$/;
  const hideRegExp = /^[0-1]{1}$/;
  let message = [];

  if (!nomProductoInput) {
    message.push("<p class='alert'>Hace falta el nombre del producto</p>");
  } else if (!lettersRegExp.test(nomProductoInput)) {
    message.push(
      "<p class='alert'>Está mal el nombre, debe ser solo letras </p>"
    );
  }

  if (!priceInput) { 
    message.push("<p class='alert'> Hace falta el precio</p>");
  } else if (!nRegExp.test(priceInput)) {
    message.push(
      "<p class='alert'>Esta mal el precio, Deben ser numeros</p>"
    );
  }

  if (!sizeInput) { 
    message.push("<p class='alert'>Ingrese el tamaño </p>");
  } else if (!lettersRegExp.test(sizeInput)) {
    message.push("<p class='alert'> No es un tamaño valido</p>");
  }

  if (!stockInput) {
    message.push("<p class='alert'>Ingrese la cantidad</p>");
  } else if (!nRegExp.test(stockInput)) {
    message.push(
      "<p class='alert'>El Número de existencias debe ser en números</p>"
    );
  }

  if (!disguiseInput) {
    message.push("<p class='alert'>Ingrese 0 o 1</p>");
  } else if (!hideRegExp.test(disguiseInput)) {
    message.push(
      "<p class='alert'>El campo ocultar se llena con 0 o 1</p>"
    );
  }

  if (!descriptionInput) {
    message.push("<p class='alert'>Ingrese la descripcion del producto</p>");
  }

  if (urlImg == "") {
    message.push("<p class='alert'>Hace falta agregar la foto</p>");
  }

  message = message.join("");
  infoErrorBox.innerHTML = message;

  if (message != []) { 
    event.preventDefault();
  } else { 

    const nameNewProduct = document.getElementById("nom-producto");
    const sizeNewProduct = document.getElementById("size");
    const stockNewProduct = document.getElementById("stock");
    const disguiseNewProduct = document.getElementById("disguise");
    const descriptionNewProduct = document.getElementById("description");
    const priceNewProduct = document.getElementById("price");

    const productInf = new NewProduct(
      nameNewProduct.value,
      priceNewProduct.value,
      sizeNewProduct.value,
      stockNewProduct.value,
      disguiseNewProduct.value,
      descriptionNewProduct.value,
      dataUrl,flavor,category)

    createProduct(productInf);
  }

});