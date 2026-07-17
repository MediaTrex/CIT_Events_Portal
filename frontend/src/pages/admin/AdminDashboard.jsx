import { Link } from "react-router-dom";
import {
    ArrowRight,
    BadgeCheck,
    CalendarDays,
    DollarSign,
    Mail,
    UserRound,
    UsersRound,
} from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import MetaData from "../../components/MetaData";

const recentOrganizers = [
    { id: 1, name: "Aarav Sharma", designation: "Event Lead" },
    { id: 2, name: "Meera Iyer", designation: "Club Coordinator" },
    { id: 3, name: "Rohan Verma", designation: "Technical Mentor" },
    { id: 4, name: "Sneha Rao", designation: "Workshop Head" },
    { id: 5, name: "Karthik Nair", designation: "Cultural Lead" },
    { id: 6, name: "Divya Menon", designation: "Campus Ambassador" },
    { id: 7, name: "Nikhil Das", designation: "Innovation Officer" },
    { id: 8, name: "Priya Joseph", designation: "Events Manager" },
    { id: 9, name: "Aditya Menon", designation: "Operations Head" },
    { id: 10, name: "Ananya Roy", designation: "Student Affairs Lead" },
];

const recentStudents = [
    { id: 1, name: "Milan Thomas", email: "milan.thomas@cit.edu" },
    { id: 2, name: "Sanjana Pillai", email: "sanjana.pillai@cit.edu" },
    { id: 3, name: "Rahul Kumar", email: "rahul.kumar@cit.edu" },
    { id: 4, name: "Nisha George", email: "nisha.george@cit.edu" },
    { id: 5, name: "Harsh Vardhan", email: "harsh.vardhan@cit.edu" },
    { id: 6, name: "Anjali Bhat", email: "anjali.bhat@cit.edu" },
    { id: 7, name: "Vivek Rao", email: "vivek.rao@cit.edu" },
    { id: 8, name: "Sarah Mathew", email: "sarah.mathew@cit.edu" },
    { id: 9, name: "Devansh Singh", email: "devansh.singh@cit.edu" },
    { id: 10, name: "Ishita Shah", email: "ishita.shah@cit.edu" },
];

const overviewStats = [
    {
        label: "Total Organizers",
        value: "24",
        icon: UsersRound,
        accent: "bg-(--cit-primary-soft) text-(--cit-primary)",
    },
    {
        label: "Total Registration",
        value: "1,284",
        icon: BadgeCheck,
        accent: "bg-emerald-50 text-emerald-600",
    },
    {
        label: "Total Revenue",
        value: "₹74,500",
        icon: DollarSign,
        accent: "bg-amber-50 text-(--cit-warning)",
    },
    {
        label: "Total Events",
        value: "38",
        icon: CalendarDays,
        accent: "bg-violet-50 text-violet-600",
    },
];

function StatCard({ label, value, icon: Icon, accent }) {
    return (
        <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) p-4 shadow-(--cit-shadow-sm)">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-(--cit-text-muted)">
                        {label}
                    </p>
                    <p className="mt-2 text-2xl font-bold text-(--cit-text)">
                        {value}
                    </p>
                </div>
                <div className={`rounded-(--cit-radius-md) p-2.5 ${accent}`}>
                    <Icon size={20} />
                </div>
            </div>
        </div>
    );
}

function SectionCard({ title, description, actionLabel, actionTo, children }) {
    return (
        <section className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) p-4 shadow-(--cit-shadow-sm) sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-(--cit-text)">
                        {title}
                    </h2>
                    <p className="text-sm text-(--cit-text-muted)">
                        {description}
                    </p>
                </div>
                <Link
                    to={actionTo}
                    className="inline-flex items-center gap-1 rounded-(--cit-radius-sm) bg-(--cit-primary-soft) px-3 py-2 text-sm font-semibold text-(--cit-primary) transition hover:bg-(--cit-primary) hover:text-white"
                >
                    {actionLabel}
                    <ArrowRight size={16} />
                </Link>
            </div>
            {children}
        </section>
    );
}

export default function AdminDashboard() {
    const { user } = useAuthContext();
    const displayName = user?.name || user?.email?.split("@")[0] || "Admin";

    return (
        <>
            <MetaData
                title="Admin Dashboard"
                description="Overview of organizers, students, registrations, and revenue."
                canonical="/admin/dashboard"
            />
            <main className="min-h-screen bg-(--cit-bg) py-4">
                <div className="mx-auto max-w-300 space-y-4 sm:space-y-8">
                    <section>
                        <h1
                            className="font-extrabold leading-tight text-(--cit-text)"
                            style={{
                                fontSize: "clamp(1.495rem, 5vw, 2.25rem)",
                            }}
                        >
                            Welcome Admin,
                            <br /> {displayName}
                        </h1>
                        <p className="mt-2 text-sm text-(--cit-text-muted)">
                            Keep track of platform activity, organizers, and
                            recent student registrations.
                        </p>
                    </section>

                    <section className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                        {overviewStats.map((stat) => (
                            <StatCard key={stat.label} {...stat} />
                        ))}
                    </section>

                    <section className="grid gap-4 xl:grid-cols-2">
                        <SectionCard
                            title="Recent Organizers"
                            description="Latest organizers who joined the portal"
                            actionLabel="View all"
                            actionTo="/admin/users"
                        >
                            <div className="overflow-hidden rounded-(--cit-radius-md) border border-(--cit-border)">
                                <div className="grid grid-cols-[1.5fr_1fr] bg-(--cit-surface-subtle) px-4 py-3 text-sm font-semibold text-(--cit-text-muted)">
                                    <span>Name</span>
                                    <span>Designation</span>
                                </div>
                                {recentOrganizers.map((organizer) => (
                                    <div
                                        key={organizer.id}
                                        className="grid grid-cols-[1.5fr_1fr] border-t border-(--cit-border) px-4 py-3 text-sm text-(--cit-text)"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--cit-primary-soft) text-(--cit-primary)">
                                                <UserRound size={16} />
                                            </div>
                                            <span className="font-medium">
                                                {organizer.name}
                                            </span>
                                        </div>
                                        <span className="text-(--cit-text-muted)">
                                            {organizer.designation}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </SectionCard>

                        <SectionCard
                            title="Recent Students"
                            description="Newest students registered on the platform"
                            actionLabel="View all"
                            actionTo="/admin/users"
                        >
                            <div className="overflow-hidden rounded-(--cit-radius-md) border border-(--cit-border)">
                                <div className="grid grid-cols-[1.2fr_1.2fr] bg-(--cit-surface-subtle) px-4 py-3 text-sm font-semibold text-(--cit-text-muted)">
                                    <span>Name</span>
                                    <span>Email</span>
                                </div>
                                {recentStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className="grid grid-cols-[1.2fr_1.2fr] border-t border-(--cit-border) px-4 py-3 text-sm text-(--cit-text)"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--cit-primary-soft) text-(--cit-primary)">
                                                <UserRound size={16} />
                                            </div>
                                            <span className="font-medium">
                                                {student.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-(--cit-text-muted)">
                                            <Mail size={14} />
                                            <span>{student.email}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SectionCard>
                    </section>
                </div>
            </main>
        </>
    );
}
