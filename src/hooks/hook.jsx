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


export const getMovies = async() =>
{
    const token =localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/movie",
        {
            method: "GET",
            headers:
                {
                    "Content-type": "application/json",
                   "Authorization": `Bearer ${token}`
                }
        }
    )
    const data = await response.json();

    return data;
}

export const addMovieToDatabase = async (data) => {
    const token =localStorage.getItem("token");
    try {
        const response = await fetch('http://localhost:8000/movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        console.log(response)
        if (response.ok) {
            return 'Dodano film'

        } else {
            return 'Wypełnij wszystkie pola'
        }
    } catch (error) {
        return 'Wystąpił błąd'
    }
};

export const getCategory = async() =>
{
    const token =localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/category",
        {
            method: "GET",
            headers:
                {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
        }
    )
    const data = await response.json();

    return data;
}

export const addCategory = async (data) => {

    const token =localStorage.getItem("token");

    try {
        const response = await fetch('http://localhost:8000/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });


        if (response.ok) {
            console.log('Kaategoria dodana');
        } else {
            console.log('Wystąpił błąd podczas dodawania kategorii.');
        }
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
};


export const getMovie = async(id) =>
{
    const token =localStorage.getItem("token");

    const response = await fetch(`http://localhost:8000/movie/${id}`,
        {
            method: "GET",
            headers:
                {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
        }
    )
    const data = await response.json();

    return data;
}

export const updateMovie = async(data, id) =>
{
    const token = localStorage.getItem("token")
    try {

        const response = await fetch(`http://localhost:8000/movie/${id}`,
            {
                method: 'PUT',
                headers:
                    {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                body: JSON.stringify(data),
            })

        if (response.ok) {
            return 'Zaktualizowano dane'

        } else {
            return 'Wypełnij wszystkie pola'
        }
    } catch (error) {
        return 'Wystąpił błąd'
    }
}

export const deleteMovie = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:8000/movie/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (response.ok) {
            return "Usunięto film"
        } else {
            return "Wystąpił błąd"
        }
    } catch (error) {
        return "Wystąpił błąd"
    }
};


export const addRepertorie = async(data) =>
{
    const token = localStorage.getItem("token")
    try {

        const response = await fetch(`http://localhost:8000/repertoire`,
            {
                method: 'POST',
                headers:
                    {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                body: JSON.stringify(data),
            })

        if (response.ok) {
            return 'Zaktualizowano dane'

        } else {
            return 'Wypełnij wszystkie pola'
        }
    } catch (error) {
        return 'Wystąpił błąd'
    }
}

export const getRepertoire = async() =>
{
    const token =localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/repertoire/1/movies",
        {
            method: "GET",
            headers:
                {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
        }
    )
    const data = await response.json();

    return data;
}

export const deleteRepertoire = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:8000/repertoire/1/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (response.ok) {
            console.log("Usunięto repertuar");
        } else {
            console.log("abc")
        }
    } catch (error) {
        console.log("Błąd");
    }
};


export const addScreening = async(data) =>
{
    const token = localStorage.getItem("token")
    try {

        const response = await fetch(`http://localhost:8000/screenings`,
            {
                method: 'POST',
                headers:
                    {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                body: JSON.stringify(data),
            })

        if (response.ok) {
            return 'Dodano wydarzenie'

        } else {
            return 'Wypełnij wszystkie pola'
        }
    } catch (error) {
        return 'Wystąpił błąd'
    }
}

export const getScreenings = async() =>
{
    const token =localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/screenings?upcoming_events=false&page=1&size=50",
        {
            method: "GET",
            headers:
                {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
        }
    )
    const data = await response.json();

    return data;
}

export const getScreeningById = async(id) =>
{
    const token =localStorage.getItem("token");

    const response = await fetch(`http://localhost:8000/screenings/${id}`,
        {
            method: "GET",
            headers:
                {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
        }
    )
    const data = await response.json();

    return data;
}
export const updateScreening = async(data, id) =>
{
    const token = localStorage.getItem("token")
    try {

        const response = await fetch(`http://localhost:8000/screenings/${id}`,
            {
                method: 'PUT',
                headers:
                    {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                body: JSON.stringify(data),
            })

        if (response.ok) {
            return 'Zaktualizowano dane'

        } else {
            return 'Wypełnij wszystkie pola'
        }
    } catch (error) {
        return 'Wystąpił błąd'
    }
}

export const deleteScreening = async (id) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:8000/screenings/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (response.ok) {
            return "Usunięto wydarzenie"
        } else {
            return "Wystąpił błąd"
        }
    } catch (error) {
        return "Wystąpił błąd"
    }
};

export const getReservedBookSeats = async(id) =>
{
    const token =localStorage.getItem("token");

    const response = await fetch(`http://localhost:8000/screenings/${id}/booked-seats`,
        {
            method: "GET",
            headers:
                {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
        }
    )
    const data = await response.json();

    return data;
}

export const addReservation = async(data) =>
{
    const token = localStorage.getItem("token")
    try {

        const response = await fetch(`http://localhost:8000/reservations`,
            {
                method: 'POST',
                headers:
                    {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                body: JSON.stringify(data),
            })

        if (response.ok) {
            return 'Zarezerwowano miejsca'

        } else {
            return 'Wystąpił błąd'
        }
    } catch (error) {
        return 'Wystąpił błąd'
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

export const getUserReservations = async(id) =>
{
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:8000/reservations?user_id=${id}&page=1&size=50`,
        {
            method: "GET",
            headers:
            {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    )

    const reservations = await res.json();

    if(reservations.hasOwnProperty("detail"))
    {
        throw new Error(reservations.detail)
    }
    else
    {
        return reservations;
    }
}