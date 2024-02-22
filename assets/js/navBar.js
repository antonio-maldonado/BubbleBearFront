const login = document.getElementById("login");

if(localStorage.getItem("login")){
const logout = document.getElementById("logout");
const admin = document.getElementById("admin");
const perfil = document.getElementById("perfil");

    admin.classList.add("d-none");
    login.classList.add("d-none");
    perfil.classList.remove("d-none");
    logout.classList.remove("d-none");

    logout.addEventListener("click",(e)=>{
        localStorage.clear();
        location.assign("/");
    })
    if(localStorage.getItem("admin")){
        admin.classList.remove("d-none");
    }
}else{
    const logout = document.getElementById("logout");
    const admin = document.getElementById("admin");
    const perfil = document.getElementById("perfil");

    admin.classList.add("d-none");
    perfil.classList.add("d-none");
    logout.classList.add("d-none");
}