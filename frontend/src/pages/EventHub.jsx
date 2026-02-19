import { Link, useParams } from "react-router-dom";
import FallBack404 from "./FallBack404";
import { useEffect, useRef, useState } from "react";
import Profile from "../components/Profile";
import CreateTeam from "../components/CreateTeam";
import RegisteredEvents from "../components/RegisteredEvents";
import CreateEvent from "../components/CreateEvent";
import MyEvents from "../components/MyEvents";

const EventHub = () => {
    let { tab } = useParams();
    const containerRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const updateArrows = () => {
        const el = containerRef.current;
        if (!el) return;

        // Check if content overflows
        const isOverflowing = el.scrollWidth > el.clientWidth;

        // Show arrows only if overflowing
        setShowRight(
            isOverflowing && el.scrollLeft + el.clientWidth < el.scrollWidth,
        );
        setShowLeft(isOverflowing && el.scrollLeft > 0);
    };

    const scroll = (direction) => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: direction === "left" ? -150 : 150,
                behavior: "smooth",
            });
        }
    };
    useEffect(() => {
        updateArrows();
        const el = containerRef.current;
        if (el) {
            el.addEventListener("scroll", updateArrows);
            window.addEventListener("resize", updateArrows);
        }
        return () => {
            if (el) el.removeEventListener("scroll", updateArrows);
            window.removeEventListener("resize", updateArrows);
        };
    }, []);

    if (
        tab !== "profile" &&
        tab !== "createTeam" &&
        tab !== "registeredEvents" &&
        tab !== "createEvent" &&
        tab !== "myEvents"
    ) {
        return <FallBack404 />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto min-h-screen max-w-7xl pt-8 max-sm:mt-4  p-2">
                {/* tabs to navigate   */}
                <div className="relative ">
                    {/* Left Arrow */}
                    {showLeft && (
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-0 bottom-0 z-10 rounded-tl-lg px-2 py-0.5 opacity-70  bg-linear-to-r from-gray-300 to-white text-2xl max-sm:text-sm"
                        >
                            &lt;&lt;
                        </button>
                    )}

                    {/* tabs container */}
                    <div
                        className="flex max-w-full border-b border-slate-300 gap-px overflow-x-auto tabs-container pt-1"
                        ref={containerRef}
                    >
                        {/* tab */}
                        <Link
                            to="/EventHub/profile"
                            className={`${tab === "profile" && "bg-slate-100 text-blue-600"} max-sm:text-sm max-sm:py-2   px-6 py-2.5 rounded-tl-xl rounded-tr-xl cursor-pointer hover:outline-1 hover:outline-slate-200  `}
                        >
                            Profile
                        </Link>
                        {/* tab */}
                        <Link
                            to="/EventHub/createTeam"
                            className={`${tab === "createTeam" && "bg-slate-100 text-blue-600"} max-sm:text-sm max-sm:py-2  px-6 py-2.5 rounded-tl-xl rounded-tr-xl cursor-pointer hover:outline hover:outline-slate-200 text-nowrap`}
                        >
                            Team Creations
                        </Link>

                        {/* tab */}
                        <Link
                            to="/EventHub/registeredEvents"
                            className={`${tab === "registeredEvents" && "bg-slate-100 text-blue-600"} max-sm:text-sm max-sm:py-2  px-6 py-2.5 rounded-tl-xl rounded-tr-xl cursor-pointer hover:outline hover:outline-slate-200 text-nowrap`}
                        >
                            Registered Events
                        </Link>

                        <Link
                            to="/EventHub/createEvent"
                            className={`${tab === "createEvent" && "bg-slate-100 text-blue-600"} max-sm:text-sm max-sm:py-2  px-6 py-2.5 rounded-tl-xl rounded-tr-xl cursor-pointer hover:outline hover:outline-slate-200 text-nowrap`}
                        >
                            Event Creations
                        </Link>
                        <Link
                            to="/EventHub/myEvents"
                            className={`${tab === "myEvents" && "bg-slate-100 text-blue-600"} max-sm:text-sm max-sm:py-2  px-6 py-2.5 rounded-tl-xl rounded-tr-xl cursor-pointer hover:outline hover:outline-slate-200 text-nowrap`}
                        >
                            My Events
                        </Link>
                    </div>

                    {/* Right Arrow */}
                    {showRight && (
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-0 bottom-0 z-10 opacity-70  bg-linear-to-l from-gray-300  to-white rounded-tr-lg px-2 text-2xl max-sm:text-sm"
                        >
                            &gt;&gt;
                        </button>
                    )}
                </div>

                {/* tab content */}
                <div>
                    {tab === "profile" && <Profile />}
                    {tab === "createTeam" && <CreateTeam />}
                    {tab === "registeredEvents" && <RegisteredEvents />}

                    {/* only for organizer */}
                    {tab === "createEvent" && <CreateEvent />}
                    {tab === "myEvents" && <MyEvents />}
                </div>
            </div>
        </div>
    );
};

export default EventHub;
