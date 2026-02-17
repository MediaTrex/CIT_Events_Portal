import { Key, KeyRound, Mail } from "lucide-react";
import InputBox from "../components/InputBox";
import React, { useState } from "react";

const ResetPassword = () => {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
    const [otp, setOtp] = useState("");

    function onEmailSubmit(e) {
        e.preventDefault();
        setIsEmailSent(true);
    }

    // handling input otp
    const inputRefs = React.useRef([]);

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && e.target.value === "" && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData("text");
        const pasteArray = paste.split("");
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        });
    };

    const onSubmitOTP = async (e) => {
        e.preventDefault();
        const otpArray = inputRefs.current.map((e) => e.value);
        setOtp(otpArray.join(""));
        setIsOtpSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex ">
            {/* Enter email address */}
            {!isEmailSent && (
                <div className="mx-auto mt-20 h-fit w-112.5 max-sm:w-87.5  rounded-2xl shadow-lg p-8 max-sm:p-6 text-center bg-white">
                    <h2 className="text-3xl font-bold mb-3 text-slate-600">
                        Reset Password
                    </h2>
                    <p className="text-gray-400 mb-7">
                        Enter the registered email address
                    </p>

                    <form
                        className="flex flex-col items-center"
                        onSubmit={onEmailSubmit}
                    >
                        <InputBox
                            icon={Mail}
                            type="email"
                            placeholder="Email"
                            required
                            className="max-sm:py-2 max-sm:text-sm mb-4 rounded-lg"
                        />

                        <button
                            type="submit"
                            className="bg-linear-to-r bg-[rgb(58,60,165)] text-white text-lg font-medium py-2.5 rounded-lg w-full shadow  hover:bg-[rgb(58,60,180)] transition cursor-pointer"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}

            {/* For adding otp */}

            {!isOtpSubmitted && isEmailSent && (
                <div className="max-w-md mx-auto mt-20 h-fit rounded-2xl shadow-lg p-8 max-sm:p-6 text-center bg-white">
                    <h2 className="text-3xl max-sm:text-2xl font-bold mb-3 text-slate-600">
                        Reset Password OTP
                    </h2>
                    <p className="text-gray-400 mb-7 max-sm:text-sm">
                        Enter the 6-digit OTP sent to your email
                    </p>

                    <form
                        onSubmit={onSubmitOTP}
                        className="flex flex-col items-center"
                    >
                        <div
                            className="flex gap-2 mb-6 justify-center"
                            onPaste={handlePaste}
                        >
                            {Array(6)
                                .fill(0)
                                .map((_, index) => (
                                    <input
                                        type="text"
                                        key={index}
                                        maxLength={1}
                                        pattern="[0-9]*"
                                        required
                                        ref={(e) =>
                                            (inputRefs.current[index] = e)
                                        }
                                        onInput={(e) => handleInput(e, index)}
                                        onKeyDown={(e) =>
                                            handleKeyDown(e, index)
                                        }
                                        className="w-12 max-sm:w-10 h-14 max-sm:h-12 text-2xl text-center border-2 border-gray-300 rounded-lg outline-none bg-gray-100 focus:border-gray-500 focus:bg-white transition"
                                    />
                                ))}
                        </div>
                        <button
                            type="submit"
                            className="bg-linear-to-r bg-[rgb(58,60,165)] text-white text-lg font-medium py-2.5 rounded-lg w-full shadow  hover:bg-[rgb(58,60,180)] transition cursor-pointer"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}

            {/* Enter new password */}
            {isOtpSubmitted && isEmailSent && (
                <div className="max-w-md mx-auto mt-20 h-fit rounded-2xl shadow-lg p-8 text-center bg-white">
                    <h2 className="text-3xl font-bold mb-3 text-slate-600">
                        New Password
                    </h2>
                    <p className="text-gray-400 mb-7">
                        Enter the new password below
                    </p>

                    <form className="flex flex-col items-center">
                        <InputBox
                            icon={KeyRound}
                            type="password"
                            placeholder="Password"
                            minLength={6}
                            required
                            className="max-sm:text-sm mb-4 rounded-lg"
                        />

                        <button
                            type="submit"
                            className="bg-linear-to-r bg-[rgb(58,60,165)] text-white text-lg font-medium py-2.5 rounded-lg w-full shadow  hover:bg-[rgb(58,60,180)] transition cursor-pointer"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;
