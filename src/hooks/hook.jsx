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
