import axios from "axios"
import { useRouter } from "next/router";
import { Context } from '../../context/Store'
import { useContext, useEffect, useState } from 'react';
import randomColor from 'randomcolor';
import copy from 'copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import Ripples from 'react-ripples'
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCookie, removeCookies, setCookies } from 'cookies-next';
import buildId from 'build-id'


const refreshUserData = async () => {

    var url = process.env.NEXT_PUBLIC_DOMAIN_URL;

    async function sendReq(token, url) {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`
            }
        });

        return response.json();
    }

    // get token from storage
    const refresh = await getCookie('refreshToken');

    // send conditional request
    if (!refresh) {
        removeCookies('accessToken');
        return { authorization: false, expired: true, payload: null }
    }

    else {
        const data = await sendReq(refresh, url + '/api/user/auth');
        return data;

    };

    return data;
};


export default function Profile() {
    const router = useRouter();
    const [state, setState] = useContext(Context);
    const user = state.user?.payload;
    const sessionId = getCookie('session')

    const handleLogout = async () => {
        await axios.post('/api/user/revoke');
        router.push('/account?tab=login')
    };

    const updateUserState = async () => {
        const authData = await refreshUserData();
        await setState(prevState => ({
            ...prevState,
            ['user']: authData,
            ['authorized']: true,
        }));
    };

    useEffect(() => {
        updateUserState();
        console.log('refreshing')
    }, [sessionId])

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
                        {user && user.links != undefined && (
                            <div className="filter-result">
                                <p className="mb-30 ff-montserrat">Total URLs : {user.links.length}</p>
                                {user.links.length == 0 ? <NoLink /> : user.links.map((id, index) =>
                                    <Link Id={id} key={index} />
                                ) }
                            </div>
                        ) 
                        }

                    </div>

                </div>
            </div>

        </div>

    )
}

export function Link({ Id }) {

    const router = useRouter();
    const [state, setState] = useContext(Context);
    const user = state.user?.payload;
    const [color, setColor] = useState(randomColor());
    const [url, setUrl] = useState(process.env.NEXT_PUBLIC_DOMAIN_URL);
    const [res, setRes] = useState(null);

    const copyUrl =  async (url) => {
        copy(url);
        toast('📋 Url copied to clipboard', {
            position: "top-center",
            autoClose: 1200,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };


    const getUrlData = async () => {
        const res = await axios.post(url + '/api/getUrl/' + Id, { app: true });
        await setRes(res.data);
    };

    const updateSession = async () => {
        removeCookies('session')
        const sessionId = await buildId(50)
        setCookies('session', sessionId);
    }

    async function deleteUrl(id) {
        const promise = axios.post('/api/user/app/deleteUrl', { userId: user.userId, urlId: id });
        toast.promise(promise, {
            pending: 'Deleting Url...',
            success: 'Url deleted!',
            error: 'Something went wrong'
        }
        ).then(() => {

            updateSession().then(() => {
                router.push('/account')
            }).catch((err) => console.log(err))

        }).catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getUrlData().catch(console.log("Cannot fetch url data"));
    }, [])

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
            <div className="job-left my-1 d-md-flex align-items-center flex-wrap">
                <div className="img-holder mr-md-4 mb-md-0 mb-4 mx-auto mx-md-0 d-md-none d-lg-flex" style={{ backgroundColor: color }}>
                    {res ? res.clicks : 0}
                </div>
                <div className="job-content">
                    <h5 className="text-md-left" style={{ paddingLeft: "30px" }}> <small>shwt.xyz/</small>
                        <strong className="text-primary">{Id} </strong></h5>

                        <ul className=" text-start d-md-flex flex-wrap text-break  ff-open-sans" >
                            <p className="pt-1 text-muted pe-auto"  ><a href={res && res.fullUrl} rel="noreferrer" className="text-muted" target="_blank">
                                <LinkIcon fontSize="large"  /></a> <Ripples> {res ? (res.fullUrl).substring(0, 80) + ' ...' : <p className="placeholder-glow">
                            <span className="placeholder col-10"></span>
                            </p>}</Ripples> </p>
                    </ul>
                </div>
            </div>
            <div className="job-right my-2 flex-shrink-0">
                    <a type="button" className="btn d-block w-100 d-sm-inline-block btn-light text-muted" onClick={() => copyUrl(`${url}/${Id}`)}>
                            <ContentCopyIcon fontSize="small" label="Copy" />
                    </a>

                    <a type="button" className="btn d-block w-100 d-sm-inline-block btn-light mt-3 " data-bs-toggle="modal"
                        data-bs-target="#deleteModel"><DeleteIcon color="gray" /></a>

                <div className="modal fade" id="deleteModel" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content rounded-4 shadow">
                            <div className="modal-body p-4 text-center">
                                <h5 className="mb-0">Delete this shwt?</h5>
                                <p className="mb-0">You can always change your mind.</p>
                            </div>
                            <div className="modal-footer flex-nowrap p-0">
                                    <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
                                        onClick={() => deleteUrl(Id)}
                                        data-bs-dismiss="modal">
                                        <strong>Yes, delete</strong>
                                    </button>
                                <button type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0" data-bs-dismiss="modal">No thanks</button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
            </>
    )
};


export function NoLink() {
    return (
        <h1>Empty</h1>)
}