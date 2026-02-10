import { Link } from "react-router-dom";
import InputBox from "../components/InputBox";
import { Mail, Phone, UserRound } from "lucide-react";

const Signup = () => {
    return (
        <div className="min-h-screen p-6 pt-20">
            <form className="flex flex-col items-center gap-3 bg-[rgb(242,245,251)] mx-auto w-md shadow rounded-lg p-6">
                <h1 className="text-center text-4xl font-bold ">Sign Up</h1>
                <p className="flex text-lg gap-2">
                    <p className="text-slate-700">Already have an account?</p>
                    <Link to={"/login"} className="text-blue-900 underline">
                        Click here
                    </Link>
                </p>
                <InputBox
                    type="text"
                    placeholder="Participant Name"
                    className="mt-5"
                />
                <InputBox
                    icon={UserRound}
                    type="text"
                    placeholder="Create Username"
                />
                <InputBox icon={Phone} type="text" placeholder="Phone Number" />
                <InputBox icon={Mail} type="text" placeholder="Email" />
                <button className="text-white tracking-widest font-semibold cursor-pointer bg-[rgb(58,60,165)] px-7 py-3 rounded-full">
                    SIGN UP
                </button>
            </form>
        </div>
    );
};

export default Signup;
