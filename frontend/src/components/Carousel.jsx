import { useEffect, useState } from "react";

const images = [
    "https://www.citchennai.edu.in/wp-content/uploads/2026/01/07-Jan-VISA-Hackathon.jpg",
    "https://www.citchennai.edu.in/wp-content/uploads/2026/01/07-Jan-VISA-Hackathon.jpg",
    "https://www.citchennai.edu.in/wp-content/uploads/2026/01/07-Jan-VISA-Hackathon.jpg",
];

export default function Carousel() {
    const [current, setCurrent] = useState(0);

    // Auto-swipe every 3s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-lg:hidden relative w-full  h-full max-w-xl overflow-hidden flex-1">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
            >
                {images.map((src, idx) => (
                    <img
                        key={idx}
                        src={src}
                        alt={`Slide ${idx}`}
                        className="w-full h-full object-fill shrink-0  select-none pointer-events-none"
                    />
                ))}
            </div>

            {/* Dots for navigation */}
            <div className="absolute bottom-3  left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-2 h-2 rounded-full cursor-pointer ${
                            current === idx
                                ? "bg-[#ffffff83]"
                                : "bg-[rgba(86,86,86,0.52)]"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
