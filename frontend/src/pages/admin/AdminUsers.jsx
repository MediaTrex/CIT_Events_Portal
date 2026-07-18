import { useEffect, useMemo, useState } from "react";
import { Search, UserCircle2 } from "lucide-react";

const INITIAL_PAGE_SIZE = 15;

const ROLE_TABS = [
    { key: "organizers", label: "Organizers" },
    { key: "students", label: "Students" },
];

const ORGANIZERS = [
    {
        id: 1,
        name: "Meera Patel",
        email: "meera.patel@cit.edu",
        department: "Cultural Affairs",
        organization: "Event Club",
        phone: "+91 98765 43210",
        designation: "Coordinator",
        profilePicture: null,
    },
    {
        id: 2,
        name: "Rohan Iyer",
        email: "rohan.iyer@cit.edu",
        department: "Tech Events",
        organization: "Innovation Cell",
        phone: "+91 91234 56789",
        designation: "Program Head",
        profilePicture: null,
    },
    {
        id: 3,
        name: "Simran Kaur",
        email: "simran.kaur@cit.edu",
        department: "Media & PR",
        organization: "Campus Connect",
        phone: "+91 99887 66554",
        designation: "Media Lead",
        profilePicture: null,
    },
    {
        id: 4,
        name: "Aarav Singh",
        email: "aarav.singh@cit.edu",
        department: "Technical",
        organization: "Code Club",
        phone: "+91 90123 45678",
        designation: "Workshop Lead",
        profilePicture: null,
    },
    {
        id: 5,
        name: "Nisha Chopra",
        email: "nisha.chopra@cit.edu",
        department: "Student Affairs",
        organization: "Women in Tech",
        phone: "+91 98765 12340",
        designation: "Operations Manager",
        profilePicture: null,
    },
    {
        id: 6,
        name: "Karan Menon",
        email: "karan.menon@cit.edu",
        department: "Design",
        organization: "Art & Culture",
        phone: "+91 93456 78901",
        designation: "Creative Director",
        profilePicture: null,
    },
    {
        id: 7,
        name: "Priya Desai",
        email: "priya.desai@cit.edu",
        department: "Finance",
        organization: "Student Council",
        phone: "+91 91234 89012",
        designation: "Sponsorship Lead",
        profilePicture: null,
    },
    {
        id: 8,
        name: "Aditya Sharma",
        email: "aditya.sharma@cit.edu",
        department: "Community",
        organization: "Volunteer Team",
        phone: "+91 99876 54321",
        designation: "Engagement Lead",
        profilePicture: null,
    },
    {
        id: 9,
        name: "Pooja Reddy",
        email: "pooja.reddy@cit.edu",
        department: "Logistics",
        organization: "Campus Events",
        phone: "+91 97654 32109",
        designation: "Logistics Head",
        profilePicture: null,
    },
    {
        id: 10,
        name: "Vikram Joshi",
        email: "vikram.joshi@cit.edu",
        department: "Operations",
        organization: "Tech Symposium",
        phone: "+91 94567 89012",
        designation: "Event Manager",
        profilePicture: null,
    },
    {
        id: 11,
        name: "Ananya Rao",
        email: "ananya.rao@cit.edu",
        department: "Hospitality",
        organization: "Guest Relations",
        phone: "+91 91234 01122",
        designation: "Guest Coordinator",
        profilePicture: null,
    },
    {
        id: 12,
        name: "Dev Patel",
        email: "dev.patel@cit.edu",
        department: "Streaming",
        organization: "Media Broadcast",
        phone: "+91 99881 23456",
        designation: "Broadcast Lead",
        profilePicture: null,
    },
    {
        id: 13,
        name: "Shruti Jain",
        email: "shruti.jain@cit.edu",
        department: "Registration",
        organization: "Front Desk",
        phone: "+91 90129 38476",
        designation: "Registration Head",
        profilePicture: null,
    },
    {
        id: 14,
        name: "Rahul Verma",
        email: "rahul.verma@cit.edu",
        department: "Sponsorship",
        organization: "Corporate Partnerships",
        phone: "+91 98723 45016",
        designation: "Partnership Lead",
        profilePicture: null,
    },
    {
        id: 15,
        name: "Neha Gupta",
        email: "neha.gupta@cit.edu",
        department: "Programming",
        organization: "Tech Forum",
        phone: "+91 97650 12345",
        designation: "Program Coordinator",
        profilePicture: null,
    },
    {
        id: 16,
        name: "Sahil Bhatia",
        email: "sahil.bhatia@cit.edu",
        department: "Design",
        organization: "Visual Team",
        phone: "+91 93450 12367",
        designation: "Design Lead",
        profilePicture: null,
    },
    {
        id: 17,
        name: "Aisha Khan",
        email: "aisha.khan@cit.edu",
        department: "Public Relations",
        organization: "Press Team",
        phone: "+91 90234 56781",
        designation: "PR Head",
        profilePicture: null,
    },
    {
        id: 18,
        name: "Vinamra Shah",
        email: "vinamra.shah@cit.edu",
        department: "Operations",
        organization: "Festival Crew",
        phone: "+91 98901 23456",
        designation: "Operations Lead",
        profilePicture: null,
    },
];

const STUDENTS = [
    {
        id: 1,
        name: "Anjali Bhatt",
        email: "anjali.bhatt@cit.edu",
        phone: "+91 98765 43211",
        department: "Computer Science",
        profilePicture: null,
    },
    {
        id: 2,
        name: "Kabir Mehra",
        email: "kabir.mehra@cit.edu",
        phone: "+91 91234 56780",
        department: "Mechanical Engineering",
        profilePicture: null,
    },
    {
        id: 3,
        name: "Sneha Kulkarni",
        email: "sneha.kulkarni@cit.edu",
        phone: "+91 99887 66553",
        department: "Electrical Engineering",
        profilePicture: null,
    },
    {
        id: 4,
        name: "Ritik Bansal",
        email: "ritik.bansal@cit.edu",
        phone: "+91 90123 45679",
        department: "Civil Engineering",
        profilePicture: null,
    },
    {
        id: 5,
        name: "Divya Nair",
        email: "divya.nair@cit.edu",
        phone: "+91 98765 12341",
        department: "Electronics",
        profilePicture: null,
    },
    {
        id: 6,
        name: "Manav Sharma",
        email: "manav.sharma@cit.edu",
        phone: "+91 93456 78902",
        department: "Information Technology",
        profilePicture: null,
    },
    {
        id: 7,
        name: "Parul Shah",
        email: "parul.shah@cit.edu",
        phone: "+91 91234 89013",
        department: "Biomedical Engineering",
        profilePicture: null,
    },
    {
        id: 8,
        name: "Vivek Malhotra",
        email: "vivek.malhotra@cit.edu",
        phone: "+91 99876 54320",
        department: "Chemical Engineering",
        profilePicture: null,
    },
    {
        id: 9,
        name: "Isha Kapoor",
        email: "isha.kapoor@cit.edu",
        phone: "+91 97654 32108",
        department: "Architecture",
        profilePicture: null,
    },
    {
        id: 10,
        name: "Siddharth Rao",
        email: "siddharth.rao@cit.edu",
        phone: "+91 94567 89013",
        department: "Data Science",
        profilePicture: null,
    },
    {
        id: 11,
        name: "Megha Sen",
        email: "megha.sen@cit.edu",
        phone: "+91 91234 01123",
        department: "Aeronautical Engineering",
        profilePicture: null,
    },
    {
        id: 12,
        name: "Adarsh Nair",
        email: "adarsh.nair@cit.edu",
        phone: "+91 99881 23457",
        department: "Artificial Intelligence",
        profilePicture: null,
    },
    {
        id: 13,
        name: "Sana Ali",
        email: "sana.ali@cit.edu",
        phone: "+91 90129 38477",
        department: "Business Analytics",
        profilePicture: null,
    },
    {
        id: 14,
        name: "Harsh Vora",
        email: "harsh.vora@cit.edu",
        phone: "+91 98723 45017",
        department: "Information Systems",
        profilePicture: null,
    },
    {
        id: 15,
        name: "Nikita Reddy",
        email: "nikita.reddy@cit.edu",
        phone: "+91 97650 12346",
        department: "Cyber Security",
        profilePicture: null,
    },
    {
        id: 16,
        name: "Tarun Mishra",
        email: "tarun.mishra@cit.edu",
        phone: "+91 93450 12368",
        department: "Industrial Engineering",
        profilePicture: null,
    },
    {
        id: 17,
        name: "Maya Kapoor",
        email: "maya.kapoor@cit.edu",
        phone: "+91 90234 56782",
        department: "Humanities",
        profilePicture: null,
    },
    {
        id: 18,
        name: "Ravi Dutt",
        email: "ravi.dutt@cit.edu",
        phone: "+91 98901 23457",
        department: "Mathematics",
        profilePicture: null,
    },
];

function EmptyState({ title, description }) {
    return (
        <div className="rounded-3xl border border-(--cit-border) bg-(--cit-surface) p-10 text-center shadow-(--cit-shadow-sm)">
            <p className="text-sm font-semibold text-(--cit-text)">{title}</p>
            <p className="mt-2 text-sm text-(--cit-text-muted)">
                {description}
            </p>
        </div>
    );
}

function AdminUsers() {
    const [activeTab, setActiveTab] = useState("organizers");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [visibleRows, setVisibleRows] = useState(INITIAL_PAGE_SIZE);

    const currentData = activeTab === "organizers" ? ORGANIZERS : STUDENTS;

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm.trim());
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        setVisibleRows(INITIAL_PAGE_SIZE);
    }, [activeTab, debouncedSearch]);

    useEffect(() => {
        // Future API-ready hook.
        // Replace this with a real user fetch once your backend endpoint is available.
        // e.g. fetch(`/api/admin/users?role=${activeTab}&search=${debouncedSearch}`)
        //       .then((res) => res.json())
        //       .then(setFetchedUsers);
    }, [activeTab, debouncedSearch]);

    const filteredUsers = useMemo(() => {
        if (!debouncedSearch) {
            return currentData;
        }

        const query = debouncedSearch.toLowerCase();
        return currentData.filter((user) => {
            return [
                user.name,
                user.email,
                user.department,
                user.organization || "",
                user.designation || "",
                user.phone,
            ]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query));
        });
    }, [currentData, debouncedSearch]);

    const visibleUsers = filteredUsers.slice(0, visibleRows);
    const hasMoreRows = visibleRows < filteredUsers.length;
    const activeLabel = ROLE_TABS.find((tab) => tab.key === activeTab)?.label;

    return (
        <main className="min-h-screen bg-(--cit-bg) py-4">
            <div className="mx-auto max-w-300 ">
                <section className="rounded-3xl border border-(--cit-border) bg-(--cit-surface) p-6 shadow-(--cit-shadow-sm) sm:p-8">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-(--cit-primary)">
                            Account directory
                        </p>
                        <h1 className="mt-3 text-3xl font-semibold text-(--cit-text) sm:text-4xl">
                            Manage organizers and students in one place
                        </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-(--cit-text-muted)">
                            Browse all organizers or students, search records
                            instantly.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {ROLE_TABS.map((tab) => {
                            const isSelected = activeTab === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`cursor-pointer group flex min-h-28 flex-col justify-between rounded-2xl border px-5 py-5 text-left transition ${
                                        isSelected
                                            ? "border-(--cit-primary) bg-(--cit-primary-soft) text-(--cit-text) shadow-(--cit-shadow-sm)"
                                            : "border-(--cit-border) bg-(--cit-surface) text-(--cit-text-muted) hover:border-(--cit-primary) hover:text-(--cit-text)"
                                    }`}
                                >
                                    <div>
                                        <p className="text-sm font-semibold">
                                            {tab.label}
                                        </p>
                                        <p className="mt-2 text-sm leading-6">
                                            {tab.key === "organizers"
                                                ? "Review organizer accounts, contact info, and roles."
                                                : "Review student accounts, department details, and contact details."}
                                        </p>
                                    </div>
                                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-(--cit-text-muted)">
                                        {isSelected
                                            ? "Selected"
                                            : "Tap to view"}
                                    </p>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-(--cit-text)">
                                {activeLabel} overview
                            </p>
                            <p className="mt-1 text-sm text-(--cit-text-muted)">
                                {filteredUsers.length} records available.
                            </p>
                        </div>
                        <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-(--cit-border) bg-(--cit-surface) px-3 py-2 text-(--cit-text-muted) sm:w-auto focus-within:border-(--cit-primary) focus-within:ring-2 focus-within:ring-(--cit-primary-soft)">
                            <Search size={18} />
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                                placeholder={`Search ${activeLabel.toLowerCase()}...`}
                                className="w-full bg-transparent text-sm text-(--cit-text) outline-none placeholder:text-(--cit-text-muted) focus:ring-0"
                            />
                        </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-3xl border border-(--cit-border) bg-(--cit-surface) shadow-(--cit-shadow-sm)">
                        {filteredUsers.length === 0 ? (
                            <div className="p-10">
                                <EmptyState
                                    title={
                                        debouncedSearch
                                            ? `No ${activeLabel.toLowerCase()} matched your search`
                                            : `No ${activeLabel.toLowerCase()} available`
                                    }
                                    description={
                                        debouncedSearch
                                            ? "Try adjusting the search term or switch tabs."
                                            : "There are currently no records to display for this role."
                                    }
                                />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-190 w-full border-separate border-spacing-0 text-sm">
                                    <thead className="bg-(--cit-bg) text-left text-xs uppercase tracking-[0.2em] text-(--cit-text-muted)">
                                        <tr>
                                            <th className="px-4 py-4">ID</th>
                                            <th className="px-4 py-4">Name</th>
                                            <th className="px-4 py-4">Email</th>
                                            {activeTab === "organizers" ? (
                                                <>
                                                    <th className="px-4 py-4">
                                                        Department
                                                    </th>
                                                    <th className="px-4 py-4">
                                                        Organization
                                                    </th>
                                                    <th className="px-4 py-4">
                                                        Phone
                                                    </th>
                                                    <th className="px-4 py-4">
                                                        Designation
                                                    </th>
                                                </>
                                            ) : (
                                                <>
                                                    <th className="px-4 py-4">
                                                        Phone
                                                    </th>
                                                    <th className="px-4 py-4">
                                                        Department
                                                    </th>
                                                </>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-(--cit-border)">
                                        {visibleUsers.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="bg-(--cit-surface) transition hover:bg-(--cit-bg)"
                                            >
                                                <td className="border-b border-(--cit-border) px-4 py-4 align-middle text-(--cit-text-muted)">
                                                    {user.id}
                                                </td>
                                                <td className="border-b border-(--cit-border) px-4 py-4 align-middle">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-(--cit-primary-soft)">
                                                            {user.profilePicture ? (
                                                                <img
                                                                    src={
                                                                        user.profilePicture
                                                                    }
                                                                    alt={`${user.name} avatar`}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <UserCircle2
                                                                    size={20}
                                                                    className="text-(--cit-primary)"
                                                                />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-(--cit-text)">
                                                                {user.name}
                                                            </p>
                                                            <p className="text-xs text-(--cit-text-muted)">
                                                                {user.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-b border-(--cit-border) px-4 py-4 align-middle text-(--cit-text-muted)">
                                                    {user.email}
                                                </td>
                                                {activeTab === "organizers" ? (
                                                    <>
                                                        <td className="border-b border-(--cit-border) px-4 py-4 align-middle text-(--cit-text)">
                                                            {user.department}
                                                        </td>
                                                        <td className="border-b border-(--cit-border) px-4 py-4 align-middle text-(--cit-text)">
                                                            {user.organization}
                                                        </td>
                                                        <td className="border-b border-(--cit-border) px-4 py-4 align-middle text-(--cit-text)">
                                                            {user.phone}
                                                        </td>
                                                        <td className="border-b border-(--cit-border) px-4 py-4 align-middle text-(--cit-text)">
                                                            {user.designation}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="border-b border-(--cit-border) px-4 py-4 align-middle text-(--cit-text)">
                                                            {user.phone}
                                                        </td>
                                                        <td className="border-b border-(--cit-border) px-4 py-4 align-middle text-(--cit-text)">
                                                            {user.department}
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {hasMoreRows && filteredUsers.length > 0 ? (
                        <div className="mt-6 flex justify-center px-4 pb-4">
                            <button
                                type="button"
                                onClick={() =>
                                    setVisibleRows((current) =>
                                        Math.min(
                                            current + INITIAL_PAGE_SIZE,
                                            filteredUsers.length,
                                        ),
                                    )
                                }
                                className="cursor-pointer inline-flex rounded-full border border-(--cit-border) bg-(--cit-surface) px-5 py-2.5 text-sm font-semibold text-(--cit-text) transition hover:border-(--cit-primary) hover:text-(--cit-primary)"
                            >
                                Show more
                            </button>
                        </div>
                    ) : null}
                </section>
            </div>
        </main>
    );
}

export default AdminUsers;
