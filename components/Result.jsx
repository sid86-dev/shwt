import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Result({ data }) {

    const [shortUrl, setShortUrl] = useState(`https://shwt.xyz/${data.shortId}`)

    const ch = (e) => {
        setShortUrl(e.target.value);
    }

    const toClipboard = () => {
        copy(shortUrl);
        toast('📋 Text copied to clipboard', {
            position: "top-center",
            autoClose: 1200,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
    <div className="container d-flex justify-content-center mt-2 mb-5">
            <div className="row justify-content-center">
                <div className="col-10">
                    <div className="input-group mb-3 py-0">
                        <input type="text" className="form-control text-center" value={shortUrl} placeholder="Recipient's username"
                            aria-label="Recipient's username" aria-describedby="basic-addon2" />

                        <button className="input-group-text" id="basic-addon2"><span className="btn" onClick={toClipboard}>copy</span></button>
                    </div>

                </div>
                <div className="col-8">

                <span className="text-muted text-center">Your old url was {data.fullUrl.length} characters long and the new short url is {shortUrl.length} characters long.</span>
</div>
            </div>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
    </div>
        )
}