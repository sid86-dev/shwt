import axios from "axios"
import { useRouter } from "next/router";
import { Context } from '../../context/Store'
import { useContext, useEffect, useState } from 'react';
import randomColor from 'randomcolor';

export default function Profile() {
    const router = useRouter();
    const [state, setState] = useContext(Context);

    const user = state.user?.payload;

    const handleLogout = async () => {
        await axios.post('/api/user/revoke');
        router.push('/account?tab=login')
    };

    return (


        <div className="container">
            <div className="row">
                <div className="col-lg-10 mx-auto">
                    <div className="career-search mb-60">

                        <div className="career-form mb-60">
                            <div className="row justify-content-end">

                                <div className="col-md-6 col-lg-3 my-3">
                                    <img className="me-3" src="/logo.png" alt="" width="55" height="50" />
                                </div>

                                <div className="col-md-6 col-lg-3 my-3">
                                    <div className="input-group position-relative">
                                        <input type="text" className="form-control" placeholder="Enter Your Keywords" id="keywords" />
                                        <button className="btn btn-light btn-sm" ><span>Search</span></button>

                                    </div>

                                </div>
                                <div className="col-md-6 col-lg-3 my-3">
                                    <div className="select-container">
                                        <select className="custom-select">
                                            <option selected="">Last Modified</option>
                                            <option value="1">Date Created</option>
                                            <option value="2">Most Visited</option>
                                        </select>
                                    </div>
                                </div>
                                {user != undefined && (
                                    <>
                                        <div className="col-md-6 col-lg-3 my-3 text-end">
                                            <span className="text-light px-1">signed : {user.email}</span>

                                            <button className="btn btn-dark btn-sm" onClick={handleLogout}>Logout</button>

                                        </div>
                                    </>
                                )
                                }

                            </div>
                        </div>
                        {user && user.links != undefined ? (
                            <div className="filter-result">
                                <p className="mb-30 ff-montserrat">Total URLs : {user.links.length}</p>
                                { user.links.map((id, index) =>
                                    <Link Id={id} key={index} />
                                ) }
                            </div>
                        ) : <NoLink />
                        }

                    </div>

                </div>
            </div>

        </div>

    )
}

export function Link({ Id }) {

    const [color, setColor] = useState(randomColor());
    const [url, setUrl] = useState(process.env.NEXT_PUBLIC_DOMAIN_URL);
    const [res, setRes] = useState(null);

    useEffect(() => {
        axios.post(url + '/api/getUrl/' + Id, { app: true }).then((res) => {
            console.log(res.data)
            setRes(res.data);
        }).catch((err) => console.log(err))
    }, [])

    return (
        <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
            <div className="job-left my-1 d-md-flex align-items-center flex-wrap">
                <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex" style={{ backgroundColor: color }}>
                    {res ? res.clicks : 0}
                </div>
                <div className="job-content">
                    <h5 className="text-md-left" style={{ paddingLeft: "30px" }}> <small>shwt.xyz/</small>
                        <strong className="text-primary">{Id} </strong></h5>

                    <ul className=" text-start d-md-flex flex-wrap text-break  ff-open-sans">
                        <p className="pt-1 text-muted"  >{res ? (res.fullUrl).substring(0,80)+' ...' : <p className="placeholder-glow">
                            <span className="placeholder col-10"></span>
                        </p>}</p>
                    </ul>
                </div>
            </div>
            <div className="job-right my-2 flex-shrink-0">
                <a className="btn d-block w-100 d-sm-inline-block btn-light ">more</a>
            </div>
        </div>

    )
};


export function NoLink() {
    return (
        <h1>Empty</h1>)
}