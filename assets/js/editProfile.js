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
//     calculateID() {
//         if (localStorage.getItem("users")) {
//             let users = localStorage.getItem("users");
//             users = JSON.parse(users);
//             return users.length;
//         } else {
//             return 0;
//         }
//     }

//     loadDataLocalStorage() {
//         let users;
//         if (localStorage.getItem("users")) {
//             users = JSON.parse(localStorage.getItem("users"));
//             users.push(this);
//         } else {
//             users = [this];
//         }
//         localStorage.setItem("users", JSON.stringify(users));
//     }

//     emailExists() {
//         if (!localStorage.getItem("users")) return false;
//         const users = JSON.parse(localStorage.getItem("users"));
//         const userFound = users.filter((value) => value.email == this.email);
//         if (userFound.length > 0) {
//             return true;
//         } else {
//             return false;
//         }
//     }
// };






const btn = document.getElementById("form-button");

const name = document.getElementById("full-name");
const email = document.getElementById("mail");
const password = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirmation")
const birthday = document.getElementById("date");

fetch("http://localhost:8080/api/user/2") 
    .then(response => response.json())
    .then (userData => {

        name.value = userData.fullname;
        email.value = userData.email;
        password.value = userData.password;
        passwordConfirmation.value= userData.password;
       console.log( userData.birthday);
        birthday.value = userData.birthday
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

    if (!password.value) {
        const errorMessage = document.getElementById('error-password');
        errorMessage.innerHTML = "<p class='alert mt-3'>Ingresa la contraseña</p>";
        message.push("error-password");
    } else if (!passwordExp.test(password.value)) {
        const errorMessage = document.getElementById('error-password');
        errorMessage.innerHTML = "<p class='alert mt-3'>Ingresa una contraseña de al menos longitud 8 y máximo 10 con letras y números</p>";
        message.push("error-password");
    } else {
        const errorMessage = document.getElementById('error-password');
        errorMessage.innerHTML = "";
    }

    if (!passwordConfirmation.value) {
        const errorMessage = document.getElementById('error-password-confirmation');
        errorMessage.innerHTML = "<p class='alert mt-3'>Ingresa la contraseña</p>";
        message.push("error-password-confirmation");
    } else if (password.value != passwordConfirmation.value) {
        const errorMessage = document.getElementById('error-password-confirmation');
        errorMessage.innerHTML = "<p class='alert mt-3'>No coinciden</p>";
        message.push("error-password-confirmation");
    } else {
        const errorMessage = document.getElementById('error-password-confirmation');
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
        const user = new User( 1, name.value, phone.value, email.value, password.value, birthday.value );
        if (user.emailExists()) { 
            e.preventDefault();
            const errorMessage = document.getElementById("error-email");
            errorMessage.innerHTML = "<p class='alert mt-3'>Ese email ya existe, intenta con otro</p>";
        } else {
            const errorMessage = document.getElementById("error-email");
            errorMessage.innerHTML = "";
            user.loadDataLocalStorage();
        }
    }
}
);


