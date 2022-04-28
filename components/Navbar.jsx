import Link from 'next/link'

export default function Navbar() {
    return (
        <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
                <li className="nav-item"><Link  href="/"><a className="nav-link active" aria-current="page">Home</a></Link></li>
                <li className="nav-item"><a target="_blank" rel="noreferrer" href="https://github.com/sid86-dev/shwt-serverless" className="nav-link">Source</a></li>
                <li className="nav-item"><Link  href="/invalid"><a className="nav-link">Pricing</a></Link></li>
                <li className="nav-item"><a target="_blank" rel="noreferrer" href="https://qrgen-beta.vercel.app/" className="nav-link">Qr Gen</a></li>

            </ul>
        </header>
    )
}