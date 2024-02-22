export const decodeJWT=()=>{
    const token = (localStorage.getItem("token"))
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return jsonPayload;
}

export const isAdmin=()=>{
    const {authorities,name}=JSON.parse(decodeJWT());
    const roleAdmin=authorities.filter(({authority})=>authority ==="ROLE_ADMIN");
    if(roleAdmin.length>0)
        localStorage.setItem("admin",name);
}

export const getId=()=>{
    const {jti}=JSON.parse(decodeJWT());
    return jti;
}