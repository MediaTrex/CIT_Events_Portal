import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext.jsx";
import {
    ClipboardList,
    LayoutGrid,
    LogOut,
    Menu,
    PlusSquare,
    Settings,
    Trophy,
    User,
    Users,
    FileText,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Zap,
} from "lucide-react";

const roleNav = {
    student: [
        { label: "Dashboard", to: "dashboard", icon: LayoutGrid },
        { label: "Profile", to: "profile", icon: User },
        { label: "My Events", to: "my-events", icon: ClipboardList },
        { label: "My Teams", to: "my-teams", icon: Users },
        { label: "Certificates", to: "certificates", icon: Trophy },
        { label: "Results", to: "result", icon: FileText },
    ],
    organizer: [
        { label: "Dashboard", to: "dashboard", icon: LayoutGrid },
        { label: "Manage Events", to: "manage-events", icon: ClipboardList },
        { label: "Create Event", to: "create-event", icon: PlusSquare },
        { label: "Profile", to: "profile", icon: User },
    ],
    admin: [
        { label: "Dashboard", to: "dashboard", icon: LayoutGrid },
        { label: "Users", to: "users", icon: Users },
        { label: "Events", to: "events", icon: CalendarDays },
        { label: "Settings", to: "settings", icon: Settings },
    ],
};

export default function DashboardLayout({ role }) {
    const { user, setUser } = useAuthContext();
    const location = useLocation();
    const [isPinned, setIsPinned] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const sidebarRef = useRef(null);

    const navItems = useMemo(() => roleNav[role] || roleNav.student, [role]);
    const activeTab = useMemo(
        () =>
            navItems.find((item) => location.pathname.endsWith(item.to)) ||
            navItems[0],
        [location.pathname, navItems],
    );
    const displayName = user?.name || user?.email?.split("@")[0] || "User";
    const avatarInitials = displayName
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                mobileOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setMobileOpen(false);
            }
        };

        if (mobileOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [mobileOpen]);

    const expanded = isPinned || isHovered;
    const sidebarExpanded = mobileOpen || expanded;
    const sidebarWidthClass = mobileOpen
        ? "w-[min(80vw,320px)]"
        : sidebarExpanded
          ? "w-72"
          : "w-20";
    const mainMarginClass = mobileOpen
        ? "ml-0"
        : sidebarExpanded
          ? "md:ml-72"
          : "md:ml-20";
    const mainWidthClass = mobileOpen
        ? "w-full"
        : expanded
          ? "md:w-[calc(100%-18rem)]"
          : "md:w-[calc(100%-5rem)]";
    const portalLabel =
        role === "admin"
            ? "Admin Portal"
            : `${role.charAt(0).toUpperCase() + role.slice(1)} Portal`;

    return (
        <div className="min-h-screen bg-(--cit-bg) text-(--cit-text) overflow-x-hidden">
            <header className="sticky top-0 z-40 bg-(--cit-surface) border-b border-(--cit-border) shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                <div className="mx-auto max-w-300 w-full px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                to={"/"}
                                className="flex items-center gap-3 text-(--cit-text)"
                            >
                                <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-linear-to-br from-(--cit-primary) to-[#0c5fcc] text-white font-extrabold">
                                    <Zap size={18} />
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-base font-semibold tracking-tight">
                                        CIT
                                    </p>
                                    <p className="text-sm font-semibold text-(--cit-primary)">
                                        Event Hub
                                    </p>
                                </div>
                            </Link>
                            <button
                                type="button"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-(--cit-border) bg-(--cit-surface) text-(--cit-text) md:hidden"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Open sidebar"
                            >
                                <Menu size={20} />
                            </button>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-semibold">
                                    {displayName}
                                </p>
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--cit-text-muted)">
                                    {role.toUpperCase()}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-(--cit-border) bg-(--cit-surface) text-(--cit-text)"
                                onClick={() => setUser(null)}
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="relative min-h-[calc(100vh-84px)]">
                <aside
                    ref={sidebarRef}
                    className={`dashboard-sidebar ${sidebarWidthClass} shrink-0 flex flex-col gap-6 border-r border-(--cit-border) bg-(--cit-surface) px-4 py-5 transition-all duration-300 ease-out ${mobileOpen ? "fixed left-0 top-0 z-50 h-full shadow-[20px_0_50px_rgba(15,23,42,0.12)] overflow-y-auto" : "fixed left-0 md:top-19.5 z-30 h-[calc(100vh-84px)] overflow-y-auto"} ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
                    onMouseEnter={() => setIsHovered(!mobileOpen ? true : false)}
                    onMouseLeave={() => setIsHovered(!mobileOpen ? false : false)}
                >
                    <div className="flex items-center justify-between gap-3">
                        <span
                            className={`rounded-[14px] bg-(--cit-primary-soft) px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-(--cit-primary) ${sidebarExpanded ? "inline-flex" : "hidden"}`}
                        >
                            {portalLabel}
                        </span>
                        <button
                            type="button"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-(--cit-border) bg-(--cit-surface) text-(--cit-text)"
                            onClick={() => setIsPinned((prev) => !prev)}
                            aria-label={
                                isPinned ? "Unpin sidebar" : "Pin sidebar"
                            }
                        >
                            {isPinned ? (
                                <ChevronLeft size={18} />
                            ) : (
                                <ChevronRight size={18} />
                            )}
                        </button>
                    </div>

                    <nav className="grid gap-2 mt-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.to}
                                    to={`/${role}/${item.to}`}
                                    className={({ isActive }) => {
                                        const base = sidebarExpanded
                                            ? "h-12 flex items-center gap-3 rounded-[14px] px-3 text-sm font-semibold transition-colors"
                                            : "h-12 flex justify-center items-center rounded-[10px] text-sm font-semibold transition-colors";
                                        const activeClass =
                                            isActive && sidebarExpanded
                                                ? "bg-(--cit-primary-soft) text-(--cit-primary)"
                                                : "text-(--cit-text) hover:bg-(--cit-primary-soft) hover:text-(--cit-primary)";
                                        return `${base} ${activeClass}`;
                                    }}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span
                                                className={
                                                    sidebarExpanded
                                                        ? "grid h-10 w-10 place-items-center rounded-[14px] bg-(--cit-surface-subtle)"
                                                        : `grid h-10 w-10 place-items-center ${isActive ? "rounded-full bg-(--cit-primary-soft) text-(--cit-primary)" : "rounded-[10px]"}`
                                                }
                                            >
                                                <Icon size={18} />
                                            </span>
                                            <span
                                                className={`${sidebarExpanded ? "inline-flex ml-2" : "hidden"}`}
                                            >
                                                {item.label}
                                            </span>
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>

                    <div className="mt-auto">
                        <button
                            type="button"
                            className="flex h-12 w-full items-center gap-3 rounded-[14px] border border-(--cit-border) bg-(--cit-surface) px-3 text-sm font-semibold text-(--cit-text) transition hover:bg-(--cit-primary-soft)"
                            onClick={() => setUser(null)}
                        >
                            <LogOut size={18} />
                            <span
                                className={`${sidebarExpanded ? "inline-flex" : "hidden"}`}
                            >
                                Logout
                            </span>
                        </button>
                    </div>
                </aside>

                <main
                    className={`transition-all duration-300 ease-out ${mainWidthClass} ${mainMarginClass} px-6 py-8 md:px-8 lg:px-10 overflow-auto max-h-[calc(100vh-84px)]`}
                >
                    <div className="mb-6 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--cit-primary)">
                                {portalLabel}
                            </p>
                            <h1 className="mt-2 text-3xl font-extrabold text-(--cit-text)">
                                {activeTab?.label || "Overview"}
                            </h1>
                        </div>
                    </div>
                    <div className="min-h-[calc(100vh-220px)]">
                        <Outlet />
                    </div>
                </main>

                {mobileOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/30 md:hidden"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
