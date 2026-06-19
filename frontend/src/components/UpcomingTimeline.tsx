import { MapPin, Users } from "lucide-react";
import { categoryStyle } from "./FeaturedEvents";

const timelineEvents = [
    {
        id: 1,
        date: "Jul 15",
        day: "Tuesday",
        title: "CodeStorm 2025 Hackathon",
        category: "Hackathon",
        categoryColor: "#1877F2",
        venue: "Main Campus, Block A",
        participants: 320,
        status: "Registration Open",
        statusColor: "#42B72A",
    },
    {
        id: 2,
        date: "Jul 22",
        day: "Tuesday",
        title: "Robonautics — Robotics Workshop",
        category: "Workshop",
        categoryColor: "#9B51E0",
        venue: "Electronics Lab",
        participants: 80,
        status: "Registration Open",
        statusColor: "#42B72A",
    },
    {
        id: 3,
        date: "Aug 3",
        day: "Sunday",
        title: "AI Innovate Summit",
        category: "Workshop",
        categoryColor: "#9B51E0",
        venue: "Seminar Hall, Block C",
        participants: 150,
        status: "Coming Soon",
        statusColor: "#F7B928",
    },
    {
        id: 4,
        date: "Aug 10",
        day: "Sunday",
        title: "Inter-College Cricket Tournament",
        category: "Sports",
        categoryColor: "#0288D1",
        venue: "CIT Sports Ground",
        participants: 220,
        status: "Coming Soon",
        statusColor: "#F7B928",
    },
    {
        id: 5,
        date: "Aug 20",
        day: "Wednesday",
        title: "Code Blitz Championship",
        category: "Coding Challenge",
        categoryColor: "#F7B928",
        venue: "CS Lab, Block B",
        participants: 480,
        status: "Coming Soon",
        statusColor: "#F7B928",
    },
    {
        id: 6,
        date: "Sep 5",
        day: "Friday",
        title: "CulturFest 2025 — Mega Event",
        category: "Cultural",
        categoryColor: "#E91E8C",
        venue: "College Auditorium",
        participants: 600,
        status: "Coming Soon",
        statusColor: "#F7B928",
    },
];

export function UpcomingTimeline() {
    return (
        <section style={{ background: "#F0F2F5", padding: "72px 24px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
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
                        What's Coming
                    </span>
                    <h2
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(26px, 3vw, 38px)",
                            color: "#1C1E21",
                            margin: "0 0 12px",
                            letterSpacing: -0.5,
                        }}
                    >
                        Upcoming Events Timeline
                    </h2>
                    <p
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 16,
                            color: "#65676B",
                            margin: 0,
                        }}
                    >
                        Mark your calendars and never miss an opportunity.
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                        gap: 0,
                    }}
                    className="timeline-container"
                >
                    {/* Left sidebar months */}
                    <div />

                    {/* Right timeline */}
                    <div style={{ position: "relative" }}>
                        {/* vertical line */}
                        <div
                            style={{
                                position: "absolute",
                                left: -1,
                                top: 0,
                                bottom: 0,
                                width: 2,
                                background:
                                    "linear-gradient(to bottom, #1877F2, #DADDE1)",
                                borderRadius: 2,
                            }}
                        />

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 0,
                            }}
                        >
                            {timelineEvents.map((event, idx) => (
                                <div
                                    key={event.id}
                                    style={{
                                        display: "flex",
                                        gap: 0,
                                        paddingBottom:
                                            idx < timelineEvents.length - 1
                                                ? 24
                                                : 0,
                                    }}
                                >
                                    {/* Date column */}
                                    <div
                                        style={{
                                            width: 100,
                                            flexShrink: 0,
                                            paddingRight: 24,
                                            textAlign: "right",
                                            paddingTop: 18,
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontWeight: 800,
                                                fontSize: 22,
                                                color: "#1C1E21",
                                                margin: 0,
                                                lineHeight: 1,
                                            }}
                                        >
                                            {event.date}
                                        </p>
                                        <p
                                            style={{
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontSize: 12,
                                                color: "#65676B",
                                                margin: "3px 0 0",
                                            }}
                                        >
                                            {event.day}
                                        </p>
                                    </div>

                                    {/* Dot */}
                                    <div
                                        style={{
                                            width: 0,
                                            position: "relative",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                left: -8,
                                                top: 22,
                                                width: 16,
                                                height: 16,
                                                borderRadius: "50%",
                                                background:
                                                    categoryStyle[
                                                        `${event.category.toLowerCase().split(" ").join("-") as keyof typeof categoryStyle}`
                                                    ].color,
                                                border: "3px solid #F0F2F5",
                                                zIndex: 1,
                                            }}
                                        />
                                    </div>

                                    {/* Card */}
                                    <div
                                        style={{
                                            flex: 1,
                                            marginLeft: 28,
                                            background: "#ffffff",
                                            borderRadius: 14,
                                            padding: "18px 20px",
                                            border: "1px solid #DADDE1",
                                            boxShadow:
                                                "0 2px 8px rgba(0,0,0,0.04)",
                                            transition:
                                                "transform 0.15s ease, box-shadow 0.15s ease",
                                            cursor: "pointer",
                                        }}
                                        onMouseEnter={(e) => {
                                            (
                                                e.currentTarget as HTMLElement
                                            ).style.transform =
                                                "translateX(4px)";
                                            (
                                                e.currentTarget as HTMLElement
                                            ).style.boxShadow =
                                                "0 8px 24px rgba(0,0,0,0.08)";
                                        }}
                                        onMouseLeave={(e) => {
                                            (
                                                e.currentTarget as HTMLElement
                                            ).style.transform = "translateX(0)";
                                            (
                                                e.currentTarget as HTMLElement
                                            ).style.boxShadow =
                                                "0 2px 8px rgba(0,0,0,0.04)";
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                justifyContent: "space-between",
                                                gap: 12,
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <div style={{ flex: 1 }}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 10,
                                                        marginBottom: 8,
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
                                                            padding: "3px 10px",
                                                            fontFamily:
                                                                "'Inter', sans-serif",
                                                            fontWeight: 600,
                                                            fontSize: 12,
                                                        }}
                                                    >
                                                        {event.category}
                                                    </span>
                                                    <span
                                                        style={{
                                                            background:
                                                                event.statusColor +
                                                                "20",
                                                            color: event.statusColor,
                                                            borderRadius: 6,
                                                            padding: "3px 10px",
                                                            fontFamily:
                                                                "'Inter', sans-serif",
                                                            fontWeight: 600,
                                                            fontSize: 12,
                                                        }}
                                                    >
                                                        {event.status}
                                                    </span>
                                                </div>
                                                <p
                                                    style={{
                                                        fontFamily:
                                                            "'Inter', sans-serif",
                                                        fontWeight: 700,
                                                        fontSize: 16,
                                                        color: "#1C1E21",
                                                        margin: "0 0 8px",
                                                    }}
                                                >
                                                    {event.title}
                                                </p>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: 18,
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 6,
                                                        }}
                                                    >
                                                        <MapPin
                                                            size={13}
                                                            color="#65676B"
                                                        />
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
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 6,
                                                        }}
                                                    >
                                                        <Users
                                                            size={13}
                                                            color="#65676B"
                                                        />
                                                        <span
                                                            style={{
                                                                fontFamily:
                                                                    "'Inter', sans-serif",
                                                                fontSize: 13,
                                                                color: "#65676B",
                                                            }}
                                                        >
                                                            {event.participants}{" "}
                                                            participants
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                style={{
                                                    padding: "8px 18px",
                                                    borderRadius: 8,
                                                    border: "1.5px solid #1877F2",
                                                    background: "transparent",
                                                    color: "#1877F2",
                                                    fontFamily:
                                                        "'Inter', sans-serif",
                                                    fontWeight: 600,
                                                    fontSize: 13,
                                                    cursor: "pointer",
                                                    whiteSpace: "nowrap",
                                                    transition:
                                                        "all 0.15s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                    (
                                                        e.currentTarget as HTMLElement
                                                    ).style.background =
                                                        "#1877F2";
                                                    (
                                                        e.currentTarget as HTMLElement
                                                    ).style.color = "#fff";
                                                }}
                                                onMouseLeave={(e) => {
                                                    (
                                                        e.currentTarget as HTMLElement
                                                    ).style.background =
                                                        "transparent";
                                                    (
                                                        e.currentTarget as HTMLElement
                                                    ).style.color = "#1877F2";
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
                </div>
            </div>
            <style>{`
        @media (max-width: 768px) {
          .timeline-container { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
