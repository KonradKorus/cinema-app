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
            "Content-type": "application/json",
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

    const toSend = 
    {
        old_password: oldPass, 
        new_password: newPass
    }

    const res = await fetch("http://localhost:8000/change-password",
    {
        method: "POST",
        headers: 
        {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(toSend)
    })

    const data = await res.json();

    if(!data.hasOwnProperty("detail"))
    {
        return data;
    }
    else
    {
        throw new Error(data.detail)
    }
}

export const sendMail = async(email) =>
{
    const body = 
    {
        email_schema: 
        {
            "email": email
        },
        conf: 
        {
            "MAIL_USERNAME": "cinema.ticket.booking.system@gmail.com",
            "MAIL_PASSWORD": "xymheszucdaukhxt",
            "MAIL_PORT": 465,
            "MAIL_SERVER": "smtp.gmail.com",
            "MAIL_STARTTLS": false,
            "MAIL_SSL_TLS": true,
            "MAIL_DEBUG": 0,
            "MAIL_FROM": "cinema.ticket.booking.system@gmail.com",
            "SUPPRESS_SEND": 0,
            "USE_CREDENTIALS": true,
            "VALIDATE_CERTS": true,
            "TIMEOUT": 60
        }
    }

    const res = await fetch("http://localhost:8000/forgot-password", 
    {
        method: "POST",
        headers: 
        {
            "Content-type": "application/json",
        },
        body: JSON.stringify(body)
    })

    const data = await res.json();

    if(!data.hasOwnProperty("detail"))
    {
        return data;
    }
    else
    {
        throw new Error(data.detail)
    }
}

export const resetPass = async(email, token, pass) =>
{
    const body = 
    {
        email: email,
        reset_token: token,
        new_password: pass
    }

    const res = await fetch("http://localhost:8000/reset-password",
    {
        method: "POST",
        headers: 
        {
            "Content-type": "application/json",
        },
        body: JSON.stringify(body)
    })

    const data = await res.json();

    if(typeof(data) !== "string")
    {
        return data
    }
    else
    {
        throw new Error(data.detail)
    }
}

export const deleteUser = async(user, id) =>
{
    const token = localStorage.getItem("token")

    const res = await fetch(`http://localhost:8000/users/${id}`, 
    {
        method: "DELETE",
        headers: 
        {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })

    const data = await res.json();

    if(!data.hasOwnProperty("detail"))
    {
        return data
    }
    else
    {
        throw new Error(data.detail)
    }
}