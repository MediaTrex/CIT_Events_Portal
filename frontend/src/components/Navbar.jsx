import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex items-center justify-between bg-slate-800 h-26 px-5 text-white shadow-lg">
            <h2 className="text-xl font-semibold">
                <Link to={'/'}>
                    <img
                        src="/chennai-cit-logo.svg"
                        alt="Chennai CIT College Logo"
                        className="h-15 object-contain"
                    />
                </Link>
            </h2>

            <ul className="flex items-center gap-5 list-none">
                <li>
                    <Link
                        to="/"
                        className="text-white hover:text-sky-400 transition"
                    >
                        Home
                    </Link>
                </li>

                <li>
                    <Link
                        to="/login"
                        className="bg-sky-400 px-4 py-1.5 rounded text-black font-semibold hover:bg-sky-300 transition"
                    >
                        Login
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
