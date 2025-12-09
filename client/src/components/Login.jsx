import { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Login(props) {
    let host = import.meta.env.VITE_API_URL;
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        if(json.success) {
            //save the auth token and redirect
            localStorage.setItem("token", json.auth_token);
            navigate("/");
            props.showAlert("Logged In", "success");
        }
        else {
            props.showAlert("Invalid Credentials!", "danger");
        }
    }
    const handleOnChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <h3 className="my-2">Login to continue to iNotebook</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="inputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="inputEmail1" name="email" onChange={handleOnChange} value={credentials.email} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="InputPassword1" name="password" value={credentials.password} onChange={handleOnChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
