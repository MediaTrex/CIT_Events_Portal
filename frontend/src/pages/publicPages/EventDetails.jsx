import { useMemo, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Banknote,
    Calendar,
    Clock,
    MapPin,
    Tag,
    Trophy,
    UserRound,
    Wifi,
    WifiOff,
    Users,
    X,
    Upload,
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { ALL_EVENTS } from "../../data/events";
import { initialTeams } from "../../data/teams";
import Layout from "../../layout/Layout";
import MetaData from "../../components/MetaData";

export default function EventDetails() {
    const { id } = useParams();
    const eventId = Number(id);
    const event = useMemo(
        () => ALL_EVENTS.find((item) => item.id === eventId),
        [eventId],
    );
    const { isLoggedIn, user } = useAuthContext();
    const isRestrictedUser =
        user?.role === "organizer" || user?.role === "admin";
    const navigate = useNavigate();
    const location = useLocation();
    const [registered, setRegistered] = useState(false);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [proposalFile, setProposalFile] = useState(null);
    const [isSubmittingRegistration, setIsSubmittingRegistration] =
        useState(false);

    if (!event) {
        return (
            <Layout>
                <main className="relative min-h-screen bg-(--cit-bg) text-(--cit-text)">
                    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="rounded-(--cit-radius-xl) border border-(--cit-border) bg-(--cit-surface) p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.12)] sm:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--cit-text-muted)">
                                Event not found
                            </p>
                            <h1 className="mt-4 text-2xl font-extrabold text-(--cit-text) sm:text-3xl">
                                Sorry, we couldn&rsquo;t find that event.
                            </h1>
                            <p className="mt-3 text-xs leading-5 text-(--cit-text-muted) sm:text-sm sm:leading-6">
                                Please select another event from the listing.
                            </p>
                            <Link
                                to="/events"
                                className="mt-8 inline-flex rounded-(--cit-radius-md) bg-(--cit-primary) px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-(--cit-primary-hover)"
                            >
                                Back to events
                            </Link>
                        </div>
                    </div>
                </main>
            </Layout>
        );
    }

    const handleLogin = () => {
        navigate("/login", {
            state: { from: location.pathname },
        });
    };

    const handleRegister = () => {
        if (!isLoggedIn) {
            handleLogin();
            return;
        }

        // Show registration modal instead of directly registering
        setShowRegistrationModal(true);
        setSelectedTeam("");
        setProposalFile(null);
    };

    const handleCloseRegistrationModal = () => {
        setShowRegistrationModal(false);
        setSelectedTeam("");
        setProposalFile(null);
    };

    const handleProposalFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type !== "application/pdf") {
                toast.error("Please upload a PDF file");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                // 5MB limit
                toast.error("File size must be less than 5MB");
                return;
            }
            setProposalFile(file);
        }
    };

    const handleSubmitRegistration = async () => {
        // Validate based on event type
        if (event.type === "Team" && !selectedTeam) {
            toast.error("Please select a team");
            return;
        }

        if (!proposalFile) {
            toast.error("Please upload a proposal PDF");
            return;
        }

        setIsSubmittingRegistration(true);

        try {
            // TODO: Replace with actual API call to register
            // Send selectedTeam and proposalFile to backend
            await new Promise((resolve) => setTimeout(resolve, 800)); // Mock API call

            setRegistered(true);
            setShowRegistrationModal(false);
            setSelectedTeam("");
            setProposalFile(null);
            toast.success(`Successfully registered for ${event.title}!`);
        } catch (error) {
            toast.error("Failed to register. Please try again.");
            console.error(error);
        } finally {
            setIsSubmittingRegistration(false);
        }
    };

    return (
        <Layout>
            {/* Registration Modal */}
            {showRegistrationModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
                        <div className="flex items-center justify-between border-b border-(--cit-border) px-5 py-4 sm:px-6 sm:py-5">
                            <h2 className="text-lg font-bold text-(--cit-text) sm:text-xl">
                                Register for Event
                            </h2>
                            <button
                                type="button"
                                onClick={handleCloseRegistrationModal}
                                className="cursor-pointer rounded-lg p-1 text-(--cit-text-muted) hover:bg-(--cit-surface-subtle)"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-5 px-5 py-4 sm:px-6 sm:py-5">
                            {/* Team Selection - Only for Team Events */}
                            {event.type === "Team" && (
                                <div>
                                    <label className="block text-sm font-semibold text-(--cit-text) mb-2">
                                        Select Team{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={selectedTeam}
                                        onChange={(e) =>
                                            setSelectedTeam(e.target.value)
                                        }
                                        className="w-full rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface) px-3 py-2.5 text-sm text-(--cit-text) focus:border-(--cit-primary) focus:outline-none focus:ring-1 focus:ring-(--cit-primary)"
                                    >
                                        <option value="">
                                            Choose a team...
                                        </option>
                                        {initialTeams.map((team) => (
                                            <option
                                                key={team.id}
                                                value={team.id}
                                            >
                                                {team.name} (
                                                {team.members.length} members)
                                            </option>
                                        ))}
                                    </select>
                                    {selectedTeam && (
                                        <div className="mt-3 rounded-(--cit-radius-md) bg-(--cit-surface-subtle) p-3">
                                            <p className="text-xs font-semibold text-(--cit-text-muted) mb-2">
                                                Team Members:
                                            </p>
                                            <ul className="space-y-1 text-xs text-(--cit-text-muted)">
                                                {initialTeams
                                                    .find(
                                                        (t) =>
                                                            t.id ===
                                                            selectedTeam,
                                                    )
                                                    ?.members.map((member) => (
                                                        <li
                                                            key={member.id}
                                                            className="flex items-center gap-2"
                                                        >
                                                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-(--cit-primary)" />
                                                            {member.name}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Proposal PDF Upload - For Both Team and Individual */}
                            <div>
                                <label className="block text-sm font-semibold text-(--cit-text) mb-2">
                                    Upload Proposal (PDF){" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div
                                    className="relative rounded-(--cit-radius-md) border-2 border-dashed border-(--cit-border) bg-(--cit-surface-subtle) p-6 text-center transition-colors hover:border-(--cit-primary) hover:bg-(--cit-surface)"
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        const files = e.dataTransfer.files;
                                        if (files?.[0]) {
                                            const mockEvent = {
                                                target: { files: files },
                                            };
                                            handleProposalFileChange(mockEvent);
                                        }
                                    }}
                                >
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handleProposalFileChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="rounded-lg bg-(--cit-primary-soft) p-3 text-(--cit-primary)">
                                            <Upload size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-(--cit-text)">
                                                {proposalFile
                                                    ? proposalFile.name
                                                    : "Click to upload or drag & drop"}
                                            </p>
                                            {!proposalFile && (
                                                <p className="mt-1 text-xs text-(--cit-text-muted)">
                                                    PDF up to 5MB
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 border-t border-(--cit-border) px-5 py-4 sm:px-6 sm:py-5">
                            <button
                                type="button"
                                onClick={handleCloseRegistrationModal}
                                disabled={isSubmittingRegistration}
                                className="cursor-pointer flex-1 rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface) px-4 py-2.5 text-sm font-semibold text-(--cit-text) transition-colors hover:bg-(--cit-surface-subtle) disabled:opacity-60"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmitRegistration}
                                disabled={isSubmittingRegistration}
                                className="cursor-pointer flex-1 rounded-(--cit-radius-md) bg-(--cit-primary) px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-(--cit-primary-hover) disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmittingRegistration
                                    ? "Registering..."
                                    : "Register"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main className="relative min-h-screen bg-(--cit-bg) text-(--cit-text)">
                <MetaData
                    title={event.title}
                    description={event.description}
                    canonical={`/events/${event.id}`}
                    image={event.image}
                />

                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mb-6 flex flex-row gap-4  justify-between">
                        <Link
                            to="/events"
                            className="inline-flex items-center gap-2 rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface) px-3 py-2 text-xs font-semibold text-(--cit-text) transition-colors hover:border-(--cit-primary) hover:text-(--cit-primary) sm:text-sm"
                        >
                            <ArrowLeft size={16} /> Back to events
                        </Link>
                        <span className="rounded-[10px] bg-(--cit-primary-soft) px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-(--cit-primary)">
                            {event.category}
                        </span>
                    </div>

                    <div className="overflow-hidden rounded-(--cit-radius-xl) border border-(--cit-border) bg-(--cit-surface) shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
                        <div className="relative h-72 sm:h-80 md:h-90 bg-(--cit-bg)">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/35" />
                            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 text-white">
                                <span className="inline-flex rounded-[10px] bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/90">
                                    {event.type}
                                </span>
                                <h1 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
                                    {event.title}
                                </h1>
                                <p
                                    className="mt-3 max-w-2xl text-xs leading-5 text-white/85 sm:text-sm md:text-base"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    {event.description}
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1.4fr_0.8fr] lg:px-8">
                            <section className="space-y-6">
                                <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface-subtle) p-4 sm:p-6">
                                    <h2 className="text-lg font-bold text-(--cit-text) sm:text-xl">
                                        Event details
                                    </h2>
                                    <p className="mt-3 text-xs leading-5 text-(--cit-text-muted) sm:text-sm sm:leading-6">
                                        {event.description}
                                    </p>

                                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-(--cit-radius-md) bg-white/80 p-4 text-(--cit-text)">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-(--cit-text) sm:text-sm">
                                                <Calendar size={16} /> Date
                                            </div>
                                            <p className="mt-2 text-xs text-(--cit-text-muted) sm:text-sm">
                                                {event.date}
                                            </p>
                                        </div>
                                        <div className="rounded-(--cit-radius-md) bg-white/80 p-4 text-(--cit-text)">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-(--cit-text) sm:text-sm">
                                                <MapPin size={16} /> Venue
                                            </div>
                                            <p className="mt-2 text-xs text-(--cit-text-muted) sm:text-sm">
                                                {event.venue}
                                            </p>
                                        </div>
                                        <div className="rounded-(--cit-radius-md) bg-white/80 p-4 text-(--cit-text)">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-(--cit-text) sm:text-sm">
                                                <Clock size={16} /> Deadline
                                            </div>
                                            <p className="mt-2 text-xs text-(--cit-text-muted) sm:text-sm">
                                                {event.deadline}
                                            </p>
                                        </div>
                                        <div className="rounded-(--cit-radius-md) bg-white/80 p-4 text-(--cit-text)">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-(--cit-text) sm:text-sm">
                                                <Users size={16} /> Participants
                                            </div>
                                            <p className="mt-2 text-xs text-(--cit-text-muted) sm:text-sm">
                                                {event.participants} of{" "}
                                                {event.maxParticipants} joined
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface-subtle) p-4 sm:p-6">
                                    <h3 className="text-base font-bold text-(--cit-text) sm:text-lg">
                                        Event highlights
                                    </h3>
                                    <div className="mt-4 grid gap-3 text-xs text-(--cit-text-muted) sm:text-sm">
                                        <div className="flex items-center gap-3 rounded-(--cit-radius-md) bg-white/80 p-4">
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--cit-primary-soft) text-(--cit-primary)">
                                                <Wifi size={16} />
                                            </span>
                                            <div>
                                                <p className="font-semibold text-(--cit-text)">
                                                    {event.mode} event
                                                </p>
                                                <p>Location format</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 rounded-(--cit-radius-md) bg-white/80 p-4">
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--cit-primary-soft) text-(--cit-primary)">
                                                <Tag size={16} />
                                            </span>
                                            <div>
                                                <p className="font-semibold text-(--cit-text)">
                                                    Department
                                                </p>
                                                <p>{event.department}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 rounded-(--cit-radius-md) bg-white/80 p-4">
                                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--cit-primary-soft) text-(--cit-primary)">
                                                <Trophy size={16} />
                                            </span>
                                            <div>
                                                <p className="font-semibold text-(--cit-text)">
                                                    Prize
                                                </p>
                                                <p>{event.prize}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {event.rules?.length ? (
                                    <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface-subtle) p-4 sm:p-6">
                                        <h3 className="text-base font-bold text-(--cit-text) sm:text-lg">
                                            Rules
                                        </h3>
                                        <ul className="mt-4 space-y-3 text-xs text-(--cit-text-muted) sm:text-sm">
                                            {event.rules.map((rule, index) => (
                                                <li
                                                    key={index}
                                                    className="flex gap-3"
                                                >
                                                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-(--cit-primary)" />
                                                    <span>{rule}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}

                                {event.privacyPolicy?.length ? (
                                    <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface-subtle) p-4 sm:p-6">
                                        <h3 className="text-base font-bold text-(--cit-text) sm:text-lg">
                                            Privacy policy
                                        </h3>
                                        <ul className="mt-4 space-y-3 text-xs text-(--cit-text-muted) sm:text-sm">
                                            {event.privacyPolicy.map(
                                                (item, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex gap-3"
                                                    >
                                                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-(--cit-primary)" />
                                                        <span>{item}</span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                ) : null}
                            </section>

                            <aside className="space-y-5">
                                <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface-subtle) p-4 sm:p-6">
                                    <div className="mb-5 flex items-center justify-between gap-3">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--cit-text-muted) sm:text-sm">
                                                Register
                                            </p>
                                            <h2 className="mt-2 text-xl font-bold text-(--cit-text) sm:text-2xl">
                                                Join this event
                                            </h2>
                                        </div>
                                        <div className="rounded-[10px] bg-(--cit-primary-soft) px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-(--cit-primary)">
                                            {event.paid ? "Paid" : "Free"}
                                        </div>
                                    </div>
                                    <div className="grid gap-3 text-sm text-(--cit-text-muted)">
                                        <div className="flex items-center justify-between rounded-(--cit-radius-md) bg-white/80 px-4 py-3">
                                            <span>Type</span>
                                            <strong className="text-(--cit-text)">
                                                {event.type}
                                            </strong>
                                        </div>
                                        <div className="flex items-center justify-between rounded-(--cit-radius-md) bg-white/80 px-4 py-3">
                                            <span>Seats</span>
                                            <strong className="text-(--cit-text)">
                                                {event.maxParticipants -
                                                    event.participants}{" "}
                                                left
                                            </strong>
                                        </div>
                                        <div className="flex items-center justify-between rounded-(--cit-radius-md) bg-white/80 px-4 py-3">
                                            <span>Deadline</span>
                                            <strong className="text-(--cit-text)">
                                                {event.deadline}
                                            </strong>
                                        </div>
                                    </div>

                                    {isRestrictedUser ? (
                                        <div className="mt-6 rounded-(--cit-radius-md) border border-amber-300 bg-amber-100 px-4 py-3 text-sm font-semibold text-amber-900 shadow-sm">
                                            Organizer and admin accounts are not
                                            allowed to register for events.
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={handleRegister}
                                            disabled={registered}
                                            className="cursor-pointer mt-6 inline-flex w-full items-center justify-center rounded-(--cit-radius-md) bg-(--cit-primary) px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-(--cit-primary-hover) disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                                        >
                                            {registered
                                                ? "Registered"
                                                : isLoggedIn
                                                  ? "Register Now"
                                                  : "Login to Register"}
                                        </button>
                                    )}
                                </div>

                                <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface-subtle) p-4 sm:p-6">
                                    <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-(--cit-text-muted)">
                                        Event tags
                                    </h3>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {event.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-lg bg-white/90 px-3 py-2 text-[10px] font-semibold text-(--cit-text) sm:text-xs"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
