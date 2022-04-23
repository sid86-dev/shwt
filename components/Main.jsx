import React, { useState } from 'react'
import axios from 'axios'
import qs from 'qs';

export default function Main() {

    const [input, SetInput] = useState('')
    const postUrl = "https://www.api.shwt.xyz/.netlify/functions/api/shortUrl"

    const handleSubmit = async () => {
        if (input = ! '') {

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("fullUrl", input);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            fetch(postUrl, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

        }
        else {
            console.log('Empty input')
        }
    };

    return (<div className="newsletter-subscribe">
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
                    <button className="btn btn-primary" type="button" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    </div>)
}