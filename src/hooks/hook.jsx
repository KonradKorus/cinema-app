import { outlinedInputClasses } from "@mui/material"

export const createToken = async(email, password) =>
{
    var data = encodeURIComponent("grant_type")
    data += "&" + encodeURIComponent("username") + "=" + encodeURIComponent(email)
    data += "&" + encodeURIComponent("password") + "=" + encodeURIComponent(password)
    data += "&" + encodeURIComponent("scope") + "="
    data += "&" + encodeURIComponent("client_id") + "="
    data += "&" + encodeURIComponent("client_secret") + "="

    console.log(data)

    const res = await fetch("http://localhost:8000/token",
    {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: data
    })

    const login = await res.json();

    if(!login.hasOwnProperty("access_token"))
    {
        throw new Error(login.detail);
    }
    else
    {
        return login.access_token;   
    }
}

export const getUserData = async() => 
{
    const token = (localStorage.hasOwnProperty("token")) ? localStorage.getItem("token") : "";

    const res = await fetch("http://localhost:8000/users/me", 
    {
        method: "GET",
        headers: 
        {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    )

    const user = await res.json();

    if(!user.hasOwnProperty("email"))
    {
        throw new Error(user.detail)
    }
    else
    {
        return user
    }
}
export const editUser = async(user, id) =>
{
    const token = localStorage.getItem("token")

    const res = await fetch(`http://localhost:8000/users/${id}`, 
    {
        method: "PUT",
        headers: 
        {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })

    const data = await res.json();

    if(!data.hasOwnProperty("email"))
    {
        throw new Error(data.detail)
    }
    else
    {
        return data
    }
}

export const changePass = async(oldPass, newPass) =>
{
    const token = (localStorage.hasOwnProperty("token")) ? localStorage.getItem("token") : "";

    const res = await fetch("http:localhost:8000/change-password",
    {
        method: "POST",
        headers: 
        {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({old: oldPass, new: newPass})
    })

    const data = res.json();

    if(!data.hasOwnProperty("detail"))
    {
        return;
    }
    else
    {
        throw new Error(data.detail)
    }
}