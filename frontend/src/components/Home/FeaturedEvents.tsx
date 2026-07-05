import {
    Calendar,
    MapPin,
    Trophy,
    Users,
    Clock,
    ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const events = [
    {
        id: 1,
        title: "CodeStorm 2025",
        category: "Hackathon",
        categoryColor: "#1877F2",
        categoryBg: "#E7F3FF",
        image: "https://images.unsplash.com/photo-1759884248009-92c5e957708e?w=600&h=300&fit=crop&auto=format",
        date: "July 15–16, 2025",
        venue: "CIT Main Campus, Block A",
        prize: "₹75,000",
        participants: 320,
        daysLeft: 12,
        tags: ["Web Dev", "AI", "Open Source"],
    },
    {
        id: 2,
        title: "AI Innovate Summit",
        category: "Workshop",
        categoryColor: "#9B51E0",
        categoryBg: "#F3E8FF",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=300&fit=crop&auto=format",
        date: "August 3, 2025",
        venue: "Seminar Hall, Block C",
        prize: "₹30,000",
        participants: 150,
        daysLeft: 31,
        tags: ["Machine Learning", "Deep Learning"],
    },
    {
        id: 3,
        title: "Code Blitz Championship",
        category: "Coding Challenge",
        categoryColor: "#F7B928",
        categoryBg: "#FEF9E7",
        image: "https://images.unsplash.com/photo-1638029202288-451a89e0d55f?w=600&h=300&fit=crop&auto=format",
        date: "August 20, 2025",
        venue: "CS Lab, Block B",
        prize: "₹50,000",
        participants: 480,
        daysLeft: 48,
        tags: ["DSA", "Competitive Coding"],
    },
    {
        id: 4,
        title: "CulturFest 2025",
        category: "Cultural",
        categoryColor: "#E91E8C",
        categoryBg: "#FFE4F5",
        image: "https://images.unsplash.com/photo-1673700910520-c08849045e8b?w=600&h=300&fit=crop&auto=format",
        date: "September 5–7, 2025",
        venue: "College Auditorium",
        prize: "₹40,000",
        participants: 600,
        daysLeft: 64,
        tags: ["Dance", "Music", "Drama"],
    },
];

export const categoryStyle = {
    hackathon: {
        color: "#1877F2",
        bg: "#E7F3FF",
    },
    cultural: {
        color: "#E91E8C",
        bg: "#FFE4F5",
    },
    workshop: {
        color: "#9B51E0",
        bg: "#F3E8FF",
    },
    "coding-challenge": {
        color: "#F7B928",
        bg: "#FEF9E7",
    },
    "ai/ml": {
        color: "#42B72A",
        bg: "#E6F9E3",
    },
    technical: {
        color: "#F7B928",
        bg: "#FEF9E7",
    },
    sports: {
        color: "#1877Ff",
        bg: "#E7F3FF",
    },
    "non-technical": {
        color: "#42B72A",
        bg: "#E6F9E3",
    },
};

export function FeaturedEvents() {
    return (
        <section style={{ background: "#ffffff", padding: "72px 24px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        marginBottom: 40,
                        gap: 20,
                        flexWrap: "wrap",
                    }}
                >
                    <div>
                        <span
                            style={{
                                display: "inline-block",
                                background: "#E7F3FF",
                                color: "#1877F2",
                                borderRadius: 100,
                                padding: "5px 16px",
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 600,
                                fontSize: 13,
                                marginBottom: 14,
                            }}
                        >
                            Don't Miss Out
                        </span>
                        <h2
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 800,
                                fontSize: "clamp(26px, 3vw, 38px)",
                                color: "#1C1E21",
                                margin: 0,
                                letterSpacing: -0.5,
                            }}
                        >
                            Featured Events
                        </h2>
                    </div>
                    <Link
                        to="/events"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "10px 20px",
                            borderRadius: 8,
                            border: "1.5px solid #1877F2",
                            background: "transparent",
                            color: "#1877F2",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: 14,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background =
                                "#E7F3FF";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background =
                                "transparent";
                        }}
                    >
                        View All Events <ArrowRight size={15} />
                    </Link>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 24,
                    }}
                    className="events-grid"
                >
                    {events.map((event) => (
                        <div
                            key={event.id}
                            style={{
                                background: "#ffffff",
                                borderRadius: 16,
                                border: "1px solid #DADDE1",
                                overflow: "hidden",
                                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                                transition:
                                    "transform 0.2s ease, box-shadow 0.2s ease",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.transform = "translateY(-4px)";
                                (
                                    e.currentTarget as HTMLElement
                                ).style.boxShadow =
                                    "0 16px 40px rgba(0,0,0,0.1)";
                            }}
                            onMouseLeave={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.transform = "translateY(0)";
                                (
                                    e.currentTarget as HTMLElement
                                ).style.boxShadow =
                                    "0 2px 12px rgba(0,0,0,0.05)";
                            }}
                        >
                            {/* Poster */}
                            <div
                                style={{
                                    position: "relative",
                                    height: 200,
                                    background: "#F0F2F5",
                                }}
                            >
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 14,
                                        left: 14,
                                        display: "flex",
                                        gap: 8,
                                    }}
                                >
                                    <span
                                        style={{
                                            background:
                                                categoryStyle[
                                                    `${event.category.toLowerCase().split(" ").join("-") as keyof typeof categoryStyle}`
                                                ].bg,
                                            color: categoryStyle[
                                                `${event.category.toLowerCase().split(" ").join("-") as keyof typeof categoryStyle}`
                                            ].color,
                                            borderRadius: 6,
                                            padding: "4px 10px",
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 700,
                                            fontSize: 12,
                                        }}
                                    >
                                        {event.category}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 14,
                                        right: 14,
                                        background: "rgba(0,0,0,0.6)",
                                        borderRadius: 6,
                                        padding: "4px 10px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 5,
                                    }}
                                >
                                    <Clock size={12} color="#fff" />
                                    <span
                                        style={{
                                            color: "#fff",
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 600,
                                            fontSize: 12,
                                        }}
                                    >
                                        {event.daysLeft}d left
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div style={{ padding: "20px 22px" }}>
                                <h3
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 700,
                                        fontSize: 18,
                                        color: "#1C1E21",
                                        margin: "0 0 12px",
                                    }}
                                >
                                    {event.title}
                                </h3>

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                        marginBottom: 16,
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                        }}
                                    >
                                        <Calendar size={14} color="#65676B" />
                                        <span
                                            style={{
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontSize: 13,
                                                color: "#65676B",
                                            }}
                                        >
                                            {event.date}
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                        }}
                                    >
                                        <MapPin size={14} color="#65676B" />
                                        <span
                                            style={{
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontSize: 13,
                                                color: "#65676B",
                                            }}
                                        >
                                            {event.venue}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: 6,
                                        marginBottom: 18,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {event.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            style={{
                                                background: "#F0F2F5",
                                                color: "#65676B",
                                                borderRadius: 6,
                                                padding: "3px 10px",
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontSize: 12,
                                                fontWeight: 500,
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div style={{ display: "flex", gap: 16 }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,
                                            }}
                                        >
                                            <Trophy size={15} color="#F7B928" />
                                            <span
                                                style={{
                                                    fontFamily:
                                                        "'Inter', sans-serif",
                                                    fontWeight: 700,
                                                    fontSize: 14,
                                                    color: "#1C1E21",
                                                }}
                                            >
                                                {event.prize}
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,
                                            }}
                                        >
                                            <Users size={15} color="#65676B" />
                                            <span
                                                style={{
                                                    fontFamily:
                                                        "'Inter', sans-serif",
                                                    fontSize: 13,
                                                    color: "#65676B",
                                                }}
                                            >
                                                {event.participants}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        style={{
                                            padding: "9px 20px",
                                            borderRadius: 8,
                                            border: "none",
                                            background: "#1877F2",
                                            color: "#ffffff",
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 600,
                                            fontSize: 13,
                                            cursor: "pointer",
                                            transition: "background 0.15s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            (
                                                e.currentTarget as HTMLElement
                                            ).style.background = "#166FE5";
                                        }}
                                        onMouseLeave={(e) => {
                                            (
                                                e.currentTarget as HTMLElement
                                            ).style.background = "#1877F2";
                                        }}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        @media (max-width: 768px) {
          .events-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
