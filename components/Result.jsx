import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Result({ data }) {

    console.log(data)

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
            <div className="row">
                <div className="col">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={shortUrl} placeholder="Recipient's username"
                            aria-label="Recipient's username" aria-describedby="basic-addon2" />

                        <span className="input-group-text" id="basic-addon2"><button className="btn" onClick={toClipboard}>copy</button></span>
                    </div>

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