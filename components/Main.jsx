import axios from 'axios'
import Result from './Result'
import { Context } from '../context/Store'
import React,{ useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { removeCookies } from 'cookies-next';

export default function Main() {

    const [state, setState] = useContext(Context);
    const [input, SetInput] = useState('')
    const [res, setRes] = useState(null)
    const [pending, setPending] = useState(false)
    const postUrl = "/api/shortUrl"

    const user = state.user;

    const updateUserLinks = async (userId, urlId) => {

        const res = await axios.post('/api/user/app/updateLinks', { userId: userId, urlId, urlId });
        const data = await res.data;

        if (data.response) {
            toast.info(data.response, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        else if (data.success) {
            removeCookies('accessToken');

            toast.success('Url saved!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.error('Something went wrong', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
       
    };

    const handleSubmit = async () => {

        setRes(null);

        if (input != '') {
            setPending(true);

            var data = {
                'fullUrl': input
            };

            axios.post(postUrl, data)
                .then(function (response) {
                    setRes(response.data);
                    setPending(false)

                    if (user.authorization && response.data._id !== null) {
                        updateUserLinks(user.payload.userId, response.data._id);
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            console.log('Empty input')
        }

        

    };

    return (
          <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        <div className="mb-5">
            <div className="newsletter-subscribe">
                <div className="container">
                    <div className="intro">
                        <h2 className="text-center">Create short Urls</h2>
                        <p className="text-center">Free URL shortener to create perfect URLs. Shwt is a URL shortening service and a link management platform. </p>
                    </div>
                    <form className="form-inline mx-3" >
                        <div className="form-group">
                            <input className="form-control px-4" value={input}
                                onChange={(e) => SetInput(e.target.value)} type="text" name="fullUrl" placeholder="Enter long URL" />
                        </div>
                        <div className="form-group d-flex justify-content-center mt-4">
                            {pending === false ?
                                <button className="btn btn-primary" type="button" onClick={handleSubmit}>Submit</button>
                                :
                                <div className="spinner-border mt-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                        </div>
                    </form>

                </div>


            </div>
            {
                res !== null &&
                <Result data={res} />
            }

            </div>
            </>
    )
}


