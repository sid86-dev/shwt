import Link from 'next/link'
import { Context } from '../context/Store'
import { useContext } from 'react';

export default function Navbar({ current }) {

    const [state, setState] = useContext(Context);

    return (
        <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
                <li className="nav-item"><Link href="/" >
                    <a onClick={() => setState(prevState => ({
                        ...prevState,
                        ['nav']: 'home'
                    }))
                    }
                        className={state.nav === 'home' ? 'nav-link active' : ('nav-link')}
                     aria-current="page">
                        Home
                    </a>
                </Link>
                </li>
                <li className="nav-item"><a target="_blank" rel="noreferrer" href="https://github.com/sid86-dev/shwt-serverless" className="nav-link">Source</a></li>
                <li className="nav-item"><a target="_blank" rel="noreferrer" href="https://qrgen-beta.vercel.app/" className="nav-link">Qr Gen</a></li>
                <li className="nav-item">
                    <Link href="/account" >
                        <a onClick={() => setState(prevState => ({
                            ...prevState,
                            ['nav']: 'account'
                        }))}
                        className={state.nav === 'account' ? 'nav-link active' : ('nav-link')}
                        >
                            Account
                        </a>
                    </Link>
                </li>
            </ul>
        </header>
    )
}