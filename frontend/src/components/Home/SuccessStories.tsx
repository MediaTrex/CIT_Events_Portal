import { Trophy, Star, Quote } from "lucide-react";

const stories = [
    {
        id: 1,
        team: "Team Nexus",
        event: "CodeStorm 2024",
        prize: "₹75,000 — 1st Place",
        prizeColor: "#F7B928",
        members: [
            {
                name: "Aditya K.",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&auto=format",
            },
            {
                name: "Priya R.",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&auto=format",
            },
            {
                name: "Rohan S.",
                avatar: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=48&h=48&fit=crop&auto=format",
            },
        ],
        quote: "CIT Event Hub made it super easy to register and connect with teammates. The hackathon experience was incredible — we built an AI-powered health app in 48 hours!",
        achievement: "Built an AI Health Monitoring System",
        rating: 5,
    },
    {
        id: 2,
        team: "InnoVerse",
        event: "AI Innovate Hackathon 2024",
        prize: "₹50,000 — 1st Place",
        prizeColor: "#F7B928",
        members: [
            {
                name: "Sneha M.",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=48&h=48&fit=crop&auto=format",
            },
            {
                name: "Kiran T.",
                avatar: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=48&h=48&fit=crop&auto=format",
            },
        ],
        quote: "The platform helped us find like-minded people and form our dream team. We placed first with our computer vision solution for agriculture!",
        achievement: "Created AgriVision — Smart Farming AI",
        rating: 5,
    },
    {
        id: 3,
        team: "Cipher Squad",
        event: "CyberSec Challenge 2024",
        prize: "₹35,000 — 2nd Place",
        prizeColor: "#65676B",
        members: [
            {
                name: "Vikram P.",
                avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=48&h=48&fit=crop&auto=format",
            },
            {
                name: "Meera N.",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&auto=format",
            },
            {
                name: "Arjun K.",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&auto=format",
            },
        ],
        quote: "Our first hackathon together and we placed second! CIT Event Hub gave us the stage to prove ourselves. We're coming back for gold!",
        achievement: "Developed a Real-time Threat Detection Tool",
        rating: 5,
    },
];

export function SuccessStories() {
    return (
        <section style={{ background: "#ffffff", padding: "72px 24px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 52 }}>
                    <span
                        style={{
                            display: "inline-block",
                            background: "#FEF9E7",
                            color: "#F7B928",
                            borderRadius: 100,
                            padding: "5px 16px",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: 13,
                            marginBottom: 14,
                        }}
                    >
                        Hall of Fame
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
                        Success Stories
                    </h2>
                    <p
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 16,
                            color: "#65676B",
                            maxWidth: 500,
                            margin: "0 auto",
                        }}
                    >
                        Meet the champions who turned their ideas into victories
                        on CIT Event Hub.
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 24,
                    }}
                    className="stories-grid"
                >
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            style={{
                                background: "#ffffff",
                                borderRadius: 18,
                                border: "1px solid #DADDE1",
                                overflow: "hidden",
                                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                                transition:
                                    "transform 0.2s ease, box-shadow 0.2s ease",
                                cursor: "default",
                            }}
                            onMouseEnter={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.transform = "translateY(-6px)";
                                (
                                    e.currentTarget as HTMLElement
                                ).style.boxShadow =
                                    "0 20px 48px rgba(0,0,0,0.1)";
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
                            {/* Top gradient header */}
                            <div
                                style={{
                                    background:
                                        "linear-gradient(135deg, #1877F2 0%, #0c5fcc 100%)",
                                    padding: "20px 22px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>
                                    <p
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 800,
                                            fontSize: 17,
                                            color: "#fff",
                                            margin: 0,
                                        }}
                                    >
                                        {story.team}
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: 13,
                                            color: "rgba(255,255,255,0.8)",
                                            margin: "3px 0 0",
                                        }}
                                    >
                                        {story.event}
                                    </p>
                                </div>
                                <div
                                    style={{
                                        background: "rgba(255,255,255,0.15)",
                                        borderRadius: 10,
                                        padding: "8px 12px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                    }}
                                >
                                    <Trophy
                                        size={16}
                                        color={story.prizeColor}
                                    />
                                    <span
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 700,
                                            fontSize: 13,
                                            color: story.prizeColor,
                                        }}
                                    >
                                        Winner
                                    </span>
                                </div>
                            </div>

                            {/* Body */}
                            <div style={{ padding: "22px" }}>
                                {/* Prize badge */}
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                        background: "#FEF9E7",
                                        borderRadius: 8,
                                        padding: "6px 12px",
                                        marginBottom: 16,
                                    }}
                                >
                                    <Trophy size={14} color="#F7B928" />
                                    <span
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 700,
                                            fontSize: 13,
                                            color: "#1C1E21",
                                        }}
                                    >
                                        {story.prize}
                                    </span>
                                </div>

                                {/* Quote */}
                                <div
                                    style={{
                                        position: "relative",
                                        marginBottom: 18,
                                    }}
                                >
                                    <Quote
                                        size={20}
                                        color="#DADDE1"
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                        }}
                                    />
                                    <p
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: 14,
                                            color: "#65676B",
                                            lineHeight: 1.65,
                                            margin: 0,
                                            paddingLeft: 28,
                                            fontStyle: "italic",
                                        }}
                                    >
                                        {story.quote}
                                    </p>
                                </div>

                                {/* Achievement */}
                                <div
                                    style={{
                                        background: "#F0F2F5",
                                        borderRadius: 8,
                                        padding: "10px 14px",
                                        marginBottom: 18,
                                    }}
                                >
                                    <p
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 600,
                                            fontSize: 13,
                                            color: "#1C1E21",
                                            margin: 0,
                                        }}
                                    >
                                        🏆 {story.achievement}
                                    </p>
                                </div>

                                {/* Team members */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: -4,
                                        }}
                                    >
                                        {story.members.map((member, i) => (
                                            <img
                                                key={i}
                                                src={member.avatar}
                                                alt={member.name}
                                                title={member.name}
                                                style={{
                                                    width: 34,
                                                    height: 34,
                                                    borderRadius: "50%",
                                                    border: "2px solid #ffffff",
                                                    marginLeft:
                                                        i === 0 ? 0 : -8,
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ))}
                                        <span
                                            style={{
                                                fontFamily:
                                                    "'Inter', sans-serif",
                                                fontSize: 13,
                                                color: "#65676B",
                                                marginLeft: 10,
                                            }}
                                        >
                                            {story.members
                                                .map(
                                                    (m) => m.name.split(" ")[0],
                                                )
                                                .join(", ")}
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", gap: 2 }}>
                                        {Array.from({
                                            length: story.rating,
                                        }).map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                color="#F7B928"
                                                fill="#F7B928"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        @media (max-width: 900px) {
          .stories-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .stories-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </section>
    );
}
