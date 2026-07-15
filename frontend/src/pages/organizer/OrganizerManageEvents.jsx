import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import {
    AlertCircle,
    CalendarDays,
    Clock3,
    LoaderCircle,
    Users,
} from "lucide-react";
import MetaData from "../../components/MetaData";
import { ALL_EVENTS } from "../../data/events";

const TAB_DEFINITIONS = [
    { id: "all", label: "All Participants" },
    { id: "pending", label: "Pending Approvals" },
];

const buildTeamRegistrations = (eventIndex) => [
    {
        id: `TM-${eventIndex + 1}01`,
        teamName: "Pixel Pioneers",
        teamSize: 4,
        registrationDate: "Jun 10, 2025",
        paymentStatus: "Paid",
        approvalStatus: "Approved",
        leader: "Aarav Menon",
        leaderEmail: "aarav@cit.edu",
        leaderDepartment: "CSE",
        members: [
            {
                id: `member-${eventIndex + 1}-01`,
                name: "Aarav Menon",
                email: "aarav@cit.edu",
                department: "CSE",
                role: "Leader",
            },
            {
                id: `member-${eventIndex + 1}-02`,
                name: "Meera S",
                email: "meera@cit.edu",
                department: "ECE",
                role: "Member",
            },
            {
                id: `member-${eventIndex + 1}-03`,
                name: "Rohan K",
                email: "rohan@cit.edu",
                department: "IT",
                role: "Member",
            },
            {
                id: `member-${eventIndex + 1}-04`,
                name: "Nivitha P",
                email: "nivitha@cit.edu",
                department: "AI",
                role: "Member",
            },
        ],
        teamMembersLoaded: true,
        teamMembersLoading: false,
        teamMembersError: null,
    },
    {
        id: `TM-${eventIndex + 1}02`,
        teamName: "Byte Builders",
        teamSize: 3,
        registrationDate: "Jun 12, 2025",
        paymentStatus: "Pending",
        approvalStatus: "Pending",
        leader: "Nisha Rao",
        leaderEmail: "nisha@cit.edu",
        leaderDepartment: "IT",
        members: [
            {
                id: `member-${eventIndex + 1}-05`,
                name: "Nisha Rao",
                email: "nisha@cit.edu",
                department: "IT",
                role: "Leader",
            },
            {
                id: `member-${eventIndex + 1}-06`,
                name: "Karthik V",
                email: "karthik@cit.edu",
                department: "CSE",
                role: "Member",
            },
            {
                id: `member-${eventIndex + 1}-07`,
                name: "Sanjana M",
                email: "sanjana@cit.edu",
                department: "EEE",
                role: "Member",
            },
        ],
        teamMembersLoaded: true,
        teamMembersLoading: false,
        teamMembersError: null,
    },
    {
        id: `TM-${eventIndex + 1}03`,
        teamName: "Logic Legends",
        teamSize: 5,
        registrationDate: "Jun 14, 2025",
        paymentStatus: "Paid",
        approvalStatus: "Approved",
        leader: "Priya S",
        leaderEmail: "priya@cit.edu",
        leaderDepartment: "CSE",
        members: [
            {
                id: `member-${eventIndex + 1}-08`,
                name: "Priya S",
                email: "priya@cit.edu",
                department: "CSE",
                role: "Leader",
            },
            {
                id: `member-${eventIndex + 1}-09`,
                name: "Arjun R",
                email: "arjun@cit.edu",
                department: "ECE",
                role: "Member",
            },
            {
                id: `member-${eventIndex + 1}-10`,
                name: "Deepa V",
                email: "deepa@cit.edu",
                department: "AI",
                role: "Member",
            },
            {
                id: `member-${eventIndex + 1}-11`,
                name: "Harish M",
                email: "harish@cit.edu",
                department: "IT",
                role: "Member",
            },
            {
                id: `member-${eventIndex + 1}-12`,
                name: "Lavanya K",
                email: "lavanya@cit.edu",
                department: "CSE",
                role: "Member",
            },
        ],
        teamMembersLoaded: true,
        teamMembersLoading: false,
        teamMembersError: null,
    },
];

const buildIndividualRegistrations = (eventIndex) => [
    {
        id: `IND-${eventIndex + 1}01`,
        name: "Sneha Nair",
        email: "sneha@cit.edu",
        registrationDate: "Jun 11, 2025",
        paymentStatus: "Paid",
        approvalStatus: "Approved",
        department: "CSE",
    },
    {
        id: `IND-${eventIndex + 1}02`,
        name: "Vikram D",
        email: "vikram@cit.edu",
        registrationDate: "Jun 13, 2025",
        paymentStatus: "Pending",
        approvalStatus: "Pending",
        department: "MECH",
    },
    {
        id: `IND-${eventIndex + 1}03`,
        name: "Ishita Rao",
        email: "ishita@cit.edu",
        registrationDate: "Jun 14, 2025",
        paymentStatus: "Paid",
        approvalStatus: "Approved",
        department: "ECE",
    },
    {
        id: `IND-${eventIndex + 1}04`,
        name: "Mohan P",
        email: "mohan@cit.edu",
        registrationDate: "Jun 16, 2025",
        paymentStatus: "Pending",
        approvalStatus: "Pending",
        department: "IT",
    },
    {
        id: `IND-${eventIndex + 1}05`,
        name: "Asha L",
        email: "asha@cit.edu",
        registrationDate: "Jun 18, 2025",
        paymentStatus: "Paid",
        approvalStatus: "Approved",
        department: "AI",
    },
];

const buildOrganizerEvents = () =>
    ALL_EVENTS.slice(0, 6).map((event, index) => {
        const isTeamEvent = event.type === "Team";

        return {
            ...event,
            registrations: isTeamEvent
                ? buildTeamRegistrations(index)
                : buildIndividualRegistrations(index),
        };
    });

const fetchParticipantsForEvent = async (eventId) => {
    // TODO: Replace this mock delay with your real API call for all participants.
    await new Promise((resolve) => setTimeout(resolve, 650));
    return { eventId };
};

const fetchTeamMembersForRegistration = async (eventId, registrationId) => {
    // TODO: Replace this mock delay with your real API call for team members.
    await new Promise((resolve) => setTimeout(resolve, 550));
    return { eventId, registrationId };
};

export default function OrganizerManageEvents() {
    const [events, setEvents] = useState(() => buildOrganizerEvents());
    const [selectedEventId, setSelectedEventId] = useState(
        () => buildOrganizerEvents()[0]?.id ?? null,
    );
    const [activeTab, setActiveTab] = useState(TAB_DEFINITIONS[0].id);
    const [expandedTeamId, setExpandedTeamId] = useState(null);
    const [isParticipantsLoading, setIsParticipantsLoading] = useState(true);
    const [participantsError, setParticipantsError] = useState(null);
    const [tabIndicatorStyle, setTabIndicatorStyle] = useState({
        left: 0,
        width: 0,
    });
    const tabRefs = useRef([]);

    const selectedEvent = useMemo(
        () => events.find((event) => event.id === selectedEventId) ?? null,
        [events, selectedEventId],
    );

    useEffect(() => {
        if (!selectedEvent) {
            return;
        }

        let isActive = true;
        const loadParticipants = async () => {
            setIsParticipantsLoading(true);
            setParticipantsError(null);

            try {
                await fetchParticipantsForEvent(selectedEvent.id);
                if (isActive) {
                    setIsParticipantsLoading(false);
                }
            } catch (error) {
                if (isActive) {
                    setParticipantsError(
                        "Unable to load participants right now.",
                    );
                    setIsParticipantsLoading(false);
                }
            }
        };

        loadParticipants();

        return () => {
            isActive = false;
        };
    }, [selectedEvent?.id]);

    const toggleExpandedTeam = async (teamId) => {
        if (!selectedEvent) {
            return;
        }

        const nextExpandedTeamId = expandedTeamId === teamId ? null : teamId;
        setExpandedTeamId(nextExpandedTeamId);

        if (!nextExpandedTeamId) {
            return;
        }

        const targetRegistration = selectedEvent.registrations.find(
            (registration) => registration.id === teamId,
        );

        if (!targetRegistration || targetRegistration.teamMembersLoaded) {
            return;
        }

        setEvents((currentEvents) =>
            currentEvents.map((event) =>
                event.id === selectedEvent.id
                    ? {
                          ...event,
                          registrations: event.registrations.map(
                              (registration) =>
                                  registration.id === teamId
                                      ? {
                                            ...registration,
                                            teamMembersLoading: true,
                                            teamMembersError: null,
                                        }
                                      : registration,
                          ),
                      }
                    : event,
            ),
        );

        try {
            await fetchTeamMembersForRegistration(selectedEvent.id, teamId);

            setEvents((currentEvents) =>
                currentEvents.map((event) =>
                    event.id === selectedEvent.id
                        ? {
                              ...event,
                              registrations: event.registrations.map(
                                  (registration) =>
                                      registration.id === teamId
                                          ? {
                                                ...registration,
                                                teamMembersLoading: false,
                                                teamMembersLoaded: true,
                                                teamMembersError: null,
                                            }
                                          : registration,
                              ),
                          }
                        : event,
                ),
            );
        } catch (error) {
            setEvents((currentEvents) =>
                currentEvents.map((event) =>
                    event.id === selectedEvent.id
                        ? {
                              ...event,
                              registrations: event.registrations.map(
                                  (registration) =>
                                      registration.id === teamId
                                          ? {
                                                ...registration,
                                                teamMembersLoading: false,
                                                teamMembersLoaded: false,
                                                teamMembersError:
                                                    "Unable to load team members right now.",
                                            }
                                          : registration,
                              ),
                          }
                        : event,
                ),
            );
        }
    };

    useEffect(() => {
        const activeIndex = TAB_DEFINITIONS.findIndex(
            (tab) => tab.id === activeTab,
        );
        const activeTabElement = tabRefs.current[activeIndex];

        if (activeTabElement) {
            setTabIndicatorStyle({
                left: activeTabElement.offsetLeft,
                width: activeTabElement.offsetWidth,
            });
        }
    }, [activeTab]);

    const handleEventSelect = (eventId) => {
        setSelectedEventId(eventId);
        setActiveTab(TAB_DEFINITIONS[0].id);
        setExpandedTeamId(null);
    };

    const getPaymentStatusClasses = (status) =>
        status === "Paid"
            ? "inline-flex min-w-[84px] items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"
            : "inline-flex min-w-[84px] items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700";

    const renderParticipantTable = () => {
        if (!selectedEvent) {
            return null;
        }

        if (selectedEvent.type === "Team") {
            return (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-(--cit-border) text-sm">
                        <thead className="bg-(--cit-surface-subtle)">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold text-(--cit-text)">
                                    Team ID
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-(--cit-text)">
                                    Team Name
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-(--cit-text)">
                                    Team Size
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-(--cit-text)">
                                    Registration Date
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-(--cit-text)">
                                    Payment Status
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-(--cit-text)">
                                    Leader
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-(--cit-border) bg-(--cit-surface)">
                            {selectedEvent.registrations.map((team) => (
                                <Fragment key={team.id}>
                                    <tr
                                        className="cursor-pointer transition-all duration-200 hover:bg-(--cit-surface-subtle)"
                                        onClick={() =>
                                            toggleExpandedTeam(team.id)
                                        }
                                    >
                                        <td className="px-4 py-3 font-semibold text-(--cit-text)">
                                            {team.id}
                                        </td>
                                        <td className="px-4 py-3 text-(--cit-text)">
                                            {team.teamName}
                                        </td>
                                        <td className="px-4 py-3 text-(--cit-text)">
                                            {team.teamSize}
                                        </td>
                                        <td className="px-4 py-3 text-(--cit-text-muted)">
                                            {team.registrationDate}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={getPaymentStatusClasses(
                                                    team.paymentStatus,
                                                )}
                                            >
                                                {team.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-(--cit-text)">
                                            {team.leader}
                                        </td>
                                    </tr>
                                    {expandedTeamId === team.id && (
                                        <tr className="bg-(--cit-surface-subtle) transition-all duration-200">
                                            <td
                                                colSpan="6"
                                                className="px-4 py-3"
                                            >
                                                <div className="rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface) p-3">
                                                    <div className="mb-2 flex items-center justify-between gap-2">
                                                        <h4 className="font-semibold text-(--cit-text)">
                                                            Team members
                                                        </h4>
                                                        <span className="text-xs text-(--cit-text-muted)">
                                                            {team.leaderEmail}
                                                        </span>
                                                    </div>

                                                    {team.teamMembersLoading ? (
                                                        <div className="flex items-center gap-2 rounded-(--cit-radius-md) bg-(--cit-surface-subtle) px-3 py-2 text-sm text-(--cit-text-muted)">
                                                            <LoaderCircle className="h-4 w-4 animate-spin" />
                                                            Loading team
                                                            members...
                                                        </div>
                                                    ) : team.teamMembersError ? (
                                                        <div className="rounded-(--cit-radius-md) border border-(--cit-danger) bg-(--cit-danger) bg-opacity-10 px-3 py-2 text-sm text-(--cit-danger)">
                                                            {
                                                                team.teamMembersError
                                                            }
                                                        </div>
                                                    ) : (
                                                        <ul className="space-y-2">
                                                            {team.members.map(
                                                                (member) => (
                                                                    <li
                                                                        key={
                                                                            member.id
                                                                        }
                                                                        className="flex flex-col gap-1 rounded-(--cit-radius-sm) bg-(--cit-surface-subtle) px-3 py-2 text-sm md:flex-row md:items-center md:justify-between"
                                                                    >
                                                                        <span className="text-(--cit-text)">
                                                                            {
                                                                                member.name
                                                                            }
                                                                        </span>
                                                                        <span className="text-(--cit-text-muted)">
                                                                            {
                                                                                member.email
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-(--cit-border) text-sm">
                    <thead className="bg-(--cit-surface-subtle)">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-(--cit-text)">
                                ID
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-(--cit-text)">
                                Name
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-(--cit-text)">
                                Email
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-(--cit-text)">
                                Department
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-(--cit-text)">
                                Payment Status
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-(--cit-text)">
                                Registration Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-(--cit-border) bg-(--cit-surface)">
                        {selectedEvent.registrations.map((participant) => (
                            <tr
                                key={participant.id}
                                className="transition-all duration-200 hover:bg-(--cit-surface-subtle)"
                            >
                                <td className="px-4 py-3 font-semibold text-(--cit-text)">
                                    {participant.id}
                                </td>
                                <td className="px-4 py-3 text-(--cit-text)">
                                    {participant.name}
                                </td>
                                <td className="px-4 py-3 text-(--cit-text-muted)">
                                    {participant.email}
                                </td>
                                <td className="px-4 py-3 text-(--cit-text-muted)">
                                    {participant.department}
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={getPaymentStatusClasses(
                                            participant.paymentStatus,
                                        )}
                                    >
                                        {participant.paymentStatus}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-(--cit-text-muted)">
                                    {participant.registrationDate}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderTabContent = () => {
        if (activeTab === "pending") {
            return (
                <div className="mt-5 rounded-(--cit-radius-md) border border-dashed border-(--cit-border) bg-(--cit-surface-subtle) p-8 text-center text-sm text-(--cit-text-muted)">
                    Pending approvals are ready for the next API-driven step.
                </div>
            );
        }

        if (activeTab === "approved") {
            return (
                <div className="mt-5 rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface-subtle) p-4 text-sm text-(--cit-text-muted)">
                    Approved entries are prepared as a separate tab so future
                    logic can be added without touching the main layout.
                </div>
            );
        }

        return (
            <div className="mt-5 overflow-hidden rounded-(--cit-radius-md) border border-(--cit-border)">
                {isParticipantsLoading ? (
                    <div className="flex items-center justify-center gap-2 bg-(--cit-surface) px-6 py-10 text-sm text-(--cit-text-muted)">
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Loading participants and registration details...
                    </div>
                ) : participantsError ? (
                    <div className="bg-(--cit-surface) px-6 py-10 text-center text-sm text-(--cit-danger)">
                        {participantsError}
                    </div>
                ) : (
                    renderParticipantTable()
                )}
            </div>
        );
    };

    return (
        <>
            <MetaData
                title="Manage Events"
                description="Review event registrations, inspect participants, and manage approvals from one place."
                canonical="/organizer/manage-events"
            />
            <main className="min-h-screen bg-(--cit-bg) py-6">
                <div className="mx-auto flex max-w-300 flex-col gap-6">
                    <section className="rounded-(--cit-radius-xl) border border-(--cit-border) bg-linear-to-r from-(--cit-primary-soft) to-(--cit-surface) p-4 shadow-(--cit-shadow-sm) sm:p-6">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-(--cit-primary) sm:text-sm">
                                    Organizer workspace
                                </p>
                                <h1 className="mt-2 text-2xl font-extrabold text-(--cit-text) sm:text-3xl">
                                    Manage your events
                                </h1>
                                <p className="mt-3 max-w-2xl text-xs leading-5 text-(--cit-text-muted) sm:text-sm">
                                    Review every event you created, inspect
                                    registrations, and keep approvals moving
                                    without switching screens.
                                </p>
                            </div>
                            <div className="rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface) px-3 py-2.5 sm:px-4 sm:py-3">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--cit-text-muted) sm:text-xs">
                                    Active events
                                </p>
                                <p className="mt-1 text-xl font-bold text-(--cit-text) sm:text-2xl">
                                    {events.length}
                                </p>
                            </div>
                        </div>
                    </section>

                    {events.length === 0 ? (
                        <section className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) p-8 text-center shadow-(--cit-shadow-sm)">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-(--cit-primary-soft) text-(--cit-primary)">
                                <AlertCircle size={24} />
                            </div>
                            <h2 className="mt-4 text-xl font-bold text-(--cit-text)">
                                No events created yet
                            </h2>
                            <p className="mx-auto mt-2 max-w-md text-sm text-(--cit-text-muted)">
                                Create your first event to start reviewing
                                registrations and approvals from this page.
                            </p>
                        </section>
                    ) : (
                        <>
                            <section className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) p-4 shadow-(--cit-shadow-sm) sm:p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <h2 className="text-base font-bold text-(--cit-text) sm:text-lg">
                                            Your events
                                        </h2>
                                        <p className="mt-1 text-xs leading-5 text-(--cit-text-muted) sm:text-sm">
                                            Choose one event to inspect
                                            participants and registration
                                            activity.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                                    {events.map((event) => {
                                        const isSelected =
                                            event.id === selectedEventId;

                                        return (
                                            <button
                                                key={event.id}
                                                type="button"
                                                onClick={() =>
                                                    handleEventSelect(event.id)
                                                }
                                                className={`cursor-pointer min-w-52 flex-1 rounded-(--cit-radius-md) border p-3 text-left transition-all duration-200 sm:min-w-[16rem] sm:p-4 ${
                                                    isSelected
                                                        ? "border-(--cit-primary) bg-(--cit-primary-soft) shadow-(--cit-shadow-sm)"
                                                        : "border-(--cit-border) bg-(--cit-surface-subtle) hover:border-(--cit-primary) hover:bg-(--cit-surface)"
                                                }`}
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="text-[11px] font-semibold text-(--cit-primary) sm:text-sm">
                                                            {event.category}
                                                        </p>
                                                        <h3 className="mt-1 text-sm font-bold text-(--cit-text) sm:text-base">
                                                            {event.title}
                                                        </h3>
                                                    </div>
                                                    <span className="rounded-full border border-(--cit-border) bg-(--cit-surface) px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-(--cit-text-muted) sm:px-2.5 sm:text-[11px]">
                                                        {event.type}
                                                    </span>
                                                </div>

                                                <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-(--cit-text-muted) sm:text-xs">
                                                    <span className="flex items-center gap-1 rounded-full bg-(--cit-surface) px-2 py-1">
                                                        <CalendarDays
                                                            size={12}
                                                        />{" "}
                                                        {event.date}
                                                    </span>
                                                    <span className="flex items-center gap-1 rounded-full bg-(--cit-surface) px-2 py-1">
                                                        <Users size={12} />{" "}
                                                        {event.participants}{" "}
                                                        regs
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            {selectedEvent && (
                                <section className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) p-4 shadow-(--cit-shadow-sm) sm:p-5">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h2 className="text-lg font-bold text-(--cit-text) sm:text-xl">
                                                    {selectedEvent.title}
                                                </h2>
                                                <span className="rounded-full bg-(--cit-primary-soft) px-2 py-1 text-[10px] font-semibold text-(--cit-primary) sm:px-2.5 sm:text-xs">
                                                    {selectedEvent.type} event
                                                </span>
                                            </div>
                                            <p className="mt-3 max-w-2xl text-xs leading-5 text-(--cit-text-muted) sm:text-sm line-clamp-3">
                                                {selectedEvent.description}
                                            </p>
                                        </div>

                                        <div className="rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface-subtle) p-3 sm:p-4">
                                            <div className="flex items-center gap-2 text-xs font-semibold text-(--cit-text) sm:text-sm">
                                                <Clock3 size={16} />
                                                Deadline:{" "}
                                                {selectedEvent.deadline}
                                            </div>
                                            <div className="mt-2 flex items-center gap-2 text-xs text-(--cit-text-muted) sm:text-sm">
                                                <Users size={16} />
                                                {
                                                    selectedEvent.participants
                                                }{" "}
                                                participants registered
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative mt-6 flex flex-nowrap items-center gap-2 overflow-x-auto border-b border-(--cit-border) pb-2 scrollbar-none">
                                        <div
                                            className="absolute bottom-0 h-0.5 rounded-full bg-(--cit-primary) transition-all duration-300 ease-out"
                                            style={{
                                                left: `${tabIndicatorStyle.left}px`,
                                                width: `${tabIndicatorStyle.width}px`,
                                            }}
                                        />
                                        {TAB_DEFINITIONS.map((tab, index) => {
                                            const isActive =
                                                activeTab === tab.id;

                                            return (
                                                <button
                                                    key={tab.id}
                                                    ref={(element) => {
                                                        tabRefs.current[index] =
                                                            element;
                                                    }}
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveTab(tab.id)
                                                    }
                                                    className={`cursor-pointer relative shrink-0 whitespace-nowrap rounded-(--cit-radius-md) px-3 py-2 text-xs font-semibold transition-all duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                                                        isActive
                                                            ? "text-(--cit-primary)"
                                                            : "text-(--cit-text-muted)"
                                                    }`}
                                                >
                                                    {tab.label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {renderTabContent()}
                                </section>
                            )}
                        </>
                    )}
                </div>
            </main>
        </>
    );
}
