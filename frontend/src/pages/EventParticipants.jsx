import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const EventParticipants = () => {
    let { id } = useParams();
    const [regestrationType, setRegestrationType] = useState("team");

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl">
                {/* When type of event is individual (not team ) */}
                {regestrationType === "individual" && (
                    <div className="shrink-0  rounded-xl p-6 space-y-6 ">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            All the Registered participants
                        </h2>

                        {/* Table */}
                        <div className="overflow-x-auto overflow-y-auto min-h-50 max-h-180 bg-white">
                            <table className=" w-full border-collapse">
                                <thead className="sticky top-0 border-b border-black">
                                    <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700 ">
                                        <th className="px-4 py-4 text-nowrap border border-black">
                                            User Id
                                        </th>
                                        <th className="px-4 py-4 text-nowrap border border-black ">
                                            Participant Name
                                        </th>
                                        <th className="px-4 py-4 text-nowrap border border-black">
                                            Email
                                        </th>
                                        <th className="px-4 py-4 text-nowrap border border-black">
                                            College Name
                                        </th>
                                        <th className="px-4 py-4 text-nowrap border border-black">
                                            Payment Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t">
                                        <td className="px-4 py-4 border border-black">
                                            1
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            Megha Patel
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            xyz@gmail.com
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            SRM
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            <span className="bg-orange-400 text-white p-2 rounded-lg">
                                                Pending
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="px-4 py-4 border border-black">
                                            1
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            Megha Patel
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            xyz@gmail.com
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            Chennai Institute of technology
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            <span className="bg-red-600 text-white p-2 rounded-lg">
                                                Failed
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="px-4 py-4 border border-black">
                                            1
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            Anny
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            anny23@gmail.com
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            Vellore Institute of technology
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            <span className="bg-green-600 text-white p-2 rounded-lg">
                                                Success
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* When type of event is individual (not team ) */}
                {regestrationType === "team" && (
                    <div className="shrink-0  rounded-xl p-6 space-y-6 ">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            All the Registered Teams
                        </h2>

                        {/* Table */}
                        <div className="overflow-x-auto overflow-y-auto min-h-50 max-h-180 bg-white">
                            <table className=" w-full border-collapse">
                                <thead className="sticky top-0 border-b border-black">
                                    <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700 ">
                                        <th className="px-4 py-4 text-nowrap border border-black">
                                            Team Id
                                        </th>
                                        <th className="px-4 py-4 text-nowrap border border-black ">
                                            Team Name
                                        </th>
                                        <th className="px-4 py-4 text-nowrap border border-black">
                                            Total Amount
                                        </th>
                                        <th className="px-4 py-4 text-nowrap border border-black">
                                            No. of members
                                        </th>
                                        <th className="px-4 py-4 text-nowrap border border-black">
                                            Payment Status
                                        </th>
                                        <th className="px-4 py-4 text-nowrap border border-black">
                                            Participants
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-t">
                                        <td className="px-4 py-4 border border-black">
                                            1
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            Megha Patel
                                        </td>
                                        <td className="px-4 py-4 border border-black text-center text-blue-500">
                                            2000
                                        </td>
                                        <td className="px-4 py-4 border border-black text-center text-xl">
                                            4
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            <span className="bg-orange-400 text-white p-2 rounded-lg">
                                                Pending
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 border border-black text-center">
                                            <Link className="text-blue-700 underline">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="px-4 py-4 border border-black">
                                            2
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            Megha Patel
                                        </td>
                                        <td className="px-4 py-4 border border-black text-center text-blue-500">
                                            1000
                                        </td>
                                        <td className="px-4 py-4 border border-black text-center text-xl">
                                            2
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            <span className="bg-red-600 text-white p-2 rounded-lg">
                                                Failed
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 border border-black text-center">
                                            <Link className="text-blue-700 underline">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="px-4 py-4 border border-black">
                                            3
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            Anny
                                        </td>
                                        <td className="px-4 py-4 border border-black text-center text-blue-500">
                                            5000
                                        </td>
                                        <td className="px-4 py-4 border border-black text-center text-xl">
                                            4
                                        </td>
                                        <td className="px-4 py-4 border border-black">
                                            <span className="bg-green-600 text-white p-2 rounded-lg">
                                                Success
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 border border-black text-center">
                                            <Link className="text-blue-700 underline">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventParticipants;
