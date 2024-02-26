class User {
    constructor(id, name, phone, email, password, birthday) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
    } 
}

if(!localStorage.getItem("login")){
    location.assign("/");
}

const btn = document.getElementById("form-button");
let user;
const name = document.getElementById("full-name");
const email = document.getElementById("mail");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation")
const birthday = document.getElementById("date");
const phone = document.getElementById("phone");
const id = localStorage.getItem("user_id")||0;

async function modifyUser(user){
    const url = `http://localhost:8080/api/user/${id}`;
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

fetch("http://localhost:8080/api/user/"+id)
    .then(response => response.json())
    .then (userData => {
        name.value = userData.fullname;
        email.value = userData.email;
        // password.value = userData.password;
        // passwordConfirmation.value= userData.password;
        birthday.value = userData.birthday;
        phone.value=userData.phone_number;
        user=userData;
    })
    .catch(error => {
        console.log("Error al obtener datos del usuario", error)
    });

btn.addEventListener("click", function (e) {
   
    const lettersRegExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
    const nRegExp = /^\d{10,14}$/;
    const passwordExp = /^(?=.*[0-9])(?=.*[A-Z]).{8,10}$/;
    const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let message = [];

    if (!name.value) {
        const errorMessage = document.getElementById('error-name');
        errorMessage.innerHTML = "<p class='alert mt-3'>Ingresa un nombre</p>";
        message.push("error-name");
    } else if (!lettersRegExp.test(name.value)) {
        const errorMessage = document.getElementById('error-name');
        errorMessage.innerHTML = "<p class='alert mt-3'>El minimo de caracteres de:</p>";
        message.push("error-name");
    } else {
        const errorMessage = document.getElementById('error-name');
        errorMessage.innerHTML = "";
    }

    if (!email.value) {
        const errorMessage = document.getElementById('error-email');
        errorMessage.innerHTML = "<p class='alert mt-3'>Ingresa tu email</p>";
        message.push("error-email");
    } else if (!emailRegExp.test(email.value)) {
        const errorMessage = document.getElementById('error-email');
        errorMessage.innerHTML = "<p class='alert mt-3'>Recuerda que debe contener un @</p>";
        message.push("error-email");
    } else {
        const errorMessage = document.getElementById('error-email');
        errorMessage.innerHTML = "";
    }

    if (!phone.value) {
        const errorMessage = document.getElementById('error-phone');
        errorMessage.innerHTML = "<p class='alert mt-3'>Ingresa tu numero de telefono</p>";
        message.push("error-phone");
    } else if (!nRegExp.test(phone.value)) {
        const errorMessage = document.getElementById('error-phone');
        errorMessage.innerHTML = "<p class='alert mt-3'>Opps, algo anda mal, solo debe contener 10 dígitos</p>";
        message.push("error-phone");
    } else {
        const errorMessage = document.getElementById('error-phone');
        errorMessage.innerHTML = "";
    }

    if (!birthday.value) {
        const errorMessage = document.getElementById('error-date');
        errorMessage.innerHTML = "<p class='alert mt-3'>Ingresa una fecha</p>";
        message.push("error-date");
    }

    if (message.length > 0) { 
        e.preventDefault(); 
    } else { 
         modifyUser({
            fullname : name.value,
            email : email.value,
            birthday : birthday.value,
            phone_number: phone.value,
        });
    }
}
);