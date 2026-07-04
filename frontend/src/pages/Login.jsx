import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Mail, ShieldCheck, Zap } from "lucide-react";
import { SiFacebook, SiGithub } from "react-icons/si";
import { Link } from "react-router-dom";
import AuthCarousel from "../components/AuthCarousel";
import MetaData from "../components/MetaData";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

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
                    <AuthCarousel className="hidden lg:block" />

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
                                            className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-(--cit-text-muted) transition-colors hover:bg-(--cit-primary-soft) hover:text-(--cit-primary) cursor-pointer"
                                            aria-label={
                                                showPassword
                                                    ? "Hide password"
                                                    : "Show password"
                                            }
                                        >
                                            {showPassword ? (
                                                <Eye
                                                    size={16}
                                                    className="pointer-events-none"
                                                />
                                            ) : (
                                                <EyeOff
                                                    size={16}
                                                    className="pointer-events-none"
                                                />
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
