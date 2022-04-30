import axios from 'axios';
import { useRouter } from "next/router";
const { createHash } = require('crypto');
import { Context } from '../context/Store'
import { useContext, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Signup() {

    const router = useRouter();
    const [state, setState] = useContext(Context);

    const [formData, setFormData] = useState({ email: '', password: '', checkPassword: '' });
    const [error, setError] = useState('')
    const [isDisabled, setDisabled] = useState(true)


    useEffect(()=> {
        if (formData.checkPassword == '') {
            setError('')
        }
        else if (formData.password !== formData.checkPassword) {
            setError('Password does not match')
            setDisabled(true);
        }

        else if (formData.password === formData.checkPassword) {
            setError('')
            if (formData.password.length < 6) {
                setError('Password must be 6 character')
                setDisabled(true);
            }
            else if (formData.email.includes('@') && formData.email.length >= 8) {
                setDisabled(false)
            }
            else {
                setDisabled(true)
            }
        }
    });

    const loginData = async (e) => {
        e.preventDefault();

        const hashPass = createHash('sha256').update(formData.password).digest('hex');

        const data = {
            email: formData.email,
            password: hashPass
        };

        const promise = axios.post('/api/user/signup', data);

        toast.promise(promise, {
            pending: 'Creating account...',
            success: 'Account Created!',
            error: 'Email already exist'
        }
        ).then((res) => {
            if (res.data.success) {
                router.push('/account')
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
                <h1 className="h3 mb-4 fw-normal">Please sign up</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                        value={formData.email} onChange={(e) =>
                            setFormData({ email: e.target.value, password: formData.password, checkPassword: formData.checkPassword })
                        }
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" placeholder="Password"
                        value={formData.password} onChange={(e) =>
                            setFormData({ email: formData.email, password: e.target.value, checkPassword: formData.checkPassword })
                        }
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div><div className="form-floating">
                    <input type="password" className="form-control" placeholder="Password"
                        value={formData.checkPassword} onChange={(e) =>
                            setFormData({ email: formData.email, password: formData.password, checkPassword: e.target.value })
                            }
                    />
                    <label htmlFor="floatingPassword">Confirm Password</label>
                </div>
                <span className="fs-6  text-muted">{error}</span>
                <button className="w-100 btn btn-lg btn-primary mt-4" type="submit" disabled={isDisabled}>Sign Up</button>

                <div className="my-3">
                    <span className="fs-6 text-muted">Already have account? <a className="text-underline fw-normal" type="button"
                        onClick={() => {
                            router.push('/account?tab=login');
                            setState(prevState => ({
                                ...prevState,
                                ['tab']: 'login'
                            }))
                        }}
                    >Sign in</a></span>
                </div>

            </form>
            </main>
            </>
    )
}