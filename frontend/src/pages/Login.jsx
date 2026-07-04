import { useEffect, useState } from "react";
import {
    ArrowRight,
    Eye,
    EyeOff,
    Mail,
    ShieldCheck,
    Sparkles,
    Zap,
} from "lucide-react";
import { SiFacebook, SiGithub } from "react-icons/si";
import { Link } from "react-router-dom";
import MetaData from "../components/MetaData";

import heroImage from "../assets/hero.png";

const carouselSlides = [
    {
        image: heroImage,
        title: "CIT Event Hub",
        description:
            "Discover hackathons, workshops, cultural nights, and student achievements.",
    },
    {
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=900&fit=crop&auto=format",
        title: "Build teams fast",
        description:
            "Find teammates and move from idea to execution without leaving the portal.",
    },
    {
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&h=900&fit=crop&auto=format",
        title: "Register in minutes",
        description:
            "Keep track of deadlines, categories, and participation details in one place.",
    },
    {
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=900&fit=crop&auto=format",
        title: "Compete for prizes",
        description:
            "Showcase skills, win prizes, and join the most active student events at CIT.",
    },
];

export default function Login() {
    const [slideIndex, setSlideIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setSlideIndex((current) => (current + 1) % carouselSlides.length);
        }, 3500);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <main className="min-h-screen overflow-hidden bg-linear-to-br from-(--cit-primary) via-[#0c5fcc] to-[#1a3a6b] text-white">
            <MetaData
                title="Login"
                description="Login to the CIT Events Portal to register, track events, and manage your participation."
                canonical="/login"
            />

            <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
                <div className="absolute -left-30 -top-30 h-65 w-65 rounded-full bg-white/6 blur-3xl" />
                <div className="absolute -bottom-20 -right-20 h-55 w-55 rounded-full bg-[#42b72a]/15 blur-3xl" />

                <div className="grid w-full items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
                    <section className="hidden lg:block">
                        <div className="relative overflow-hidden rounded-(--cit-radius-xl) border border-white/15 bg-white/10 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                            <div className="relative h-155 overflow-hidden rounded-[calc(var(--cit-radius-xl)-4px)] border border-white/10 bg-black/10">
                                <div
                                    className="flex h-full w-full transition-transform duration-700 ease-out"
                                    style={{
                                        transform: `translateX(-${slideIndex * 100}%)`,
                                    }}
                                >
                                    {carouselSlides.map((slide) => (
                                        <article
                                            key={slide.title}
                                            className="relative h-full w-full shrink-0"
                                        >
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="h-full w-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
                                            <div className="absolute inset-x-0 bottom-0 p-8">
                                                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/12 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
                                                    <Sparkles size={13} />
                                                    Campus spotlight
                                                </span>
                                                <h2 className="max-w-xl text-4xl font-extrabold tracking-[-0.04em] text-white">
                                                    {slide.title}
                                                </h2>
                                                <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">
                                                    {slide.description}
                                                </p>
                                            </div>
                                        </article>
                                    ))}
                                </div>

                                <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                                    <Zap size={16} fill="currentColor" />
                                    CIT Event Hub
                                </div>

                                <div className="absolute bottom-6 left-6 flex gap-2">
                                    {carouselSlides.map((slide, index) => (
                                        <button
                                            key={slide.title}
                                            type="button"
                                            onClick={() => setSlideIndex(index)}
                                            className={`h-2.5 rounded-full transition-all duration-200 ${
                                                index === slideIndex
                                                    ? "w-10 bg-white"
                                                    : "w-2.5 bg-white/40 hover:bg-white/60"
                                            }`}
                                            aria-label={`Show slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto w-full max-w-xl lg:max-w-none">
                        <div className="rounded-(--cit-radius-xl) border border-white/15 bg-(--cit-surface) p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10">
                            <div className="mb-8 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-(--cit-radius-md) bg-(--cit-primary-soft) text-(--cit-primary) shadow-(--cit-shadow-sm)">
                                    <Zap size={24} fill="currentColor" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--cit-text-muted)">
                                        CIT Events Portal
                                    </p>
                                    <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-(--cit-text)">
                                        Welcome back
                                    </h1>
                                </div>
                            </div>

                            <div className="mb-6 rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface-subtle) p-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--cit-primary-soft) text-(--cit-primary)">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-(--cit-text)">
                                            Secure campus access
                                        </p>
                                        <p className="mt-1 text-sm leading-6 text-(--cit-text-muted)">
                                            Sign in to register for events,
                                            track your participation, and manage
                                            your student profile.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <form className="space-y-4">
                                <label className="block space-y-2">
                                    <span className="text-sm font-semibold text-(--cit-text)">
                                        Email address
                                    </span>
                                    <div className="relative">
                                        <Mail
                                            size={16}
                                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-(--cit-text-muted)"
                                        />
                                        <input
                                            type="email"
                                            placeholder="you@cit.edu.in"
                                            className="w-full rounded-(--cit-radius-md) border border-(--cit-border) bg-white px-11 py-3.5 text-(--cit-text) outline-none transition-colors duration-150 placeholder:text-(--cit-text-muted) focus:border-(--cit-primary) focus:ring-2 focus:ring-(--cit-primary-soft)"
                                        />
                                    </div>
                                </label>

                                <label className="block space-y-2">
                                    <span className="text-sm font-semibold text-(--cit-text)">
                                        Password
                                    </span>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    (value) => !value,
                                                )
                                            }
                                            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-2 text-(--cit-text-muted) transition-colors hover:bg-(--cit-primary-soft) hover:text-(--cit-primary)"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff size={16} />
                                            ) : (
                                                <Eye size={16} />
                                            )}
                                        </button>
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter your password"
                                            className="w-full rounded-(--cit-radius-md) border border-(--cit-border) bg-white px-4 py-3.5 pr-12 text-(--cit-text) outline-none transition-colors duration-150 placeholder:text-(--cit-text-muted) focus:border-(--cit-primary) focus:ring-2 focus:ring-(--cit-primary-soft)"
                                        />
                                    </div>
                                </label>

                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <label className="flex items-center gap-2 text-(--cit-text-muted)">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-(--cit-border) text-(--cit-primary) focus:ring-(--cit-primary-soft)"
                                        />
                                        Remember me
                                    </label>
                                    <Link
                                        to="#"
                                        className="font-semibold text-(--cit-primary) transition-colors hover:text-(--cit-primary-hover)"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="group flex w-full items-center justify-center gap-2 rounded-(--cit-radius-md) bg-(--cit-primary) px-4 py-3.5 text-base font-bold text-white shadow-(--cit-shadow-sm) transition-all duration-150 hover:-translate-y-0.5 hover:bg-(--cit-primary-hover) hover:shadow-(--cit-shadow-md)"
                                >
                                    Log in
                                    <ArrowRight
                                        size={18}
                                        className="transition-transform duration-150 group-hover:translate-x-0.5"
                                    />
                                </button>
                            </form>

                            <div className="my-6 flex items-center gap-4">
                                <div className="h-px flex-1 bg-(--cit-border)" />
                                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-(--cit-text-muted)">
                                    Or continue with
                                </span>
                                <div className="h-px flex-1 bg-(--cit-border)" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 rounded-(--cit-radius-md) border border-(--cit-border) bg-white px-4 py-3 text-sm font-semibold text-(--cit-text) transition-colors hover:border-(--cit-primary) hover:bg-(--cit-primary-soft) hover:text-(--cit-primary)">
                                    <SiFacebook size={16} />
                                    Facebook
                                </button>
                                <button className="flex items-center justify-center gap-2 rounded-(--cit-radius-md) border border-(--cit-border) bg-white px-4 py-3 text-sm font-semibold text-(--cit-text) transition-colors hover:border-(--cit-primary) hover:bg-(--cit-primary-soft) hover:text-(--cit-primary)">
                                    <SiGithub size={16} />
                                    GitHub
                                </button>
                            </div>

                            <p className="mt-6 text-center text-sm text-(--cit-text-muted)">
                                New here?{" "}
                                <Link
                                    to="/events"
                                    className="font-semibold text-(--cit-primary) transition-colors hover:text-(--cit-primary-hover)"
                                >
                                    Browse events first
                                </Link>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
