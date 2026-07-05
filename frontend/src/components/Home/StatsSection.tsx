import { useEffect, useRef, useState } from "react";
import { Calendar, Users, UsersRound, Trophy } from "lucide-react";

const stats = [
    {
        icon: Calendar,
        label: "Total Events",
        value: 120,
        suffix: "+",
        color: "#1877F2",
        bg: "#E7F3FF",
    },
    {
        icon: Users,
        label: "Total Participants",
        value: 8000,
        suffix: "+",
        color: "#9B51E0",
        bg: "#F3E8FF",
    },
    {
        icon: UsersRound,
        label: "Total Teams",
        value: 1200,
        suffix: "+",
        color: "#F7B928",
        bg: "#FEF9E7",
    },
    {
        icon: Trophy,
        label: "Total Prize Pool",
        value: 15,
        prefix: "₹",
        suffix: "L+",
        color: "#42B72A",
        bg: "#E6F9E3",
    },
];

function useCountUp(
    target: number,
    duration: number = 1800,
    start: boolean = false,
) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);
    return count;
}

function StatCard({
    icon: Icon,
    label,
    value,
    suffix,
    prefix,
    color,
    bg,
}: any) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const count = useCountUp(value, 1600, visible);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.3 },
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: "28px 24px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid #DADDE1",
                display: "flex",
                alignItems: "center",
                gap: 18,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "default",
            }}
            className=" max-sm:px-4! max-sm:py-4!  "
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 12px 32px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 2px 12px rgba(0,0,0,0.06)";
            }}
        >
            <div
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <Icon size={26} color={color} />
            </div>
            <div>
                <p
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 800,
                        fontSize: 32,
                        color: "#1C1E21",
                        margin: 0,
                        lineHeight: 1.1,
                    }}
                    className="max-sm:text-[26px]!"
                >
                    {prefix}
                    {count.toLocaleString()}
                    {suffix}
                </p>
                <p
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: 14,
                        color: "#65676B",
                        margin: "4px 0 0",
                    }}
                    className="max-sm:text-[12px]!"
                >
                    {label}
                </p>
            </div>
        </div>
    );
}

export function StatsSection() {
    return (
        <section style={{ background: "#F0F2F5", padding: "56px 24px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div
                    style={{
                        gap: 20,
                    }}
                    className="stats-grid  grid grid-cols-[repeat(4,1fr)] max-lg:grid-cols-[repeat(2,1fr)] "
                >
                    {stats.map((stat) => (
                        <StatCard key={stat.label} {...stat} />
                    ))}
                </div>
            </div>
            <style>{`
         @media (max-width: 500px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
        
      `}</style>
        </section>
    );
}
