import { UserRound } from "lucide-react";
import InputBox from "./InputBox";
import { FaPeopleGroup } from "react-icons/fa6";
import { useState } from "react";

function CreateTeam() {
    const [newTeamDetails, setNewTeamDetails] = useState({ teamSize: 1 });
    console.log(newTeamDetails);

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Team Creation
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left: Create Team */}
                <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Create a Team
                    </h2>
                    <p className="text-sm text-gray-500 bg-gray-50 rounded-lg border-2 border-gray-100 p-4">
                        Create team before registering team event. Team must
                        contain registered participants.
                    </p>

                    <div className="space-y-4">
                        {/* Team Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Team Name
                            </label>
                            <InputBox
                                icon={FaPeopleGroup}
                                type="text"
                                placeholder="Enter team name"
                                className="mt-1 w-full bg-gray-50 rounded-lg border border-gray-300 max-sm:py-2 max-sm:text-sm"
                                onChange={(e) => {
                                    setNewTeamDetails({
                                        ...newTeamDetails,
                                        teamName: e.target.value,
                                    });
                                }}
                            />
                        </div>

                        {/* Team Size */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Team Size
                            </label>
                            <select
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
                                onChange={(e) => {
                                    setNewTeamDetails({
                                        ...newTeamDetails,
                                        teamSize: e.target.value,
                                    });
                                }}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>

                        {/* Participants Username */}
                        <div className="flex flex-col gap-3">
                            {[...Array(Number(newTeamDetails.teamSize))].map(
                                (_, i) => {
                                    return (
                                        <div key={i}>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Participant {i + 1}'s Username
                                            </label>
                                            <InputBox
                                                id={`participant${i + 1}`}
                                                icon={UserRound}
                                                type="text"
                                                placeholder="Enter username"
                                                className="mt-1 w-full bg-gray-50 rounded-lg border border-gray-300 max-sm:py-2 max-sm:text-sm"
                                                onChange={(e) => {
                                                    setNewTeamDetails({
                                                        ...newTeamDetails,
                                                        [e.target.id]:
                                                            e.target.value,
                                                    });
                                                }}
                                            />
                                        </div>
                                    );
                                },
                            )}
                        </div>

                        {/* Submit Button */}
                        <button className="w-full cursor-pointer bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition">
                            Submit
                        </button>
                    </div>
                </div>

                {/* Right: Team Details */}
                <div className="shrink-0 bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Team Details
                    </h2>

                    {/* Table */}
                    <div className="overflow-x-auto overflow-y-auto min-h-50 max-h-120">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700 ">
                                    <th className="px-4 py-4 text-nowrap border border-black">
                                        Team ID
                                    </th>
                                    <th className="px-4 py-4 text-nowrap border border-black ">
                                        Team Name
                                    </th>
                                    <th className="px-4 py-4 text-nowrap border border-black">
                                        Team Size
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="px-4 py-4 border border-black">
                                        30569
                                    </td>
                                    <td className="px-4 py-4 border border-black">
                                        Hariman
                                    </td>
                                    <td className="px-4 py-4 border border-black">
                                        1
                                    </td>
                                </tr>

                                <tr className="border-t">
                                    <td className="px-4 py-4 border border-black">
                                        30569
                                    </td>
                                    <td className="px-4 py-4 border border-black">
                                        Hariman
                                    </td>
                                    <td className="px-4 py-4 border border-black">
                                        1
                                    </td>
                                </tr>

                                <tr className="border-t">
                                    <td className="px-4 py-4 border border-black">
                                        30569
                                    </td>
                                    <td className="px-4 py-4 border border-black">
                                        Hariman
                                    </td>
                                    <td className="px-4 py-4 border border-black">
                                        1
                                    </td>
                                </tr>

                                <tr className="border-t">
                                    <td className="px-4 py-4 border border-black">
                                        30569
                                    </td>
                                    <td className="px-4 py-4 border border-black">
                                        Hariman
                                    </td>
                                    <td className="px-4 py-4 border border-black">
                                        1
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTeam;
