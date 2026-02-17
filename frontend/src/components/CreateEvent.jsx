import { useState } from "react";
import InputBox from "./InputBox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const CreateEvent = () => {
    const [eventDetails, setEventDetails] = useState({});
    const [rule, setRule] = useState("");
    const [eventRules, setEventRules] = useState([]);
    console.log(eventRules);

    function onRulesSubmit(e) {
        e.preventDefault();
        if (!rule) return;
        setEventRules([...eventRules, rule]);
        setRule("");
    }

    return (
        <div className="max-w-3xl mx-auto p-2 md:p-8">
            {/* Header */}
            <h1 className="text-4xl max-sm:text-3xl font-bold text-gray-900 mb-8 text-center mt-6">
                Create Event
            </h1>

            {/* Card */}
            <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 space-y-5 border border-gray-200">
                <div className="border-b pb-4">
                    <h2 className="text-2xl font-semibold text-gray-800 max-sm:text-xl">
                        Enter Event Details
                    </h2>
                </div>

                <p className="text-sm text-gray-500 bg-gray-50 rounded-lg border-2 border-gray-100 p-4">
                    Make sure all the details about Event are before creating
                    the event.
                </p>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Event Name
                    </label>
                    <InputBox
                        type="text"
                        placeholder="Enter Event name"
                        className="mt-1 w-full bg-gray-50 rounded-lg border border-gray-300 max-sm:py-2 max-sm:text-sm"
                        value={eventDetails.eventName}
                        onChange={(e) =>
                            setEventDetails({
                                ...eventDetails,
                                eventName: e.target.value.toUpperCase(),
                            })
                        }
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Event Description
                    </label>
                    <Textarea
                        className="mt-1 border-gray-300 focus-visible:ring-0"
                        placeholder="Enter Event description"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Rules/Policy for Event
                    </label>

                    {/*  rules in bulletpoint */}
                    {eventRules.length !== 0 && (
                        <div>
                            <ul className="bg-gray-50 p-2 mb-2 border border-gray-300 rounded-lg">
                                {eventRules.map((rule, index) => (
                                    <li
                                        key={index}
                                        className="list-disc list-inside"
                                    >
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/*  add rules */}
                    <form
                        className="flex gap-2  items-center"
                        onSubmit={onRulesSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Enter Rule"
                            value={rule}
                            onChange={(e) => setRule(e.target.value).trim()}
                            className="focus:outline-none w-1/2 max-sm:w-full bg-gray-50 rounded-lg border border-gray-300 max-sm:py-2 max-sm:text-sm py-1 px-2"
                        />
                        <button className="rounded-lg  bg-yellow-400 px-4 py-2 text-white text-nowrap cursor-pointer font-semibold text-sm hover:bg-yellow-500 transition">
                            Add Rule
                        </button>
                    </form>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Upload Event Banner
                    </label>
                    <Input
                        type="file"
                        className="w-1/2 cursor-pointer border border-gray-300 mt-1"
                        required
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
