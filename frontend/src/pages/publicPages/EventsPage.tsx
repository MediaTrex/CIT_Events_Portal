import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    Filter,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Calendar,
    MapPin,
    Trophy,
    Users,
    Clock,
    Tag,
    X,
    SlidersHorizontal,
    Wifi,
    WifiOff,
    UserRound,
    UsersRound,
    Banknote,
    Gift,
} from "lucide-react";
import Layout from "../../layout/Layout";
import MetaData from "../../components/MetaData";
import { ALL_EVENTS } from "../../data/events";

// --- Data ---

const CATEGORIES = [
    "All",
    "Hackathon",
    "Workshop",
    "Coding Challenge",
    "AI/ML",
    "Technical",
    "Cultural",
    "Sports",
];
const DEPARTMENTS = ["All", "CSE", "ECE", "IT", "MECH", "CIVIL", "EEE"];
const EVENTS_PER_PAGE = 9;

// --- Sub-components ---

const categoryColors: Record<string, { color: string; bg: string }> = {
    Hackathon: { color: "#1877F2", bg: "#E7F3FF" },
    Workshop: { color: "#9B51E0", bg: "#F3E8FF" },
    "Coding Challenge": { color: "#F7B928", bg: "#FEF9E7" },
    "AI/ML": { color: "#42B72A", bg: "#E6F9E3" },
    Technical: { color: "#FA3E3E", bg: "#FDE8E8" },
    Cultural: { color: "#E91E8C", bg: "#FFE4F5" },
    Sports: { color: "#0288D1", bg: "#E0F4FF" },
};

function getBadge(cat: string) {
    return categoryColors[cat] ?? { color: "#65676B", bg: "#F0F2F5" };
}

function EventCard({ event }: { event: (typeof ALL_EVENTS)[0] }) {
    const badge = getBadge(event.category);
    const fillPct = Math.round(
        (event.participants / event.maxParticipants) * 100,
    );

    return (
        <Link
            to={`/events/${event.id}`}
            className="group flex flex-col overflow-hidden rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) shadow-(--cit-shadow-sm) transition-all duration-200 hover:-translate-y-1.5 hover:shadow-(--cit-shadow-lg)"
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 20px 48px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.05)";
            }}
        >
            {/* Poster */}
            <div className="relative h-42 shrink-0 bg-(--cit-bg)">
                <img
                    src={event.image}
                    alt={event.title}
                    className="block h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />

                {/* Top badges */}
                <div className="absolute left-3 top-3 flex gap-1.5">
                    <span
                        className="rounded-(--cit-radius-sm) px-2.5 py-0.5 text-[11px] font-bold"
                        style={{ background: badge.bg, color: badge.color }}
                    >
                        {event.category}
                    </span>
                    {event.featured && (
                        <span className="rounded-(--cit-radius-sm) bg-(--cit-warning) px-2.5 py-0.5 text-[11px] font-bold text-white">
                            ★ Featured
                        </span>
                    )}
                </div>

                {/* Free / Paid badge */}
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

                {/* Mode badge — bottom */}
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

                {/* Team/Individual badge — bottom right */}
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

            {/* Body */}
            <div className="flex flex-1 flex-col gap-2.5 px-4.5 py-4">
                <h3 className="line-clamp-2 m-0 text-[15px] font-bold leading-snug text-(--cit-text)">
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
                            Deadline: {event.deadline}
                        </span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {event.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="rounded-[5px] bg-(--cit-bg) px-2 py-0.5 text-[11px] font-medium text-(--cit-text-muted)"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Participants progress */}
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
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 11,
                                color: fillPct > 80 ? "#FA3E3E" : "#65676B",
                                fontWeight: 600,
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
                                transition: "width 0.6s ease",
                            }}
                        />
                    </div>
                </div>

                {/* Footer row */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "auto",
                        paddingTop: 4,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                        }}
                    >
                        <Trophy size={14} color="#F7B928" />
                        <span
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 700,
                                fontSize: 14,
                                color: "#1C1E21",
                            }}
                        >
                            {event.prize}
                        </span>
                    </div>
                    <button
                        style={{
                            padding: "8px 18px",
                            borderRadius: 8,
                            border: "none",
                            background: "#1877F2",
                            color: "#ffffff",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: "pointer",
                            transition:
                                "background 0.15s ease, transform 0.1s ease",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background =
                                "#166FE5";
                            (e.currentTarget as HTMLElement).style.transform =
                                "scale(1.04)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background =
                                "#1877F2";
                            (e.currentTarget as HTMLElement).style.transform =
                                "scale(1)";
                        }}
                    >
                        Register
                    </button>
                </div>
            </div>
        </Link>
    );
}

// ─── Filter Panel ─────────────────────────────────────────────────────────────

interface Filters {
    search: string;
    category: string;
    paid: string; // "All" | "Free" | "Paid"
    mode: string; // "All" | "Online" | "Offline"
    type: string; // "All" | "Individual" | "Team"
    department: string;
    dateFrom: string;
    dateTo: string;
}

function FilterPanel({
    filters,
    setFilters,
    totalResults,
    className,
}: {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    totalResults: number;
    className?: String;
}) {
    const set = (key: keyof Filters, val: string) =>
        setFilters((f) => ({ ...f, [key]: val }));

    const activeCount = [
        filters.category !== "All",
        filters.paid !== "All",
        filters.mode !== "All",
        filters.type !== "All",
        filters.department !== "All",
        filters.dateFrom !== "",
        filters.dateTo !== "",
        filters.search !== "",
    ].filter(Boolean).length;

    const reset = () =>
        setFilters({
            search: "",
            category: "All",
            paid: "All",
            mode: "All",
            type: "All",
            department: "All",
            dateFrom: "",
            dateTo: "",
        });

    const sectionStyle: React.CSSProperties = {
        borderBottom: "1px solid #F0F2F5",
        paddingBottom: 18,
        marginBottom: 18,
    };
    const labelStyle: React.CSSProperties = {
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: 12,
        color: "#1C1E21",
        textTransform: "uppercase",
        letterSpacing: 0.6,
        marginBottom: 10,
        display: "block",
    };
    const chipActive: React.CSSProperties = {
        background: "#1877F2",
        color: "#fff",
        border: "1.5px solid #1877F2",
    };
    const chipIdle: React.CSSProperties = {
        background: "#fff",
        color: "#65676B",
        border: "1.5px solid #DADDE1",
    };
    const chip = (active: boolean): React.CSSProperties => ({
        ...(active ? chipActive : chipIdle),
        padding: "6px 12px",
        borderRadius: 8,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: 12,
        cursor: "pointer",
        transition: "all 0.15s ease",
        display: "inline-block",
    });

    return (
        <aside
            style={{
                background: "#ffffff",
                borderRadius: 16,
                border: "1px solid #DADDE1",
                padding: "22px 20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                position: "sticky",
                top: 80,
                alignSelf: "start",
                maxHeight: "calc(100vh - 100px)",
                overflowY: "auto",
            }}
            className={`${className}`}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <SlidersHorizontal size={16} color="#1877F2" />
                    <span
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 800,
                            fontSize: 15,
                            color: "#1C1E21",
                        }}
                    >
                        Filters
                    </span>
                    {activeCount > 0 && (
                        <span
                            style={{
                                background: "#1877F2",
                                color: "#fff",
                                borderRadius: "50%",
                                width: 20,
                                height: 20,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 700,
                                fontSize: 11,
                            }}
                        >
                            {activeCount}
                        </span>
                    )}
                </div>
                {activeCount > 0 && (
                    <button
                        onClick={reset}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            background: "none",
                            border: "none",
                            color: "#FA3E3E",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: 12,
                            cursor: "pointer",
                            padding: 0,
                        }}
                    >
                        <X size={13} /> Reset
                    </button>
                )}
            </div>

            <p
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: "#65676B",
                    margin: "0 0 18px",
                }}
            >
                <strong style={{ color: "#1877F2" }}>{totalResults}</strong>{" "}
                events found
            </p>

            {/* Search */}
            <div style={sectionStyle}>
                <span style={labelStyle}>Search</span>
                <div style={{ position: "relative" }}>
                    <Search
                        size={15}
                        color="#65676B"
                        style={{
                            position: "absolute",
                            left: 12,
                            top: "50%",
                            transform: "translateY(-50%)",
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={filters.search}
                        onChange={(e) => set("search", e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px 12px 10px 36px",
                            borderRadius: 9,
                            border: "1.5px solid #DADDE1",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 13,
                            color: "#1C1E21",
                            outline: "none",
                            background: "#F7F8FA",
                            boxSizing: "border-box",
                            transition: "border-color 0.15s",
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = "#1877F2";
                            e.currentTarget.style.background = "#fff";
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = "#DADDE1";
                            e.currentTarget.style.background = "#F7F8FA";
                        }}
                    />
                    {filters.search && (
                        <button
                            onClick={() => set("search", "")}
                            style={{
                                position: "absolute",
                                right: 10,
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 2,
                            }}
                        >
                            <X size={13} color="#65676B" />
                        </button>
                    )}
                </div>
            </div>

            {/* Category */}
            <div style={sectionStyle}>
                <span style={labelStyle}>Category</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {CATEGORIES.map((c) => (
                        <button
                            key={c}
                            onClick={() => set("category", c)}
                            style={chip(filters.category === c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>

            {/* Free / Paid */}
            <div style={sectionStyle}>
                <span style={labelStyle}>Registration Fee</span>
                <div style={{ display: "flex", gap: 7 }}>
                    {["All", "Free", "Paid"].map((v) => (
                        <button
                            key={v}
                            onClick={() => set("paid", v)}
                            style={chip(filters.paid === v)}
                        >
                            {v === "Free"
                                ? "🎁 Free"
                                : v === "Paid"
                                  ? "💳 Paid"
                                  : "All"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Online / Offline */}
            <div style={sectionStyle}>
                <span style={labelStyle}>Mode</span>
                <div style={{ display: "flex", gap: 7 }}>
                    {["All", "Online", "Offline"].map((v) => (
                        <button
                            key={v}
                            onClick={() => set("mode", v)}
                            style={chip(filters.mode === v)}
                        >
                            {v === "Online"
                                ? "🌐 Online"
                                : v === "Offline"
                                  ? "📍 Offline"
                                  : "All"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Individual / Team */}
            <div style={sectionStyle}>
                <span style={labelStyle}>Participation</span>
                <div style={{ display: "flex", gap: 7 }}>
                    {["All", "Individual", "Team"].map((v) => (
                        <button
                            key={v}
                            onClick={() => set("type", v)}
                            style={chip(filters.type === v)}
                        >
                            {v === "Individual"
                                ? "👤 Solo"
                                : v === "Team"
                                  ? "👥 Team"
                                  : "All"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Department */}
            <div style={sectionStyle}>
                <span style={labelStyle}>Department</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {DEPARTMENTS.map((d) => (
                        <button
                            key={d}
                            onClick={() => set("department", d)}
                            style={chip(filters.department === d)}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            {/* Date Range */}
            <div>
                <span style={labelStyle}>Date Range</span>
                <div
                    style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                    {(["dateFrom", "dateTo"] as const).map((field) => (
                        <div key={field}>
                            <label
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 11,
                                    color: "#65676B",
                                    display: "block",
                                    marginBottom: 4,
                                }}
                            >
                                {field === "dateFrom" ? "From" : "To"}
                            </label>
                            <input
                                type="date"
                                value={filters[field]}
                                onChange={(e) => set(field, e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "9px 12px",
                                    borderRadius: 9,
                                    border: "1.5px solid #DADDE1",
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 13,
                                    color: "#1C1E21",
                                    outline: "none",
                                    background: "#F7F8FA",
                                    boxSizing: "border-box",
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor =
                                        "#1877F2";
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor =
                                        "#DADDE1";
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
    page,
    totalPages,
    setPage,
}: {
    page: number;
    totalPages: number;
    setPage: (p: number) => void;
}) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const visible = pages.filter(
        (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
    );

    const btnBase: React.CSSProperties = {
        width: 38,
        height: 38,
        borderRadius: 9,
        border: "1.5px solid #DADDE1",
        background: "#fff",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s ease",
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                marginTop: 40,
            }}
        >
            <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                style={{ ...btnBase, opacity: page === 1 ? 0.4 : 1 }}
                onMouseEnter={(e) => {
                    if (page > 1)
                        (e.currentTarget as HTMLElement).style.borderColor =
                            "#1877F2";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                        "#DADDE1";
                }}
            >
                <ChevronLeft size={16} color="#1C1E21" />
            </button>

            {visible.map((p, i) => {
                const prev = visible[i - 1];
                const showEllipsis = prev && p - prev > 1;
                return (
                    <span
                        key={p}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        {showEllipsis && (
                            <span
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 14,
                                    color: "#65676B",
                                    padding: "0 4px",
                                }}
                            >
                                …
                            </span>
                        )}
                        <button
                            onClick={() => setPage(p)}
                            style={{
                                ...btnBase,
                                background: p === page ? "#1877F2" : "#fff",
                                color: p === page ? "#fff" : "#1C1E21",
                                borderColor: p === page ? "#1877F2" : "#DADDE1",
                            }}
                            onMouseEnter={(e) => {
                                if (p !== page) {
                                    (
                                        e.currentTarget as HTMLElement
                                    ).style.borderColor = "#1877F2";
                                    (
                                        e.currentTarget as HTMLElement
                                    ).style.color = "#1877F2";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (p !== page) {
                                    (
                                        e.currentTarget as HTMLElement
                                    ).style.borderColor = "#DADDE1";
                                    (
                                        e.currentTarget as HTMLElement
                                    ).style.color = "#1C1E21";
                                }
                            }}
                        >
                            {p}
                        </button>
                    </span>
                );
            })}

            <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                style={{ ...btnBase, opacity: page === totalPages ? 0.4 : 1 }}
                onMouseEnter={(e) => {
                    if (page < totalPages)
                        (e.currentTarget as HTMLElement).style.borderColor =
                            "#1877F2";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                        "#DADDE1";
                }}
            >
                <ChevronRight size={16} color="#1C1E21" />
            </button>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function EventsPage() {
    const [filters, setFilters] = useState<Filters>({
        search: "",
        category: "All",
        paid: "All",
        mode: "All",
        type: "All",
        department: "All",
        dateFrom: "",
        dateTo: "",
    });
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("Featured");
    const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

    const filtered = useMemo(() => {
        let list = ALL_EVENTS;
        if (filters.search) {
            const q = filters.search.toLowerCase();
            list = list.filter(
                (e) =>
                    e.title.toLowerCase().includes(q) ||
                    e.category.toLowerCase().includes(q) ||
                    e.tags.some((t) => t.toLowerCase().includes(q)),
            );
        }
        if (filters.category !== "All")
            list = list.filter((e) => e.category === filters.category);
        if (filters.paid === "Free") list = list.filter((e) => !e.paid);
        if (filters.paid === "Paid") list = list.filter((e) => e.paid);
        if (filters.mode !== "All")
            list = list.filter((e) => e.mode === filters.mode);
        if (filters.type !== "All")
            list = list.filter((e) => e.type === filters.type);
        if (filters.department !== "All")
            list = list.filter(
                (e) =>
                    e.department === filters.department ||
                    e.department === "All",
            );

        // Sort
        if (sort === "Featured")
            list = [...list].sort(
                (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
            );
        if (sort === "Participants")
            list = [...list].sort((a, b) => b.participants - a.participants);
        if (sort === "Prize")
            list = [...list].sort((a, b) => {
                const pa = parseInt(a.prize.replace(/[^\d]/g, "")) || 0;
                const pb = parseInt(b.prize.replace(/[^\d]/g, "")) || 0;
                return pb - pa;
            });

        return list;
    }, [filters, sort]);

    const totalPages = Math.max(
        1,
        Math.ceil(filtered.length / EVENTS_PER_PAGE),
    );
    const pageEvents = filtered.slice(
        (page - 1) * EVENTS_PER_PAGE,
        page * EVENTS_PER_PAGE,
    );

    // Reset to page 1 whenever filters change
    const handleSetFilters: React.Dispatch<React.SetStateAction<Filters>> = (
        v,
    ) => {
        setFilters(v);
        setPage(1);
    };

    return (
        <Layout>
            <MetaData
                title="Events"
                description="Browse upcoming CIT events, workshops, hackathons, and cultural competitions with filters for category, mode, department, and date."
                canonical="/events"
            />
            <div className="min-h-screen bg-(--cit-bg)">
                {/* Page header */}
                <div className="bg-linear-to-r from-(--cit-primary) to-[#0c5fcc] px-6 py-10 pb-11">
                    <div className="mx-auto max-w-300">
                        <h1 className="mb-2.5 text-[clamp(26px,3.5vw,40px)] font-extrabold tracking-[-0.5px] text-white">
                            Browse Events
                        </h1>
                        <p className="m-0 text-base text-white/85">
                            Find competitions, workshops, and cultural events
                            happening at CIT.
                        </p>
                    </div>
                </div>

                {/* Negative margin card pull-up */}
                <div className="mx-auto -mt-6 max-w-300 px-6 pb-15">
                    {/* Toolbar */}
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface) px-5 py-3.5 shadow-(--cit-shadow-sm)">
                        <div className="flex items-center gap-2">
                            <Tag size={15} color="var(--cit-primary)" />
                            <span className="text-[15px] font-bold text-(--cit-text)">
                                {filtered.length} Events
                            </span>
                            {filters.category !== "All" && (
                                <span className="flex items-center gap-1 rounded-(--cit-radius-sm) bg-(--cit-primary-soft) px-2.5 py-0.5 text-xs font-semibold text-(--cit-primary)">
                                    {filters.category}
                                    <X
                                        size={12}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleSetFilters((f) => ({
                                                ...f,
                                                category: "All",
                                            }))
                                        }
                                    />
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Mobile filter toggle */}
                            <button
                                onClick={() =>
                                    setMobilePanelOpen(!mobilePanelOpen)
                                }
                                className="mobile-filter-btn hidden items-center gap-1.5 rounded-(--cit-radius-sm) border border-(--cit-border) bg-(--cit-surface) px-3.5 py-2 text-[13px] font-semibold text-(--cit-text)"
                            >
                                <Filter size={14} /> Filters
                            </button>

                            {/* Sort */}
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] text-(--cit-text-muted)">
                                    Sort by:
                                </span>
                                <div className="relative">
                                    <select
                                        value={sort}
                                        onChange={(e) =>
                                            setSort(e.target.value)
                                        }
                                        className="cursor-pointer appearance-none rounded-(--cit-radius-sm) border border-(--cit-border) bg-(--cit-surface) py-2 pl-3 pr-8 text-[13px] font-semibold text-(--cit-text) outline-none"
                                    >
                                        <option>Featured</option>
                                        <option>Participants</option>
                                        <option>Prize</option>
                                    </select>
                                    <ChevronDown
                                        size={14}
                                        color="var(--cit-text-muted)"
                                        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile filter slide-down */}
                    {mobilePanelOpen && (
                        <div className="mobile-filter-panel mb-5">
                            <FilterPanel
                                filters={filters}
                                setFilters={handleSetFilters}
                                totalResults={filtered.length}
                                className="mobileFilter"
                            />
                        </div>
                    )}

                    {/* Layout: sidebar + grid */}
                    <div className="events-layout grid grid-cols-[260px_1fr] items-start gap-5">
                        {/* Sidebar */}
                        <div
                            className="sidebar-col"
                            style={{
                                position: "sticky",
                                top: 70,
                                alignSelf: "start",
                                height: "fit-content",
                            }}
                        >
                            <FilterPanel
                                filters={filters}
                                setFilters={handleSetFilters}
                                totalResults={filtered.length}
                            />
                        </div>

                        {/* Grid */}
                        <div>
                            {pageEvents.length === 0 ? (
                                <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) px-6 py-20 text-center">
                                    <div className="mb-4 text-5xl">🔍</div>
                                    <p className="mb-2 text-lg font-bold text-(--cit-text)">
                                        No events found
                                    </p>
                                    <p className="m-0 text-sm text-(--cit-text-muted)">
                                        Try adjusting your filters or search
                                        query.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="event-cards-grid grid grid-cols-3 gap-4.5">
                                        {pageEvents.map((event) => (
                                            <EventCard
                                                key={event.id}
                                                event={event}
                                            />
                                        ))}
                                    </div>

                                    {totalPages > 1 && (
                                        <Pagination
                                            page={page}
                                            totalPages={totalPages}
                                            setPage={(p) => {
                                                setPage(p);
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth",
                                                });
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <style>{`
        @media (max-width: 1024px) {
          .event-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .events-layout { grid-template-columns: 1fr !important; }
          .sidebar-col { display: none !important; }
          .mobile-filter-btn { display: flex !important; }
          }
          @media (min-width: 900px){
            .mobileFilter { display: none !important; }
        }
        @media (max-width: 540px) {
          .event-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
            </div>
        </Layout>
    );
}
