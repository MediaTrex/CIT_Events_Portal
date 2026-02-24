import { useParams, Link } from "react-router-dom";
import cards from "../data";
import FallBack404 from "./FallBack404";
import {
    Calendar,
    Clock,
    Home,
    MapPin,
    Notebook,
    User,
    Users,
} from "lucide-react";

function EventDetails() {
    function formatTime24to12(time24) {
        const [hourStr, minuteStr] = time24.split(":");
        let hour = Number(hourStr);
        const minutes = minuteStr;

        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;

        return `${hour}:${minutes} ${ampm}`;
    }

    const { id } = useParams();

    const event = cards.find((c) => c.id === Number(id));

    if (!event) {
        return <FallBack404 />;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Main Box */}
            <div className="max-w-7xl mx-auto  flex flex-row max-md:flex-col  gap-5">
                {/* Left - Image */}
                <div className=" flex-1">
                    <img
                        src={event.bannerUrl}
                        alt={event.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right */}
                <div className="space-y-4 flex-1  h-fit">
                    {/* details */}
                    <div className="rounded-xl shadow-lg bg-white pr-1">
                        {/* Event name */}
                        <div className="flex border-b border-gray-200 pb-2 pt-2">
                            <div className="p-2">
                                <span className="text-white">
                                    <User className="bg-blue-500 h-7 w-7 p-1 rounded-lg" />
                                </span>
                            </div>
                            <div>
                                <h1 className="font-semibold">Event Name</h1>
                                <p className="text-[15px] text-slate-600">{event.name}</p>
                            </div>
                        </div>
                        {/* event description */}
                        <div className="flex border-b border-gray-200 pb-2 pt-2">
                            <div className="p-2">
                                <span className="text-white">
                                    <Notebook className="bg-blue-500 h-7 w-7 p-1 rounded-lg" />
                                </span>
                            </div>
                            <div>
                                <h1 className="font-semibold">
                                    Event Description
                                </h1>
                                <p className="text-[15px] text-slate-600">
                                    {event.eventDescription}
                                </p>
                            </div>
                        </div>
                        {/* policy/rules (optional)*/}
                        {event.policy && (
                            <div className="flex border-b border-gray-200 pb-2 pt-2">
                                <div className="p-2">
                                    <span className="text-white">
                                        <Notebook className="bg-blue-500 h-7 w-7 p-1 rounded-lg" />
                                    </span>
                                </div>
                                <div>
                                    <h1 className="font-semibold">
                                        Policy/Rules{" "}
                                    </h1>
                                    <ul className="text-[15px] list-disc pl-4 text-slate-600">
                                        {event.policy
                                            .split("\n")
                                            .map((rule, index) => (
                                                <li key={index}>{rule}</li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* participants */}
                        <div className="flex border-b border-gray-200 pb-2 pt-2">
                            <div className="p-2">
                                <span className="text-white">
                                    <Users className="bg-blue-500 h-7 w-7 p-1 rounded-lg" />
                                </span>
                            </div>
                            <div>
                                <h1 className="font-semibold">Participants</h1>
                                <p className="text-[15px] text-slate-600">
                                    {event.participantsAllowedInTeam > 1
                                        ? `1 - ${event.participantsAllowedInTeam}`
                                        : `1`}
                                </p>
                            </div>
                        </div>
                        {/* event date */}
                        <div className="flex border-b border-gray-200 pb-2 pt-2">
                            <div className="p-2">
                                <span className="text-white">
                                    <Calendar className="bg-blue-500 h-7 w-7 p-1 rounded-lg" />
                                </span>
                            </div>
                            <div>
                                <h1 className="font-semibold">Event Date</h1>
                                <p className="text-[15px] text-slate-600" >{event.date}</p>
                            </div>
                        </div>
                        {/* event venue */}
                        <div className="flex border-b border-gray-200 pb-2 pt-2">
                            <div className="p-2">
                                <span className="text-white">
                                    <MapPin className="bg-blue-500 h-7 w-7 p-1 rounded-lg" />
                                </span>
                            </div>
                            <div>
                                <h1 className="font-semibold">Event Venue</h1>
                                <p className="text-[15px] text-slate-600">{event.venue}</p>
                            </div>
                        </div>
                        {/* event time */}
                        <div className="flex border-b border-gray-200 pb-2 pt-2">
                            <div className="p-2">
                                <span className="text-white">
                                    <Clock className="bg-blue-500 h-7 w-7 p-1 rounded-lg" />
                                </span>
                            </div>
                            <div>
                                <h1 className="font-semibold">Event Time</h1>
                                <p className="text-[15px] text-slate-600">
                                    {formatTime24to12(event.time)}
                                </p>
                            </div>
                        </div>
                        {/* conducted by */}
                        <div className="flex border-b border-gray-200 pb-2 pt-2">
                            <div className="p-2">
                                <span className="text-white">
                                    <Home className="bg-blue-500 h-7 w-7 p-1 rounded-lg" />
                                </span>
                            </div>
                            <div>
                                <h1 className="font-semibold">Conducted By</h1>
                                <p className="text-[15px] text-slate-600">
                                    {event.conductedBy}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Registered Box */}

                    {/* Back Button */}
                    <div className="text-center mt-4">
                        <Link
                            to="/"
                            className="inline-block bg-yellow-300 px-6 py-2 rounded-md hover:bg-yellow-400 transition"
                        >
                            Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetails;
