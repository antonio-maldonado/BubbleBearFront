const logout = document.getElementById("logout");
const login = document.getElementById("login");
const admin = document.getElementById("admin");
const perfil = document.getElementById("perfil");

admin.classList.add("d-none");
perfil.classList.add("d-none");
logout.classList.add("d-none");

if(localStorage.getItem("login")){
    login.classList.add("d-none");
    perfil.classList.remove("d-none");
    logout.classList.remove("d-none");

    if(localStorage.getItem("admin")){
        admin.classList.remove("d-none");
    }
}else{
    login.classList.remove("d-none");
}

//aqw@a.com
//123ABCDEF