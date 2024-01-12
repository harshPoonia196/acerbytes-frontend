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