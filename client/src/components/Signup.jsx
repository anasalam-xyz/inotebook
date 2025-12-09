import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
    let host = import.meta.env.VITE_API_URL;
    const [credentials, setCredentials] = useState({username: "", email: "", password: "", confirmPassword: ""});
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.username, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            //save the auth token and redirect
            localStorage.setItem("token", json.auth_token);
            navigate("/");
            props.showAlert("New User Created", "success");
        }
        else{
            props.showAlert("Something went wrong!", "danger");
        }
    }
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <h3 className="my-2">Create an account to use iNotebook</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-3">
                    <label htmlFor="InputUserName" className="form-label">User Name</label>
                    <input required type="text" className="form-control" id="InputUserName" name="username" onChange={handleOnChange} value={credentials.username} aria-describedby="usernameHelp" />
                </div>
                <div className="mb-3 my-3">
                    <label htmlFor="InputEmail" className="form-label">Email address</label>
                    <input required type="email" className="form-control" id="InputEmail" name="email" onChange={handleOnChange} value={credentials.email} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputPassword" className="form-label">Password</label>
                    <input required type="password" className="form-control" id="InputPassword" name="password" value={credentials.password} onChange={handleOnChange} minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputConfirmPassword" className="form-label">Confirm Password</label>
                    <input required type="password" className="form-control" id="InputConfirmPassword" name="confirmPassword" value={credentials.confirmPassword} onChange={handleOnChange} minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
