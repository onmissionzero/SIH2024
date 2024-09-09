import { Link, useRouteError } from "react-router-dom";

function NotFound() {
    
    const error = useRouteError();

    return (
        <div
        className="bg-black w-full h-screen min-h-max"
        >
            <section className="pt-24 flex flex-col items-center text-white font-inter">
                <p className="text-8xl p-5 font-semibold">{ error?.status ? error.status : '404' }</p>
                <p className="text-6xl p-5 font-semibold">Page Not Found</p>
                <Link
                to="/"
                className="mt-10 rounded-lg transition duration-300 ease-in-out transform hover:scale-110"
                >
                    <p className="border-2 border-[#363636] font-medium rounded-lg px-3 py-2 leading-none text-center">
                        Go Back Home
                    </p>
                </Link>
            </section>
        </div>
    );
}

export default NotFound