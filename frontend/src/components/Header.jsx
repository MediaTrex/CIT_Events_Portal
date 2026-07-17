import { Menu, X, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Header() {
    const [logoutConfirmation, setLogoutConfirmation] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const location = useLocation();
    const { user, setUser, isLoggedIn } = useAuthContext();

    const dashboardPath =
        user?.role === "admin"
            ? "/admin/dashboard"
            : user?.role === "organizer"
              ? "/organizer/dashboard"
              : "/student/dashboard";

    const navLinks = isLoggedIn
        ? [
              { label: "Home", page: "/" },
              { label: "Events", page: "/events" },
              { label: "Dashboard", page: dashboardPath },
          ]
        : [
              { label: "Home", page: "/" },
              { label: "Events", page: "/events" },
              { label: "About", page: null },
              { label: "FAQ", page: null },
              { label: "Contact", page: null },
          ];

    useEffect(() => {
        setProfileOpen(false);
        setMobileOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setMobileOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const displayName = user?.name || user?.email?.split("@")[0] || "User";
    const roleLabel = user?.role.toUpperCase() || "Student";
    const avatarInitials = displayName
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    const handleLogout = () => {
        setUser(null);
        setLogoutConfirmation(false);
    };

    return (
        <nav
            style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                background: "#ffffff",
                borderBottom: "1px solid #DADDE1",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
        >
            <div
                style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: 64,
                    }}
                >
                    {/* Logo */}
                    <Link
                        to="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 0,
                        }}
                    >
                        {/*
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                background:
                                    "linear-gradient(135deg, #1877F2 0%, #0c5fcc 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Zap size={20} color="#fff" fill="#fff" />
                        </div>
                        <span
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 800,
                                fontSize: 20,
                                color: "#1C1E21",
                                letterSpacing: -0.5,
                            }}
                        >
                            CIT{" "}
                            <span style={{ color: "#1877F2" }}>Event Hub</span>
                        </span>
                        */}
                        <img
                            src="/cit-logo.png"
                            alt="CIT logo"
                            style={{
                                width: 300,
                                objectFit: "contain",
                                objectPosition: "center",
                                display: "block",
                            }}
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                        }}
                        className="nav-desktop"
                    >
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.page;
                            return (
                                <Link
                                    to={link.page}
                                    key={link.label}
                                    style={{
                                        padding: "8px 16px",
                                        borderRadius: 8,
                                        background: isActive
                                            ? "#E7F3FF"
                                            : "transparent",
                                        border: "none",
                                        borderBottom: `2px solid ${isActive ? "#1877F2" : "transparent"}`,
                                        color: isActive ? "#1877F2" : "#65676B",
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: isActive ? 700 : 500,
                                        fontSize: 15,
                                        cursor: "pointer",
                                        transition: "all 0.15s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.color =
                                                "#1877F2";
                                            e.currentTarget.style.background =
                                                "#E7F3FF";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.color =
                                                "#65676B";
                                            e.currentTarget.style.background =
                                                "transparent";
                                        }
                                    }}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Buttons */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                        }}
                        className="nav-desktop"
                    >
                        {isLoggedIn ? (
                            <div
                                ref={profileRef}
                                style={{ position: "relative" }}
                            >
                                <button
                                    onClick={() =>
                                        setProfileOpen((prev) => !prev)
                                    }
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        background: "#F7F9FC",
                                        border: "1px solid #DADDE1",
                                        borderRadius: 999,
                                        padding: "6px 10px 6px 6px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 38,
                                            height: 38,
                                            borderRadius: "50%",
                                            background:
                                                "linear-gradient(135deg, #1877F2 0%, #0c5fcc 100%)",
                                            color: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: 700,
                                            fontSize: 14,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {avatarInitials}
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            minWidth: 0,
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontWeight: 700,
                                                fontSize: 14,
                                                color: "#1C1E21",
                                                maxWidth: 100,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {displayName}
                                        </span>
                                        <span
                                            style={{
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontWeight: 600,
                                                fontSize: 12,
                                                color: "#65676B",
                                            }}
                                        >
                                            {roleLabel}
                                        </span>
                                    </div>
                                </button>

                                {profileOpen && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            right: 0,
                                            top: "calc(100% + 8px)",
                                            background: "#fff",
                                            border: "1px solid #DADDE1",
                                            borderRadius: 12,
                                            boxShadow:
                                                "0 10px 30px rgba(0,0,0,0.08)",
                                            minWidth: 180,
                                            padding: 8,
                                            zIndex: 110,
                                        }}
                                    >
                                        <Link
                                            to={
                                                user?.role === "admin"
                                                    ? "/admin/dashboard"
                                                    : user?.role === "organizer"
                                                      ? "/organizer/profile"
                                                      : "/student/profile"
                                            }
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }
                                            style={{
                                                display: "block",
                                                padding: "10px 12px",
                                                borderRadius: 8,
                                                color: "#1C1E21",
                                                textDecoration: "none",
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontWeight: 600,
                                                fontSize: 14,
                                            }}
                                        >
                                            {user?.role === "admin"
                                                ? "Overview"
                                                : "Profile"}
                                        </Link>
                                        <Link
                                            to={dashboardPath}
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }
                                            style={{
                                                display: "block",
                                                padding: "10px 12px",
                                                borderRadius: 8,
                                                color: "#1C1E21",
                                                textDecoration: "none",
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontWeight: 600,
                                                fontSize: 14,
                                            }}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setLogoutConfirmation(true);
                                                setProfileOpen(false);
                                            }}
                                            style={{
                                                width: "100%",
                                                textAlign: "left",
                                                padding: "10px 12px",
                                                borderRadius: 8,
                                                border: "none",
                                                background: "transparent",
                                                color: "#D14343",
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontWeight: 600,
                                                fontSize: 14,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    style={{
                                        padding: "9px 20px",
                                        borderRadius: 8,
                                        border: "1.5px solid #1877F2",
                                        background: "transparent",
                                        color: "#1877F2",
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                        fontSize: 15,
                                        cursor: "pointer",
                                        transition: "all 0.15s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            "#E7F3FF";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "transparent";
                                    }}
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    style={{
                                        padding: "9px 20px",
                                        borderRadius: 8,
                                        border: "none",
                                        background: "#1877F2",
                                        color: "#ffffff",
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                        fontSize: 15,
                                        cursor: "pointer",
                                        transition: "background 0.15s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background =
                                            "#166FE5";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background =
                                            "#1877F2";
                                    }}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            display: "none",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 4,
                        }}
                        className="nav-mobile-btn"
                    >
                        {mobileOpen ? (
                            <X size={24} color="#1C1E21" />
                        ) : (
                            <Menu size={24} color="#1C1E21" />
                        )}
                    </button>
                </div>

                {/* Mobile drawer */}
                <div
                    style={{
                        borderTop: "1px solid #DADDE1",
                        paddingBottom: mobileOpen ? 16 : 0,
                        maxHeight: mobileOpen ? 420 : 0,
                        opacity: mobileOpen ? 1 : 0,
                        overflow: "hidden",
                        transition:
                            "max-height 0.3s ease, opacity 0.25s ease, padding-bottom 0.3s ease",
                        pointerEvents: mobileOpen ? "auto" : "none",
                    }}
                    className="nav-mobile-menu"
                >
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.page;
                        return (
                            <Link
                                to={link.page}
                                key={link.label}
                                onClick={() => {
                                    if (link.page) {
                                        setMobileOpen(false);
                                    }
                                }}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    textAlign: "left",
                                    padding: "12px 8px",
                                    background: "none",
                                    border: "none",
                                    borderBottom: "1px solid #F0F2F5",
                                    color: isActive ? "#1877F2" : "#1C1E21",
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: isActive ? 700 : 500,
                                    fontSize: 15,
                                    cursor: "pointer",
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                            marginTop: 12,
                            width: "100%",
                        }}
                    >
                        {isLoggedIn ? (
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        width: "100%",
                                        padding: "10px 12px",
                                        borderRadius: 10,
                                        background: "#F7F9FC",
                                        border: "1px solid #DADDE1",
                                        minWidth: 0,
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            background:
                                                "linear-gradient(135deg, #1877F2 0%, #0c5fcc 100%)",
                                            color: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: 700,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {avatarInitials}
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <div
                                            style={{
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontWeight: 700,
                                                color: "#1C1E21",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {displayName}
                                        </div>
                                        <div
                                            style={{
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontWeight: 600,
                                                fontSize: 12,
                                                color: "#65676B",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {roleLabel}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "100%",
                                        gap: 8,
                                        minWidth: 0,
                                    }}
                                >
                                    <Link
                                        to={
                                            user?.role === "admin"
                                                ? "/admin/dashboard"
                                                : user?.role === "organizer"
                                                  ? "/organizer/profile"
                                                  : "/student/profile"
                                        }
                                        onClick={() => setMobileOpen(false)}
                                        style={{
                                            padding: "10px 12px",
                                            borderRadius: 8,
                                            background: "#F7F9FC",
                                            color: "#1C1E21",
                                            textDecoration: "none",
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 600,
                                            fontSize: 14,
                                            width: "100%",
                                            boxSizing: "border-box",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {user?.role === "admin"
                                            ? "Overview"
                                            : "Profile"}
                                    </Link>
                                    <Link
                                        to={dashboardPath}
                                        onClick={() => setMobileOpen(false)}
                                        style={{
                                            padding: "10px 12px",
                                            borderRadius: 8,
                                            background: "#F7F9FC",
                                            color: "#1C1E21",
                                            textDecoration: "none",
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 600,
                                            fontSize: 14,
                                            width: "100%",
                                            boxSizing: "border-box",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setLogoutConfirmation(true);
                                            setMobileOpen(false);
                                        }}
                                        style={{
                                            padding: "10px 12px",
                                            borderRadius: 8,
                                            border: "none",
                                            background: "#FDECEC",
                                            color: "#D14343",
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 600,
                                            fontSize: 14,
                                            cursor: "pointer",
                                            width: "100%",
                                            boxSizing: "border-box",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        flex: 1,
                                        padding: "10px 0",
                                        borderRadius: 8,
                                        border: "1.5px solid #1877F2",
                                        background: "transparent",
                                        color: "#1877F2",
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        textAlign: "center",
                                        textDecoration: "none",
                                    }}
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        flex: 1,
                                        padding: "10px 0",
                                        borderRadius: 8,
                                        border: "none",
                                        background: "#1877F2",
                                        color: "#fff",
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        textAlign: "center",
                                        textDecoration: "none",
                                    }}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {logoutConfirmation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-4 logout-modal-backdrop">
                    <div className="logout-modal-card rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) p-6 shadow-lg max-w-sm w-full">
                        <div className="mb-4">
                            <p className="mt-2 text-sm text-(--cit-text-muted)">
                                Are you sure you want to logout?
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setLogoutConfirmation(false)}
                                className="cursor-pointer flex-1 rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface) px-4 py-2.5 font-medium text-(--cit-text) transition-colors hover:bg-(--cit-surface-subtle)"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="cursor-pointer flex-1 rounded-(--cit-radius-md) bg-(--cit-danger) px-4 py-2.5 font-medium text-white transition-colors hover:bg-opacity-90"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
        .nav-mobile-menu { display: block; }

        .logout-modal-backdrop {
          opacity: 0;
          animation: logoutBackdropFade 220ms ease-out forwards;
        }

        .logout-modal-card {
          opacity: 0;
          transform: translateY(14px) scale(0.98);
          animation: logoutCardPop 220ms ease-out forwards;
        }

        @keyframes logoutBackdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes logoutCardPop {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
        </nav>
    );
}
