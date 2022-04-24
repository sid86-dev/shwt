import Link from 'next/link'

export default function Footer() {
    return (
        <footer class="footer">
            <div className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top position-absolute bottom-0 m-3">
            <p className="col-md-4 mb-0 text-muted">© 2022 Shwt</p>

                <Link href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <span className="text-muted">Shwt</span>
            </Link>

            <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Source</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
                    <li className="nav-item"><a target="_blank" rel="noreferrer" href="https://qrgen-beta.vercel.app/"  className="nav-link px-2 text-muted">QR Gen</a></li>
            </ul>
            </div>
        </footer>)
}