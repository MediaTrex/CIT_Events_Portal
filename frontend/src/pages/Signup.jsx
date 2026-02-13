import { Link } from "react-router-dom";
import InputBox from "../components/InputBox";
import { KeyRound, Mail, Phone, School } from "lucide-react";
import { useState } from "react";
import Carousel from "../components/Carousel";

const Signup = () => {
    const [role, setRole] = useState("");

    return (
        <div className="flex min-h-screen p-6 pt-20 bg-linear-to-tr from-slate-300 to-slate-500">
            <div className="mx-auto flex  max-h-155 min-h-fit  max-lg:h-fit  rounded-lg overflow-hidden shadow">
                <Carousel />
                <form className="flex flex-1 flex-col items-center justify-center gap-3 bg-[rgb(242,245,251)] w-md shadow p-4 max-lg:p-6">
                    <h1 className="text-center text-4xl font-bold max-sm:text-3xl">
                        Sign Up
                    </h1>
                    <p className="flex text-lg gap-2">
                        <p className="text-slate-700 max-sm:text-sm">
                            Already have an account?
                        </p>
                        <Link
                            to={"/login"}
                            className="text-blue-900 underline max-sm:text-sm"
                        >
                            Click here
                        </Link>
                    </p>
                    <InputBox
                        type="text"
                        placeholder="Participant Name"
                        className="mt-5 max-sm:py-2 max-sm:text-sm"
                    />
                    {/* select role  */}
                    <div className="w-full">
                        <select
                            id="mySelect"
                            value={role}
                            required
                            onChange={(e) => setRole(e.target.value)}
                            className="block max-sm:py-2 max-sm:text-sm w-full font-semibold text-lg py-3 px-5 bg-white focus:outline-none rounded-full appearance-none text-gray-500"
                        >
                            <option value="">--Participant Type--</option>
                            <option value="citian">CITIAN</option>
                            <option value="organizer">CIT Organizer</option>
                            <option value="external">
                                External Participant
                            </option>
                        </select>
                    </div>
                    {role === "external" && (
                        <div className="w-full">
                            <select
                                id="mySelect"
                                required
                                className="block max-sm:py-2 max-sm:text-sm w-full font-semibold text-lg py-3 px-5 bg-white focus:outline-none rounded-full appearance-none text-gray-500"
                            >
                                <option value="">
                                    --External Participant Type--
                                </option>
                                <option value="citian">Type1</option>
                                <option value="organizer">Type2</option>
                                <option value="external">Type3</option>
                            </select>
                        </div>
                    )}

                    <InputBox
                        icon={Phone}
                        type="number"
                        placeholder="Phone Number"
                        className={"max-sm:py-2 max-sm:text-sm"}
                    />
                    <InputBox
                        icon={Mail}
                        type="email"
                        placeholder="Email"
                        className="max-sm:py-2 max-sm:text-sm"
                    />
                    {role === "external" && (
                        <InputBox
                            icon={School}
                            type="text"
                            placeholder="College Name"
                            className="max-sm:py-2 max-sm:text-sm"
                        />
                    )}
                    <InputBox
                        icon={KeyRound}
                        type="password"
                        placeholder="Password"
                        className="max-sm:py-2 max-sm:text-sm"
                    />
                    <button className="max-sm:text-sm text-white tracking-widest font-semibold cursor-pointer bg-[rgb(58,60,165)] px-7 py-3 rounded-full">
                        SIGN UP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
