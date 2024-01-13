export const isLoggedIn = ()=> {
    const token = localStorage.getItem("token")
    if(token) return true
    return false
}

export const logoutUser = ()=> {
    localStorage.removeItem("token")
    localStorage.removeItem("userDetails")
    window.location.href = "/"
}

export const getToken = ()=> {
    return localStorage.getItem("token")
}

const publicRoutes = [
    "/login"
]

const scopes = {
    user: {
        userProfile: true
    }
};

export const checkUrlAccess = (isLogged, url, redirectUser, role)=> {
    console.log(isLogged, url, role)
    if(!isLogged && !publicRoutes.includes(url)){
        redirectUser("/login")
    }
    if(isLogged) {
        if(url.includes("admin") && role !== "admin"){
            redirectUser("/")
        }
        else if(url.includes("user") && role !== "user"){
            redirectUser("/")
        }
        else if(url.includes("consultant") && role !== "broker"){
            redirectUser("/")
        }
    }
}

export const matchUserRole = (actualRole, matchingRole) => {
    return actualRole === matchingRole
}