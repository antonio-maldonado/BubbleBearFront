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

logout.addEventListener("click",(e)=>{
    localStorage.removeItem("login");
    localStorage.removeItem("admin");
    location.assign("/");
})
//antonio@gmail.com
//123ABCDEF