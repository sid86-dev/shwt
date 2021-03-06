import axios from 'axios';
import { useRouter } from "next/router";
const { createHash } = require('crypto');
import { Context } from '../context/Store'
import { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [state, setState] = useContext(Context);
    const [isDisabled, setDisabled] = useState(true);

    useEffect(() => {
        if (formData.email.includes('@') && formData.password.length > 6 && formData.email.length >= 8) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    });

    const loginData = async (e) => {
        e.preventDefault();

        const hashPass = createHash('sha256').update(formData.password).digest('hex');

        const data = {
            email: formData.email,
            password: hashPass
        };

        const promise = axios.post('/api/user/auth/login', data)
        toast.promise(promise, {
            pending: 'Loggin in...',
            success: 'You are logged in!',
            error: 'Email or password is invalid'
        }
        ).then((res) => {
            if (res.data.success) {
                router.push('/account');
            }
            else {
                console.log(res.data.response);
            }
        })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <main className="form-signin text-center mt-5">
                <form onSubmit={loginData}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                            value={formData.email} onChange={(e) => setFormData({ email: e.target.value, password: formData.password })}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                            value={formData.password} onChange={(e) => setFormData({ email: formData.email, password: e.target.value })}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary mt-4" type="submit" disabled={isDisabled}>Sign in</button>
                    <div className="my-3">
                        <span className="fs-6 text-muted">Create new account <a className="text-underline fw-normal" type="button"
                            onClick={() => {
                                router.push('/account?tab=signup');
                                setState(prevState => ({
                                    ...prevState,
                                    ['tab']: 'signup'
                                }))
                            }}
                        >Sign up</a></span>
                    </div>
                </form>
            </main>
        </>
    )
}