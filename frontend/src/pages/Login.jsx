import { Link } from "react-router-dom";
import InputBox from "../components/InputBox";
import { KeyRound } from "lucide-react";
import Carousel from "../components/Carousel";

const Login = () => {
    return (
        <div className="flex min-h-screen p-6 pt-20 bg-linear-to-tr from-slate-300 to-slate-500">
            <div className="mx-auto flex  h-150 max-lg:h-fit  rounded-lg overflow-hidden shadow">
                <Carousel />
                <form className="flex flex-1 flex-col items-center justify-center gap-3 bg-[rgb(242,245,251)] w-md shadow p-6">
                    <h1 className="text-center text-4xl font-bold max-sm:text-3xl">
                        Sign In
                    </h1>
                    <p className="flex text-lg gap-2">
                        <p className="text-slate-700 max-sm:text-sm">
                            Dont have an account?
                        </p>
                        <Link
                            to={"/signup"}
                            className="text-blue-900 underline max-sm:text-sm"
                        >
                            Click here
                        </Link>
                    </p>
                    <InputBox
                        type="text"
                        placeholder="Email"
                        className="mt-5 max-sm:py-2 max-sm:text-sm"
                    />

                    <InputBox
                        icon={KeyRound}
                        type="password"
                        placeholder="Password"
                        className="max-sm:py-2 max-sm:text-sm"
                    />
                    <button className="max-sm:text-sm text-white tracking-widest font-semibold cursor-pointer bg-[rgb(58,60,165)] px-7 py-3 rounded-full">
                        SIGN IN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
