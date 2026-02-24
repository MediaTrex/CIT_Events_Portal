import { useParams, Link } from "react-router-dom";
import cards from "../data";

function EventDetails() {
    const { id } = useParams();

    const card = cards.find((c) => c.id === Number(id));

    if (!card) {
        return (
            <h2 className="text-center text-2xl mt-10 font-bold">Not Found</h2>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Main Box */}
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
                {/* Left - Image */}
                <div className="md:w-1/2 w-full">
                    <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right - Details */}
                <div className="md:w-1/2 w-full p-6 space-y-4">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-800">
                        {card.title}
                    </h1>

                    {/* Content */}
                    <p className="text-lg text-gray-600">{card.content}</p>

                    {/* Description Box */}
                    <div className="border-t pt-4 text-gray-700">
                        <p>
                            <span className="font-semibold">Description: </span>
                            {card.details}
                        </p>

                        <p className="mt-2">
                            <span className="font-semibold">Category: </span>
                            {card.title}
                        </p>

                        <p className="mt-2">
                            <span className="font-semibold">Status: </span>
                            Available
                        </p>
                    </div>

                    {/* Registered Box */}
                    <div className="bg-lime-300 text-center py-3 rounded-md font-semibold mt-4">
                        You are viewing{" "}
                        <span className="text-blue-700">{card.title}</span>
                    </div>

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
