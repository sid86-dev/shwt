export default function Navbar() {
    return (
        <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
                <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">Home</a></li>
                <li className="nav-item"><a href="#" className="nav-link">Source</a></li>
                <li className="nav-item"><a href="#" className="nav-link">Pricing</a></li>
                <li className="nav-item"><a target="_blank" href="https://qrgen-beta.vercel.app/" className="nav-link">Qr Gen</a></li>
            </ul>
        </header>
    )
}