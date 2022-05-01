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
            <div className="d-flex align-items-center p-3 my-3 text-dark bg-purple rounded shadow-sm">
                <img className="me-3" src="/logo.png" alt="" width="55" height="50" />
                    <div className="lh-1">
                    <h1 className="h6 mb-0 text-dark lh-1">Shwt</h1>
                    {user != undefined && (
                        <>
                            <h5 className="card-title">
                                <p className="fs-6">signed : {user.email}</p>
                            </h5>
                    <button className="btn btn-dark btn-sm" onClick={handleLogout}>Logout</button>

                        </>
                    )
                    }

                    </div>
  </div>
           
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                {user != undefined && (
                    <>
                        <h6 className="border-bottom pb-2 mb-0">Recent updates : {user.links.length}</h6>
                        
                        {user.links.map((id, index) =>
                            <Link Id={id} key={index} />
                        )}
                        </>
                        )
                }
                
                <small className="d-block text-end mt-3">
                    <a href="#">All updates</a>
                </small>
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
         <div className="d-flex text-muted pt-3">
             <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32"
                xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32"
                preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                <rect width="100%" height="100%" fill={color}></rect><text x="50%" y="50%"
                    fill={color} dy=".3em">32x32</text></svg>

                    <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                        <div className="d-flex justify-content-between">
                    <span className="d-block text-dark fs-6 fw-bolder"><i className="bi bi-link-45deg"></i>  <small>{url + '/'}
                        </small> <strong className="text-primary"> {Id} </strong></span>

                    <a>Clicks <span className="badge bg-secondary">{res? res.clicks : 0 }</span></a>
                        </div>
                        <p className="pt-1 text-break" >{res ? res.fullUrl : <p className="placeholder-glow">
                    <span className="placeholder col-10"></span>
                </p>}</p>
                    </div>
                </div>

        )
};

