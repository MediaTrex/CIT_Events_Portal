import { Calendar, IndianRupee, MapPin, Users } from "lucide-react";
import { BsPersonStanding } from "react-icons/bs";
import { Link } from "react-router-dom";

const MyEvents = () => {
    function formatTime24to12(time24) {
        const [hourStr, minuteStr] = time24.split(":");
        let hour = Number(hourStr);
        const minutes = minuteStr;

        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;

        return `${hour}:${minutes} ${ampm}`;
    }

    const events = [
        {
            id: 1,
            name: "Tech Conference 2026 with a Very Long Name That Should Be Clamped awndn maw dijojaw mawdkaw awkljd a wa ed awlka scjke  emk sdf esf efj ",
            date: "2026-02-25",
            time: "22:30",
            venue: "Kathmandu",
            entryType: "Free",
            participantsAllowedInTeam: 10,
        },
        {
            id: 2,
            name: "Startup Pitch Night",
            date: "2026-03-10",
            time: "6:30",
            venue: "Pokhara",
            entryType: "Paid",
            entryAmount: 1000,
            participantsAllowedInTeam: 4,
        },
        {
            id: 2,
            name: "Startup Pitch Night",
            date: "2026-03-10",
            time: "13:00",
            venue: "Pokhara",
            entryType: "Paid",
            entryAmount: 200,
            participantsAllowedInTeam: 4,
        },
        {
            id: 2,
            name: "Startup Pitch Night",
            date: "2026-03-10",
            time: "00:00",
            venue: "Pokhara",
            entryType: "Paid",
            entryAmount: 300,
            participantsAllowedInTeam: 1,
        },
        {
            id: 1,
            name: "Tech Conference 2026 with a Very Long Name That Should Be Clamped awndn maw dijojaw mawdkaw awkljd a wa ed awlka scjke  emk sdf esf efj ",
            date: "2026-02-25",
            time: "10:00",
            venue: "Kathmandu",
            entryType: "Free",

            participantsAllowedInTeam: 1,
        },
        {
            id: 3,
            name: "AI Workshop",
            date: "2026-04-05",
            time: "2:00",
            venue: "Online",
            entryType: "Free",
            participantsAllowedInTeam: 2,
        },
    ];

    return (
        <div>
            <div className="shrink-0  rounded-xl p-6 space-y-6 ">
                <h2 className="text-3xl font-semibold text-gray-800 text-center mt-7 mb-12">
                    My Event Collection
                </h2>

                <div
                    className="grid gap-6 
                      grid-cols-[repeat(auto-fit,minmax(350px,1fr))]
                      max-sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]
                      "
                >
                    {events.map((event) => (
                        // Event Card
                        <div className="bg-[#2f4154] text-white shadow-md rounded-lg p-6 flex flex-col justify-between">
                            {/* Event Title */}
                            <h2 className="text-2xl font-semibold line-clamp-3 text-yellow-300 text-center mb-3">
                                {event.name}
                            </h2>

                            {/* Event Details */}
                            <div className="space-y-2 text-sm text-gray-300 mt-auto">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>
                                        {formatTime24to12(event.time)} on{" "}
                                        {event.date}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span className="line-clamp-1">
                                        {event.venue}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <IndianRupee size={16} />
                                    <span>{event.entryType}</span>
                                    {event.entryType === "Paid" &&
                                        ` (${event?.entryAmount} per person)`}
                                </div>

                                <div className="flex items-center gap-2">
                                    {event.participantsAllowedInTeam === 1 ? (
                                        <BsPersonStanding size={16} />
                                    ) : (
                                        <Users size={16} />
                                    )}

                                    <span>
                                        {event.participantsAllowedInTeam > 1
                                            ? `1 - ${event.participantsAllowedInTeam}`
                                            : `1`}
                                    </span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <Link to={`event/${event.id}`}>
                                <button className="cursor-pointer w-full mt-4 px-4 py-2 bg-[rgb(0,188,255)] text-white rounded hover:bg-blue-700 transition transition-duration-300">
                                    Preview
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyEvents;
