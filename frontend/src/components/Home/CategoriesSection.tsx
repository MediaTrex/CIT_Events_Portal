import {
    Code2,
    Cpu,
    Bot,
    Microscope,
    Monitor,
    Music,
    Dumbbell,
    Paintbrush,
    ChevronRight,
} from "lucide-react";

const categories = [
    {
        icon: Code2,
        label: "Hackathons",
        count: 18,
        color: "#1877F2",
        bg: "linear-gradient(135deg, #E7F3FF, #C4DEF9)",
    },
    {
        icon: Monitor,
        label: "Workshops",
        count: 24,
        color: "#9B51E0",
        bg: "linear-gradient(135deg, #F3E8FF, #DCC6F9)",
    },
    {
        icon: Cpu,
        label: "Coding Challenges",
        count: 32,
        color: "#F7B928",
        bg: "linear-gradient(135deg, #FEF9E7, #FDEDB5)",
    },
    {
        icon: Bot,
        label: "AI / ML",
        count: 12,
        color: "#42B72A",
        bg: "linear-gradient(135deg, #E6F9E3, #BEF0B8)",
    },
    {
        icon: Microscope,
        label: "Technical Events",
        count: 20,
        color: "#FA3E3E",
        bg: "linear-gradient(135deg, #FDE8E8, #FAC4C4)",
    },
    {
        icon: Paintbrush,
        label: "Non-Technical",
        count: 15,
        color: "#FF7043",
        bg: "linear-gradient(135deg, #FFF0EB, #FFD4C2)",
    },
    {
        icon: Dumbbell,
        label: "Sports",
        count: 10,
        color: "#0288D1",
        bg: "linear-gradient(135deg, #E0F4FF, #B3E4F9)",
    },
    {
        icon: Music,
        label: "Cultural",
        count: 14,
        color: "#E91E8C",
        bg: "linear-gradient(135deg, #FFE4F5, #FBB8DC)",
    },
];

export function CategoriesSection() {
    return (
        <section
            id="events"
            style={{ background: "#F0F2F5", padding: "64px 24px" }}
        >
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
                        Explore by Category
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
                        Event Categories
                    </h2>
                    <p
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 16,
                            color: "#65676B",
                            maxWidth: 520,
                            margin: "0 auto",
                            lineHeight: 1.6,
                        }}
                    >
                        Browse across diverse categories and find competitions
                        that match your passion and skills.
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 18,
                    }}
                    className="cat-grid"
                >
                    {categories.map((cat) => (
                        <div
                            key={cat.label}
                            style={{
                                background: "#ffffff",
                                borderRadius: 16,
                                padding: "24px 20px",
                                border: "1px solid #DADDE1",
                                cursor: "pointer",
                                transition:
                                    "transform 0.2s ease, box-shadow 0.2s ease",
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                            onMouseEnter={(e) => {
                                (
                                    e.currentTarget as HTMLElement
                                ).style.transform = "translateY(-6px)";
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
                                ).style.boxShadow = "none";
                            }}
                        >
                            <div
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: 14,
                                    background: cat.bg,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                className="max-xs:w-11! max-xs:h-11!"
                            >
                                <cat.icon size={24} color={cat.color} />
                            </div>
                            <div>
                                <p
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 700,
                                        fontSize: 15,
                                        color: "#1C1E21",
                                        margin: "0 0 4px",
                                    }}
                                    className="max-xs:text-sm!"
                                >
                                    {cat.label}
                                </p>
                                <p
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: 13,
                                        color: "#65676B",
                                        margin: 0,
                                    }}
                                >
                                    {cat.count} events
                                </p>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4,
                                    marginTop: "auto",
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: 13,
                                        fontWeight: 600,
                                        color: cat.color,
                                    }}
                                >
                                    Browse
                                </span>
                                <ChevronRight size={14} color={cat.color} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
        @media (max-width: 900px) {
          .cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
        </section>
    );
}
