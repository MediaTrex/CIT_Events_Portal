import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    let location = useLocation();
    console.log(location);

    const navLinks = [
        { label: "Home", page: "/" },
        { label: "Events", page: "events" },
        { label: "About", page: null },
        { label: "FAQ", page: null },
        { label: "Contact", page: null },
    ];

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
                    <button
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
                    </button>

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
                            const isActive = location.pathname.startsWith(
                                link.page,
                            );
                            return (
                                <button
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
                                </button>
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
                        <button
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
                                e.currentTarget.style.background = "#E7F3FF";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                    "transparent";
                            }}
                        >
                            Log In
                        </button>
                        <button
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
                                e.currentTarget.style.background = "#166FE5";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#1877F2";
                            }}
                        >
                            Register
                        </button>
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
                {mobileOpen && (
                    <div
                        style={{
                            borderTop: "1px solid #DADDE1",
                            paddingBottom: 16,
                        }}
                        className="nav-mobile-menu"
                    >
                        {navLinks.map((link) => {
                            const isActive = location.pathname.startsWith(
                                link.page,
                            );
                            return (
                                <button
                                    key={link.label}
                                    onClick={() => {
                                        if (link.page) {
                                            setActivePage(link.page);
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
                                </button>
                            );
                        })}
                        <div
                            style={{ display: "flex", gap: 10, marginTop: 12 }}
                        >
                            <button
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
                                }}
                            >
                                Log In
                            </button>
                            <button
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
                                }}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        .nav-mobile-menu { display: block;  }
      `}</style>
        </nav>
    );
}
