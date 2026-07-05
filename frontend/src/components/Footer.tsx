import { Zap, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { CiTwitter } from "react-icons/ci";
import { FiLinkedin } from "react-icons/fi";

const footerLinks = {
    Platform: [
        "Browse Events",
        "Create Event",
        "Team Finder",
        "Leaderboard",
        "Past Events",
    ],
    Categories: [
        "Hackathons",
        "Workshops",
        "Coding Challenges",
        "Cultural Events",
        "Sports",
    ],
    Support: [
        "Help Center",
        "Contact Us",
        "Community Forum",
        "Report an Issue",
        "Privacy Policy",
    ],
};

const socials = [
    { icon: SiFacebook, href: "#", label: "Facebook", color: "#1877F2" },
    { icon: CiTwitter, href: "#", label: "Twitter", color: "#1DA1F2" },
    { icon: SiInstagram, href: "#", label: "Instagram", color: "#E91E8C" },
    { icon: FiLinkedin, href: "#", label: "LinkedIn", color: "#0A66C2" },
    { icon: SiYoutube, href: "#", label: "YouTube", color: "#FF0000" },
];

export function Footer() {
    return (
        <footer
            id="contact"
            style={{ background: "#1C1E21", color: "#ffffff" }}
        >
            {/* Newsletter CTA */}
            <div style={{ background: "#1877F2", padding: "48px 24px" }}>
                <div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 32,
                        flexWrap: "wrap",
                    }}
                >
                    <div>
                        <h3
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 800,
                                fontSize: 26,
                                color: "#ffffff",
                                margin: "0 0 8px",
                            }}
                        >
                            Never miss an event again
                        </h3>
                        <p
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 15,
                                color: "rgba(255,255,255,0.85)",
                                margin: 0,
                            }}
                        >
                            Subscribe to get updates on new events, deadlines,
                            and winners.
                        </p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: 0,
                            borderRadius: 10,
                            overflow: "hidden",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                        }}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            style={{
                                padding: "14px 20px",
                                border: "none",
                                background: "#ffffff",
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 15,
                                color: "#1C1E21",
                                outline: "none",
                                
                            }}
                            className="flex-1 max-xs:py-2! max-xs:px-4! max-xs:text-sm!"
                        />
                        <button
                            style={{
                                padding: "14px 22px",
                                border: "none",
                                background: "#42B72A",
                                color: "#ffffff",
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 700,
                                fontSize: 15,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                transition: "background 0.15s ease",
                            }}
                            className="flex-1/3 max-xs:py-2! max-xs:px-2! max-xs:text-sm!"
                            onMouseEnter={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.background = "#35a020";
                            }}
                            onMouseLeave={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.background = "#42B72A";
                            }}
                        >
                            Subscribe <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div style={{ padding: "60px 24px 40px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "2fr 1fr 1fr 1fr",
                            gap: 48,
                        }}
                        className="footer-grid"
                    >
                        {/* Brand */}
                        <div>
                            <a
                                href="#home"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    textDecoration: "none",
                                    marginBottom: 20,
                                }}
                            >
                                <div
                                    style={{
                                        width: 38,
                                        height: 38,
                                        borderRadius: 10,
                                        background:
                                            "linear-gradient(135deg, #1877F2, #0c5fcc)",
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
                                        color: "#ffffff",
                                    }}
                                >
                                    CIT Event Hub
                                </span>
                            </a>
                            <p
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 14,
                                    color: "#B0B3B8",
                                    lineHeight: 1.7,
                                    marginBottom: 24,
                                    maxWidth: 280,
                                }}
                            >
                                The official event management platform for
                                Chennai Institute of Technology. Discover,
                                register, and excel in competitions.
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                    marginBottom: 28,
                                }}
                            >
                                {[
                                    { icon: Mail, text: "events@cit.edu.in" },
                                    { icon: Phone, text: "+91 422-248-5500" },
                                    {
                                        icon: MapPin,
                                        text: "CIT Campus, Chennai — 600069",
                                    },
                                ].map(({ icon: Icon, text }) => (
                                    <div
                                        key={text}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10,
                                        }}
                                    >
                                        <Icon size={15} color="#1877F2" />
                                        <span
                                            style={{
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontSize: 14,
                                                color: "#B0B3B8",
                                            }}
                                        >
                                            {text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Socials */}
                            <div style={{ display: "flex", gap: 10 }}>
                                {socials.map(
                                    ({ icon: Icon, href, label, color }) => (
                                        <a
                                            key={label}
                                            href={href}
                                            aria-label={label}
                                            style={{
                                                width: 38,
                                                height: 38,
                                                borderRadius: 8,
                                                background: "#2D2F34",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textDecoration: "none",
                                                transition:
                                                    "background 0.15s ease, transform 0.15s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                (
                                                    e.currentTarget as HTMLElement
                                                ).style.background = color;
                                                (
                                                    e.currentTarget as HTMLElement
                                                ).style.transform =
                                                    "translateY(-3px)";
                                            }}
                                            onMouseLeave={(e) => {
                                                (
                                                    e.currentTarget as HTMLElement
                                                ).style.background = "#2D2F34";
                                                (
                                                    e.currentTarget as HTMLElement
                                                ).style.transform =
                                                    "translateY(0)";
                                            }}
                                        >
                                            <Icon size={16} color="#ffffff" />
                                        </a>
                                    ),
                                )}
                            </div>
                        </div>

                        {/* Link columns */}
                        {Object.entries(footerLinks).map(([section, links]) => (
                            <div key={section}>
                                <p
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 700,
                                        fontSize: 14,
                                        color: "#ffffff",
                                        margin: "0 0 18px",
                                        textTransform: "uppercase",
                                        letterSpacing: 0.8,
                                    }}
                                >
                                    {section}
                                </p>
                                <ul
                                    style={{
                                        listStyle: "none",
                                        padding: 0,
                                        margin: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 12,
                                    }}
                                >
                                    {links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                style={{
                                                    fontFamily:
                                                        "'Inter', sans-serif",
                                                    fontSize: 14,
                                                    color: "#B0B3B8",
                                                    textDecoration: "none",
                                                    transition:
                                                        "color 0.15s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                    (
                                                        e.currentTarget as HTMLElement
                                                    ).style.color = "#1877F2";
                                                }}
                                                onMouseLeave={(e) => {
                                                    (
                                                        e.currentTarget as HTMLElement
                                                    ).style.color = "#B0B3B8";
                                                }}
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Bottom bar */}
                    <div
                        style={{
                            borderTop: "1px solid #2D2F34",
                            marginTop: 48,
                            paddingTop: 24,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 12,
                        }}
                    >
                        <p
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 14,
                                color: "#B0B3B8",
                                margin: 0,
                            }}
                        >
                            © 2025 CIT Event Hub. All rights reserved.
                        </p>
                        <div style={{ display: "flex", gap: 20 }}>
                            {[
                                "Terms of Service",
                                "Privacy Policy",
                                "Cookie Policy",
                            ].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: 13,
                                        color: "#B0B3B8",
                                        textDecoration: "none",
                                        transition: "color 0.15s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        (
                                            e.currentTarget as HTMLElement
                                        ).style.color = "#fff";
                                    }}
                                    onMouseLeave={(e) => {
                                        (
                                            e.currentTarget as HTMLElement
                                        ).style.color = "#B0B3B8";
                                    }}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </footer>
    );
}
