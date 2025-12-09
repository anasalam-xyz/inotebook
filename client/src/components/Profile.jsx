import { useEffect, useState } from "react";

export default function Profile() {
    let host = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState({name: "", email: "", date: new Date()});
    const fetchUser = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setUser(json);
    }
    useEffect(()=>{fetchUser()}, []);
    return (
        <div className="container my-3">
            <h3>Your Profile Details: </h3>
            <hr/><br/>
            <h6>User Name : {user.name}</h6>
            <h6>E-mail : {user.email}</h6>
            <h6>Account created on : {new Date(user.date).toISOString().split('T')[0]}</h6>
        </div>
    )
}
