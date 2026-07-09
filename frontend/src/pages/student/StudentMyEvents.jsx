import { Link } from "react-router-dom";
import { REGISTERED_EVENTS } from "../../data/registeredEvents";

// Helper function to get payment status badge color
const getPaymentStatusColor = (status) => {
    switch (status) {
        case "Paid":
            return "bg-green-100 text-green-800";
        case "Pending":
            return "bg-yellow-100 text-yellow-800";
        case "Failed":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

// Helper function to get event type badge color
const getEventTypeColor = (type) => {
    return type === "Team"
        ? "bg-blue-100 text-blue-800"
        : "bg-purple-100 text-purple-800";
};

export default function StudentMyEvents() {
    return (
        <main className="max-w-300 mx-auto min-h-screen bg-(--cit-bg) py-4 md:py-6">
            <div className="mx-auto w-full rounded-(--cit-radius-xl) border border-(--cit-border) bg-(--cit-surface) p-3 sm:p-5 md:p-7">
                <div className="mb-6 md:mb-8">
                    <h1 className="text-sm sm:text-lg font-extrabold text-(--cit-text)">
                        See all your registered events here,
                    </h1>
                    <p className=" text-xs sm:text-sm text-(--cit-text-muted)">
                        Manage your registrations, payments, and event details.
                    </p>
                </div>

                {REGISTERED_EVENTS.length === 0 ? (
                    <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-bg) p-6 sm:p-8 text-center">
                        <p className="text-sm sm:text-base text-(--cit-text-muted)">
                            You haven't registered for any events yet.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Table View - All Devices with Y-axis Scroll */}
                        <div className="rounded-(--cit-radius-lg) border border-(--cit-border) overflow-hidden flex flex-col max-h-150">
                            <div className="overflow-x-auto overflow-y-auto flex-1">
                                <table className="w-full text-xs sm:text-sm">
                                    <thead className="bg-(--cit-bg) border-b border-(--cit-border) sticky top-0 z-10">
                                        <tr>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-(--cit-text) whitespace-nowrap">
                                                ID
                                            </th>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-(--cit-text) whitespace-nowrap">
                                                Event Name
                                            </th>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-(--cit-text) whitespace-nowrap">
                                                Type
                                            </th>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-(--cit-text) whitespace-nowrap">
                                                Team
                                            </th>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-(--cit-text) whitespace-nowrap">
                                                Status
                                            </th>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-(--cit-text) whitespace-nowrap">
                                                Amount
                                            </th>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-(--cit-text) whitespace-nowrap">
                                                Payment
                                            </th>
                                            <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-semibold text-(--cit-text) whitespace-nowrap">
                                                Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-(--cit-border)">
                                        {REGISTERED_EVENTS.map((event) => (
                                            <tr
                                                key={event.eventId}
                                                className="hover:bg-(--cit-bg) transition-colors"
                                            >
                                                {/* Event ID */}
                                                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs font-semibold text-(--cit-primary) uppercase tracking-[0.15em]">
                                                    #{event.eventId}
                                                </td>

                                                {/* Event Name */}
                                                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-medium text-(--cit-text) max-w-xs truncate">
                                                    {event.eventName}
                                                </td>

                                                {/* Event Type */}
                                                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getEventTypeColor(
                                                            event.eventType,
                                                        )}`}
                                                    >
                                                        {event.eventType}
                                                    </span>
                                                </td>

                                                {/* Team Name */}
                                                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-(--cit-text-muted) text-xs sm:text-sm">
                                                    {event.eventType ===
                                                        "Team" &&
                                                    event.teamName ? (
                                                        <span className="inline-flex rounded-md bg-(--cit-bg) px-2 py-1 font-medium text-(--cit-text) truncate max-w-xs">
                                                            {event.teamName}
                                                        </span>
                                                    ) : (
                                                        <span className="text-(--cit-text-muted)">
                                                            —
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Payment Status */}
                                                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getPaymentStatusColor(
                                                            event.paymentStatus,
                                                        )}`}
                                                    >
                                                        {event.paymentStatus}
                                                    </span>
                                                </td>

                                                {/* Total Amount */}
                                                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-medium text-(--cit-text) text-xs sm:text-sm">
                                                    {event.isPaid
                                                        ? event.totalAmount
                                                        : "Free"}
                                                </td>

                                                {/* Payment Link */}
                                                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                                                    {event.isPaid &&
                                                    event.paymentStatus !==
                                                        "Paid" ? (
                                                        <Link
                                                            to={`/events/${event.eventId}/payment`}
                                                            className="inline-flex rounded-md bg-(--cit-primary) px-2 sm:px-3 py-1 sm:py-2 text-xs font-semibold text-white transition hover:bg-(--cit-primary-hover) whitespace-nowrap"
                                                        >
                                                            Pay
                                                        </Link>
                                                    ) : (
                                                        <span className="text-(--cit-text-muted)">
                                                            —
                                                        </span>
                                                    )}
                                                </td>

                                                {/* View Details */}
                                                <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                                                    <Link
                                                        to={`/events/${event.eventId}`}
                                                        className="inline-flex rounded-md bg-(--cit-primary) px-2 sm:px-3 py-1 sm:py-2 text-xs font-semibold text-white transition hover:bg-(--cit-primary-hover) whitespace-nowrap"
                                                    >
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}

                {/* Stats Section - Responsive */}
                <div className="mt-6 md:mt-8 grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-3">
                    <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-bg) p-3 sm:p-4 md:p-6">
                        <p className="text-xs md:text-sm font-medium text-(--cit-text-muted)">
                            Total Registered
                        </p>
                        <p className="mt-2 text-lg sm:text-xl md:text-2xl font-extrabold text-(--cit-primary)">
                            {REGISTERED_EVENTS.length}
                        </p>
                    </div>
                    <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-bg) p-3 sm:p-4 md:p-6">
                        <p className="text-xs md:text-sm font-medium text-(--cit-text-muted)">
                            Team Events
                        </p>
                        <p className="mt-2 text-lg sm:text-xl md:text-2xl font-extrabold text-(--cit-primary)">
                            {
                                REGISTERED_EVENTS.filter(
                                    (e) => e.eventType === "Team",
                                ).length
                            }
                        </p>
                    </div>
                    <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-bg) p-3 sm:p-4 md:p-6 col-span-2 md:col-span-1">
                        <p className="text-xs md:text-sm font-medium text-(--cit-text-muted)">
                            Pending Payments
                        </p>
                        <p className="mt-2 text-lg sm:text-xl md:text-2xl font-extrabold text-red-600">
                            {
                                REGISTERED_EVENTS.filter(
                                    (e) => e.paymentStatus === "Pending",
                                ).length
                            }
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
