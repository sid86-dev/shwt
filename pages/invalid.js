import Link from 'next/link'

export default function Test() {
	return (
        <div className="container-fluid vh-100 not-available">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>
                            Oops!</h1>
                        <h2>
                            URL not Found</h2>
                        <div className="error-details">
                            Sorry, the short Url does not exist, try creating a new one!
                        </div>
                        <div className="error-actions">
                            <Link href="/" >
                            <a className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>
                                    <i className="bi bi-house-door"></i> Take Me Home </a>
                            
                            </Link>
                            <Link href="/" >
                            <a className="btn btn-secondary btn-lg">
                                <span className="glyphicon glyphicon-envelope">
                                    </span> <i className="bi bi-envelope"></i> Contact Support </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)
}