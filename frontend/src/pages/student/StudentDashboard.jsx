import { Link } from "react-router-dom";
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    Banknote,
    Gift,
    Wifi,
    WifiOff,
    UserRound,
    UsersRound,
    Bookmark,
    Award,
    CalendarDays,
} from "lucide-react";
import { ALL_EVENTS } from "../../data/events";
import { useAuthContext } from "../../context/AuthContext";

// Dummy data: registered event IDs
const registeredEventIds = [1, 2, 3, 5, 8];
const totalCertificates = 2;

// Category colors for badges
const categoryColors = {
    Hackathon: { color: "#1877F2", bg: "#E7F3FF" },
    Workshop: { color: "#9B51E0", bg: "#F3E8FF" },
    "Coding Challenge": { color: "#F7B928", bg: "#FEF9E7" },
    "AI/ML": { color: "#42B72A", bg: "#E6F9E3" },
    Technical: { color: "#FA3E3E", bg: "#FDE8E8" },
    Cultural: { color: "#E91E8C", bg: "#FFE4F5" },
    Sports: { color: "#0288D1", bg: "#E0F4FF" },
};

function getBadge(cat) {
    return categoryColors[cat] ?? { color: "#65676B", bg: "#F0F2F5" };
}

function EventCard({ event }) {
    const badge = getBadge(event.category);
    const fillPct = Math.round(
        (event.participants / event.maxParticipants) * 100,
    );

    return (
        <Link
            to={`/events/${event.id}`}
            className="group flex flex-col overflow-hidden rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) shadow-(--cit-shadow-sm) transition-all duration-200 hover:-translate-y-1.5 hover:shadow-(--cit-shadow-lg)"
        >
            {/* Image Section */}
            <div className="relative h-40 shrink-0 bg-(--cit-bg)">
                <img
                    src={event.image}
                    alt={event.title}
                    className="block h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />

                {/* Category Badge */}
                <div className="absolute left-3 top-3 flex gap-1.5">
                    <span
                        className="rounded-(--cit-radius-sm) px-2.5 py-0.5 text-[11px] font-bold"
                        style={{
                            background: badge.bg,
                            color: badge.color,
                        }}
                    >
                        {event.category}
                    </span>
                    {event.featured && (
                        <span className="rounded-(--cit-radius-sm) bg-(--cit-warning) px-2.5 py-0.5 text-[11px] font-bold text-white">
                            ★ Featured
                        </span>
                    )}
                </div>

                {/* Free/Paid Badge */}
                <div className="absolute right-3 top-3">
                    <span
                        className="flex items-center gap-1 rounded-(--cit-radius-sm) px-2.5 py-0.5 text-[11px] font-bold"
                        style={{
                            background: event.paid ? "#FDE8E8" : "#E6F9E3",
                            color: event.paid ? "#FA3E3E" : "#42B72A",
                        }}
                    >
                        {event.paid ? (
                            <Banknote size={11} />
                        ) : (
                            <Gift size={11} />
                        )}
                        {event.paid ? "Paid" : "Free"}
                    </span>
                </div>

                {/* Mode Badge */}
                <div className="absolute bottom-2.5 left-3">
                    <span className="flex items-center gap-1 rounded-(--cit-radius-sm) bg-black/65 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                        {event.mode === "Online" ? (
                            <Wifi size={11} />
                        ) : (
                            <WifiOff size={11} />
                        )}
                        {event.mode}
                    </span>
                </div>

                {/* Team/Individual Badge */}
                <div className="absolute bottom-2.5 right-3">
                    <span className="flex items-center gap-1 rounded-(--cit-radius-sm) bg-black/65 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                        {event.type === "Team" ? (
                            <UsersRound size={11} />
                        ) : (
                            <UserRound size={11} />
                        )}
                        {event.type}
                    </span>
                </div>
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col gap-2.5 px-4 py-4">
                <h3 className="line-clamp-2 text-sm font-bold text-(--cit-text)">
                    {event.title}
                </h3>

                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                        <Calendar
                            size={13}
                            color="var(--cit-primary)"
                            className="shrink-0"
                        />
                        <span className="text-xs text-(--cit-text-muted)">
                            {event.date}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin
                            size={13}
                            color="var(--cit-text-muted)"
                            className="shrink-0"
                        />
                        <span className="truncate text-xs text-(--cit-text-muted)">
                            {event.venue}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock
                            size={13}
                            color="var(--cit-danger)"
                            className="shrink-0"
                        />
                        <span className="text-xs font-semibold text-(--cit-danger)">
                            {event.deadline}
                        </span>
                    </div>
                </div>

                {/* Participants Progress */}
                <div>
                    <div className="mb-1.5 flex justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                            <Users size={12} color="#65676B" />
                            <span className="text-xs text-(--cit-text-muted)">
                                {event.participants.toLocaleString()} /{" "}
                                {event.maxParticipants.toLocaleString()}
                            </span>
                        </div>
                        <span
                            className="text-[11px] font-semibold"
                            style={{
                                color:
                                    fillPct > 80
                                        ? "#FA3E3E"
                                        : fillPct > 50
                                          ? "#F7B928"
                                          : "#42B72A",
                            }}
                        >
                            {fillPct}% filled
                        </span>
                    </div>
                    <div
                        style={{
                            height: 5,
                            background: "#F0F2F5",
                            borderRadius: 10,
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                height: "100%",
                                width: `${fillPct}%`,
                                background:
                                    fillPct > 80
                                        ? "#FA3E3E"
                                        : fillPct > 50
                                          ? "#F7B928"
                                          : "#42B72A",
                                borderRadius: 10,
                            }}
                        />
                    </div>
                </div>

                {/* View Details Button */}
                <div className="mt-auto">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        className="w-full rounded-(--cit-radius-md) bg-(--cit-primary) px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-(--cit-primary-hover)"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default function StudentDashboard() {
    const { user } = useAuthContext();
    const displayName = user?.name || user?.email?.split("@")[0] || "Student";

    // Filter registered events
    const registeredEvents = ALL_EVENTS.filter((event) =>
        registeredEventIds.includes(event.id),
    );

    // Get registered upcoming events sorted by date
    const upcomingEvents = registeredEvents.sort((a, b) => {
        // Parse dates - format: "Jul 15–16, 2025" or "Aug 3, 2025"
        const parseDate = (dateStr) => {
            const parts = dateStr.split(",");
            const year = parseInt(parts[1].trim());
            const monthDay = parts[0].trim().split(/\s+/);
            const month = new Date(`${monthDay[0]} 1, 2025`).getMonth();
            const day = parseInt(monthDay[1].replace(/[–-].*/, "")); // Get first day if range
            return new Date(year, month, day);
        };
        return parseDate(a.date) - parseDate(b.date);
    });

    return (
        <main className="min-h-screen bg-(--cit-bg) py-4 md:px-8 lg:px-10">
            <div className="mx-auto max-w-6xl space-y-4 sm:space-y-8">
                {/* Welcome Section */}
                <section >
                    <h1
                        className="font-extrabold text-(--cit-text) leading-tight"
                        style={{ fontSize: "clamp(1.495rem, 5vw, 2.25rem)" }}
                    >
                        Welcome Back,<br /> {displayName}
                    </h1>
                    <p className="text-sm text-(--cit-text-muted)">
                        Let's make the most of your competitions!
                    </p>
                </section>

                {/* Overview Cards */}
                <section className="grid gap-1 md:gap-4 md:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) p-2 sm:p-4  lg:p-6 shadow-(--cit-shadow-sm)">
                        <Bookmark
                            size={40}
                            color="var(--cit-primary)"
                            className="shrink-0"
                        />
                        <div>
                            <p
                                className="font-semibold text-(--cit-text-muted)"
                                style={{
                                    fontSize: "clamp(0.75rem, 1.5vw, 1.3rem)",
                                }}
                            >
                                Registered Events
                            </p>
                            <h3
                                className="font-extrabold text-(--cit-text)"
                                style={{
                                    fontSize: "clamp(1.875rem, 3vw, 2.8rem)",
                                }}
                            >
                                {registeredEvents.length}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) p-2 sm:p-4 lg:p-6 shadow-(--cit-shadow-sm)">
                        <CalendarDays
                            size={40}
                            color="var(--cit-primary)"
                            className="shrink-0"
                        />
                        <div>
                            <p
                                className="font-semibold text-(--cit-text-muted)"
                                style={{
                                    fontSize: "clamp(0.75rem, 1.5vw, 1.3rem)",
                                }}
                            >
                                Upcoming Events
                            </p>
                            <h3
                                className="font-extrabold text-(--cit-text)"
                                style={{
                                    fontSize: "clamp(1.875rem, 3vw, 2.8rem)",
                                }}
                            >
                                {upcomingEvents.length}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) p-2 sm:p-4 lg:p-6 shadow-(--cit-shadow-sm)">
                        <Award
                            size={40}
                            color="var(--cit-primary)"
                            className="shrink-0"
                        />
                        <div>
                            <p
                                className="font-semibold text-(--cit-text-muted)"
                                style={{
                                    fontSize: "clamp(0.75rem, 1.5vw, 1.3rem)",
                                }}
                            >
                                Certificates Earned
                            </p>
                            <h3
                                className="font-extrabold text-(--cit-text)"
                                style={{
                                    fontSize: "clamp(1.875rem, 3vw, 2.8rem)",
                                }}
                            >
                                {totalCertificates}
                            </h3>
                        </div>
                    </div>
                </section>

                {/* Upcoming Events */}
                <section className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-(--cit-text)">
                            Upcoming Events
                        </h2>
                        <p className="mt-1 text-sm text-(--cit-text-muted)">
                            Explore events happening soon
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {upcomingEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
