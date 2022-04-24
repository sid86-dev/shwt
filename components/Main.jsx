import React, { useState } from 'react'
import axios from 'axios'
import Result from './Result'

export default function Main() {

    const [input, SetInput] = useState('')
    const [res, setRes] = useState(null)
    const [pending, setPending] = useState(false)
    const postUrl = "/api/shortUrl"

    const handleSubmit = async () => {

        setRes(null);

        if (input !== '') {
            setPending(true);

            var data = {
                'fullUrl': input
            };

            console.log(data)

            axios.post(postUrl, data)
                .then(function (response) {
                    setRes(response.data);
                    setPending(false)
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
            <div className="newsletter-subscribe">
        <div className="container">
            <div className="intro">
                <h2 className="text-center">Create short link</h2>
                <p className="text-center">Free URL shortener to create perfect URLs for your business. Shwt is a URL shortening service and a link management platform. </p>
            </div>
            <form className="form-inline mx-3" >
                <div className="form-group">
                    <input className="form-control px-4" value={input}
                    onChange={(e) => SetInput(e.target.value)} type="text" name="fullUrl" placeholder="Enter long URL" />
                </div>
                        <div className="form-group d-flex justify-content-center mt-4">
                            {pending === false? 
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

        </>
    )
}


