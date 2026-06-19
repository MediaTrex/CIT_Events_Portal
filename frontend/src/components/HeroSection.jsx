import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
    return (
        <section
            id="home"
            style={{
                background:
                    "linear-gradient(135deg, #1877F2 0%, #0c5fcc 50%, #1a3a6b 100%)",
                padding: "100px 24px 80px",
                position: "relative",
                overflow: "hidden",
                minHeight: "100vh",
            }}
        >
            {/* Background decorative circles */}
            <div
                style={{
                    position: "absolute",
                    top: -100,
                    right: -100,
                    width: 500,
                    height: 500,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.05)",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: -60,
                    left: -60,
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.04)",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "30%",
                    right: "15%",
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    background: "rgba(66,183,42,0.15)",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    position: "relative",
                }}
            >
                <div
                    style={{ gap: 60, alignItems: "center" , display: "grid" , gridTemplateColumns: "1fr 1fr" }}
                    className="hero-sec"
                >
                    {/* Left: Text */}
                    <div>
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                background: "rgba(255,255,255,0.15)",
                                borderRadius: 100,
                                padding: "6px 16px",
                                marginBottom: 24,
                            }}
                        >
                            <span
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    background: "#42B72A",
                                    display: "inline-block",
                                }}
                            />
                            <span
                                style={{
                                    color: "#fff",
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 500,
                                    fontSize: 13,
                                }}
                            >
                                CIT College's Official Event Platform
                            </span>
                        </div>

                        <h1
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 800,
                                fontSize: "clamp(32px, 5vw, 52px)",
                                color: "#ffffff",
                                lineHeight: 1.15,
                                marginBottom: 20,
                                letterSpacing: -1,
                            }}
                        >
                            Discover Competitions, Hackathons, Workshops and{" "}
                            <span style={{ color: "#86EFAC" }}>
                                Opportunities
                            </span>
                        </h1>

                        <p
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 400,
                                fontSize: 18,
                                color: "rgba(255,255,255,0.85)",
                                lineHeight: 1.65,
                                marginBottom: 36,
                                maxWidth: 520,
                            }}
                        >
                            Join events, build teams, showcase your skills and
                            win exciting prizes. Your next big achievement
                            starts here at CIT Event Hub.
                        </p>

                        <div
                            style={{
                                display: "flex",
                                gap: 14,
                                flexWrap: "wrap",
                            }}
                        >
                            <button
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "14px 28px",
                                    borderRadius: 10,
                                    border: "none",
                                    background: "#ffffff",
                                    color: "#1877F2",
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 700,
                                    fontSize: 16,
                                    cursor: "pointer",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                                    transition:
                                        "transform 0.15s ease, box-shadow 0.15s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-2px)";
                                    e.currentTarget.style.boxShadow =
                                        "0 8px 24px rgba(0,0,0,0.25)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0)";
                                    e.currentTarget.style.boxShadow =
                                        "0 4px 16px rgba(0,0,0,0.2)";
                                }}
                            >
                                Explore Events <ArrowRight size={18} />
                            </button>

                            <button
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    padding: "14px 28px",
                                    borderRadius: 10,
                                    border: "2px solid rgba(255,255,255,0.5)",
                                    background: "rgba(255,255,255,0.1)",
                                    color: "#ffffff",
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 700,
                                    fontSize: 16,
                                    cursor: "pointer",
                                    backdropFilter: "blur(8px)",
                                    transition: "all 0.15s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(255,255,255,0.2)";
                                    e.currentTarget.style.borderColor =
                                        "rgba(255,255,255,0.8)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                        "rgba(255,255,255,0.1)";
                                    e.currentTarget.style.borderColor =
                                        "rgba(255,255,255,0.5)";
                                }}
                            >
                                Create Account
                            </button>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 24,
                                marginTop: 40,
                            }}
                        >
                            <div style={{ display: "flex" }}>
                                {[
                                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&auto=format",
                                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format",
                                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format",
                                    "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?w=40&h=40&fit=crop&auto=format",
                                ].map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`Student ${i + 1}`}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: "50%",
                                            border: "2px solid #1877F2",
                                            marginLeft: i === 0 ? 0 : -10,
                                            objectFit: "cover",
                                        }}
                                    />
                                ))}
                            </div>
                            <div>
                                <p
                                    style={{
                                        color: "#ffffff",
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                        fontSize: 14,
                                        margin: 0,
                                    }}
                                >
                                    2,400+ Students
                                </p>
                                <p
                                    style={{
                                        color: "rgba(255,255,255,0.7)",
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: 13,
                                        margin: 0,
                                    }}
                                >
                                    already registered
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Image card */}
                    <div
                        style={{ position: "relative" }}
                        className="hero-image-col"
                    >
                        <div
                            style={{
                                borderRadius: 20,
                                overflow: "hidden",
                                boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
                                position: "relative",
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1759884248009-92c5e957708e?w=600&h=400&fit=crop&auto=format"
                                alt="Students coding at hackathon"
                                style={{
                                    width: "100%",
                                    height: 380,
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 20,
                                    left: 20,
                                    right: 20,
                                }}
                            >
                                <span
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 6,
                                        background: "#42B72A",
                                        borderRadius: 6,
                                        padding: "4px 12px",
                                        color: "#fff",
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                        fontSize: 12,
                                        marginBottom: 8,
                                    }}
                                >
                                    <span
                                        style={{
                                            width: 6,
                                            height: 6,
                                            borderRadius: "50%",
                                            background: "#fff",
                                            display: "inline-block",
                                            animation: "pulse 2s infinite",
                                        }}
                                    />
                                    LIVE NOW
                                </span>
                                <p
                                    style={{
                                        color: "#fff",
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 700,
                                        fontSize: 18,
                                        margin: 0,
                                    }}
                                >
                                    CodeStorm 2025 Hackathon
                                </p>
                                <p
                                    style={{
                                        color: "rgba(255,255,255,0.8)",
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: 14,
                                        margin: "4px 0 0",
                                    }}
                                >
                                    48hr hackathon · 320 participants
                                </p>
                            </div>
                        </div>

                        {/* Floating stat card */}
                        <div
                            style={{
                                position: "absolute",
                                top: -20,
                                right: -20,
                                background: "#ffffff",
                                borderRadius: 14,
                                padding: "14px 18px",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                                minWidth: 140,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                }}
                            >
                                <div
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 10,
                                        background: "#E7F3FF",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Play
                                        size={18}
                                        color="#1877F2"
                                        fill="#1877F2"
                                    />
                                </div>
                                <div>
                                    <p
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 700,
                                            fontSize: 20,
                                            color: "#1C1E21",
                                            margin: 0,
                                            lineHeight: 1,
                                        }}
                                    >
                                        ₹2.5L
                                    </p>
                                    <p
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: 12,
                                            color: "#65676B",
                                            margin: "2px 0 0",
                                        }}
                                    >
                                        Prize Pool
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: -20,
                                left: -20,
                                background: "#ffffff",
                                borderRadius: 14,
                                padding: "14px 18px",
                                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                            }}
                        >
                            <p
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 700,
                                    fontSize: 20,
                                    color: "#42B72A",
                                    margin: 0,
                                    lineHeight: 1,
                                }}
                            >
                                48
                            </p>
                            <p
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 12,
                                    color: "#65676B",
                                    margin: "2px 0 0",
                                }}
                            >
                                Active Events
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .hero-image-col { display: none; }
          .hero-sec { grid-template-columns: 1fr !important; 
              
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
        </section>
    );
}
