import { isAdmin,getId } from "./decodeJWT.js";

const form = document.getElementById("formLogin");
if(localStorage.getItem("login")){
  location.assign("/")
}

form.addEventListener("submit", async function(event){
    event.preventDefault();
    let message = [];

    const email = document.getElementById("correo");
    const password = document.getElementById("contrasena");
    const emailError = document.getElementById("error-email");
    const passwordError = document.getElementById("error-password");
    
    if( !email.value ){
        message.push("<p class='alert'>Ingresa tu email </p>")
        emailError.innerHTML = "<p class='alert'>Ingresa tu email </p>";
    }else{
        emailError.innerHTML = "";
    }
    
    if( !password.value ){
        message.push("<p class='alert'>Ingresa tu password </p>")
        passwordError.innerHTML = "<p class='alert'>Ingresa tu password</p>";    
    }else{
        passwordError.innerHTML = "";
    }

    if(message.length>0){
        event.preventDefault();
    }else{
      const result = await postUser({email:email.value,password:password.value});
      if(result) location.assign("/")
    }
});


const postUser = async (userData) => {
    const url = "http://localhost:8080/login";
    console.log(userData);
    const response = await fetch(url, {
      method: "POST",
      headers: { accept: "application/json",

    },
      body: JSON.stringify(userData),
    });

    const emailError = document.getElementById("error-email");
    const passwordError = document.getElementById("error-password");
  
    if(response.status==401){
      passwordError.innerHTML ="<p class='alert'>Password no válido</p>";    
      return false;
    }

    if(response.status==500){
      emailError.innerHTML = "<p class='alert'>Email no válido</p>";
      return false;
    }

    // for (let [key, value] of response.headers) {
    //   console.log(`${key} = ${value}`);
    // }

    const jwt = await response.json();

    jwt != null && localStorage.setItem("token", jwt.token);
    localStorage.setItem("login",'logged');
    localStorage.setItem("user_id",getId());
    isAdmin();
    
    return true;
};
