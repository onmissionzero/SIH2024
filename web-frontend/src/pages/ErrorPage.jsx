import { Link } from 'react-router-dom';

function ErrorPage() {

    return (
        <div>
            <section>
                <p>Some Error Occurred</p>
                <Link to="/">
                    <p>
                        Go Back Home
                    </p>
                </Link>
            </section>
        </div>
    );
}

export default ErrorPage;