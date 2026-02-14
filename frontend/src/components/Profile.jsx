import { useState } from "react";
import InputBox from "./InputBox";
import { Copy, KeyRound } from "lucide-react";

export default function Profile() {
    const [copied, setCopied] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const email = "vuzyvuqy@denipl.net";

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // reset after 2s
    };

    const changePassword = () => {
        if (!newPassword) return alert("Please enter a new password");
        // Handle password change logic here (API call, etc.)
        alert(`Password changed to: ${newPassword}`);
        setNewPassword("");
    };

    return (
        <div className="max-w-3xl mx-auto p-2 md:p-8">
            {/* Header */}
            <h1 className="text-4xl max-sm:text-3xl font-bold text-gray-900 mb-8 text-center mt-6">
                Profile
            </h1>

            {/* Card */}
            <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-6 border border-gray-200">
                {/* Name + ID */}
                <div className="border-b pb-4">
                    <h2 className="text-2xl font-semibold text-gray-800 max-sm:text-xl">
                        Hariman
                    </h2>
                    <p className="text-sm text-gray-500">ID: dfdsfs</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-sm">
                        <span className="text-blue-600 font-medium mb-1 max-sm:text-sm">
                            Email
                        </span>
                        <div className="flex items-center justify-between">
                            <p className="text-gray-700 truncate max-sm:text-sm" title={email}>
                                {email}
                            </p>
                            <button
                            title="Copy Email"
                                onClick={copyEmail}
                                className="ml-4 px-3 py-1 text-[12px] bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-1 cursor-pointer"
                            >
                                {copied ? (
                                    <>
                                        Copied! <Copy size={14}/>{" "}
                                    </>
                                ) : (
                                    <>
                                        Copy <Copy size={14}/>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-sm max-sm:text-sm">
                        <span className="text-blue-600 font-medium mb-1 ">
                            Phone
                        </span>
                        <p className="text-gray-700">3444535636</p>
                    </div>

                    {/* College */}
                    <div className="flex flex-col p-4 bg-gray-50 rounded-lg shadow-sm max-sm:text-sm">
                        <span className="text-blue-600 font-medium mb-1">
                            College
                        </span>
                        <p className="text-gray-700 wrap-break-word">
                            Vellore Institute of Technology, Chennai Campus
                        </p>
                    </div>
                </div>

                {/* Password Section */}
                <div className="pt-6 border-t space-y-5">
                    <span className="text-blue-600 font-medium max-sm:text-sm">
                        Change Password
                    </span>
                    <div className="flex flex-col  md:flex-row md:items-center gap-4  justify-center ">
                        <InputBox
                            icon={KeyRound}
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="flex-1 bg-gray-50 max-sm:py-2 max-sm:text-sm"
                        />
                        <button
                            onClick={changePassword}
                            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition max-sm:text-sm"
                        >
                            Change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
