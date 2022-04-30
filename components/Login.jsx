import { useState } from "react"
import axios from 'axios';
const { createHash } = require('crypto');


export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const loginData = async (e) => {
        e.preventDefault();

        const hashPass = createHash('sha256').update(pass).digest('hex');

        const data = {
            email: email,
            password: pass
        };

        const res = await axios.post('/api/user/login', data)
        console.log(res.data)
    };

    return (
        <main className="form-signin text-center mt-5">
            <form onSubmit={loginData}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                        <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        value={pass} onChange={(e) => setPass(e.target.value)}
                    />
                        <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary mt-4" type="submit">Sign in</button>
            </form>
        </main>
                    )
}