import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    KeyRound,
    Mail,
    ShieldCheck,
    Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthCarousel from "../../components/AuthCarousel";
import MetaData from "../../components/MetaData";
import { DecorativeCircles } from "../../components/DecorativeCircles";

const steps = [
    {
        id: 1,
        title: "Email",
        description: "Confirm the account email tied to your profile.",
        fields: ["email"],
    },
    {
        id: 2,
        title: "OTP",
        description: "Enter the one-time code sent to your inbox.",
        fields: ["otp"],
    },
    {
        id: 3,
        title: "Password",
        description: "Choose a new password for your account.",
        fields: ["newPassword", "confirmPassword"],
    },
];

const fieldBaseClass =
    "w-full rounded-(--cit-radius-md) border px-4 py-3 sm:py-3.5 text-sm sm:text-base text-(--cit-text) outline-none transition-colors duration-150 placeholder:text-(--cit-text-muted) focus:ring-2";

const fieldErrorClass =
    "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-200";

const fieldDefaultClass =
    "border-(--cit-border) bg-white focus:border-(--cit-primary) focus:ring-(--cit-primary-soft)";

function getFieldClass(hasError) {
    return `${fieldBaseClass} ${hasError ? fieldErrorClass : fieldDefaultClass}`;
}

function StepBadge({ step, currentStep }) {
    const isCompleted = step < currentStep;
    const isActive = step === currentStep;

    return (
        <div
            className={`flex min-w-0 flex-1 items-center gap-3 rounded-(--cit-radius-lg) border px-3 py-3 transition-colors ${isActive ? "border-(--cit-primary) bg-(--cit-primary-soft)" : isCompleted ? "border-emerald-200 bg-emerald-50" : "border-(--cit-border) bg-(--cit-surface-subtle)"}`}
        >
            <div
                className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-bold ${isActive ? "bg-(--cit-primary) text-white" : isCompleted ? "bg-emerald-500 text-white" : "bg-white text-(--cit-text-muted)"}`}
            >
                {isCompleted ? (
                    <CheckCircle2
                        size={18}
                        className="h-4 w-4 sm:h-4.5 sm:w-4.5"
                    />
                ) : (
                    step
                )}
            </div>
            <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-(--cit-text)">{`Step ${step}`}</p>
                <p className="truncate text-[10px] sm:text-xs text-(--cit-text-muted)">
                    {step === 1
                        ? "Email"
                        : step === 2
                          ? "Verify OTP"
                          : "Change password"}
                </p>
            </div>
        </div>
    );
}

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const otpRefs = useRef([]);

    const {
        register,
        trigger,
        handleSubmit,
        getValues,
        setValue,
        watch,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            otp: "",
            newPassword: "",
            confirmPassword: "",
        },
        shouldUnregister: false,
        mode: "onTouched",
    });

    const activeStep = steps[currentStep - 1];

    const moveToNextStep = async () => {
        const isStepValid = await trigger(activeStep.fields);

        if (isStepValid) {
            setCurrentStep((value) => Math.min(value + 1, steps.length));
        }
    };

    const moveToPreviousStep = () => {
        setCurrentStep((value) => Math.max(value - 1, 1));
    };

    const otpValue = watch("otp") || "";

    const handleOtpChange = (index, e) => {
        const value = e.target.value;
        if (/[^0-9]/.test(value) && value !== "") return;

        let currentOtp = otpValue.split("");
        while (currentOtp.length < 6) currentOtp.push("");

        const char = value.slice(-1);
        currentOtp[index] = char;
        const newOtp = currentOtp.join("").slice(0, 6);
        setValue("otp", newOtp, { shouldValidate: newOtp.length === 6 });

        if (errors.otp && newOtp.length < 6) {
            clearErrors("otp");
        }

        if (char && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otpValue[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData
            .getData("text")
            .replace(/[^0-9]/g, "")
            .slice(0, 6);
        if (pastedData) {
            setValue("otp", pastedData, {
                shouldValidate: pastedData.length === 6,
            });
            if (errors.otp && pastedData.length < 6) {
                clearErrors("otp");
            }
            const nextIndex = Math.min(pastedData.length, 5);
            otpRefs.current[nextIndex]?.focus();
        }
    };

    const onSubmit = (data) => {
        if (currentStep === 3) {
            toast.success("Password successfully changed!");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-(--cit-primary) via-[#0c5fcc] to-[#1a3a6b] text-white">
            <DecorativeCircles />
            <MetaData
                title="Forgot Password"
                description="Reset your CIT Events Portal password in a guided three-step flow."
                canonical="/forgot-password"
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
                                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-(--cit-text-muted)">
                                        CIT Events Portal
                                    </p>
                                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.04em] text-(--cit-text)">
                                        Reset password
                                    </h1>
                                </div>
                            </div>

                            <div className="mb-6 rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface-subtle) p-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--cit-primary-soft) text-(--cit-primary)">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm sm:text-base font-semibold text-(--cit-text)">
                                            Secure password recovery
                                        </p>
                                        <p className="mt-1 text-xs sm:text-sm leading-relaxed sm:leading-6 text-(--cit-text-muted)">
                                            Verify your email, confirm the OTP,
                                            and set a new password without
                                            leaving this flow.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5 grid gap-3 sm:grid-cols-3">
                                {steps.map((step) => (
                                    <StepBadge
                                        key={step.id}
                                        step={step.id}
                                        currentStep={currentStep}
                                    />
                                ))}
                            </div>

                            <div className="mb-6 rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface-subtle) p-4">
                                <p className="text-sm sm:text-base font-semibold text-(--cit-text)">
                                    {activeStep.title}
                                </p>
                                <p className="mt-1 text-xs sm:text-sm leading-relaxed sm:leading-6 text-(--cit-text-muted)">
                                    {activeStep.description}
                                </p>
                            </div>

                            <form
                                className="space-y-4"
                                onSubmit={(e) => {
                                    if (currentStep < steps.length) {
                                        e.preventDefault();
                                        moveToNextStep();
                                    } else {
                                        handleSubmit(onSubmit)(e);
                                    }
                                }}
                            >
                                {currentStep === 1 ? (
                                    <label className="block space-y-1">
                                        <span className="text-xs sm:text-sm font-semibold text-(--cit-text)">
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
                                                aria-invalid={
                                                    errors.email
                                                        ? "true"
                                                        : "false"
                                                }
                                                className={`${getFieldClass(Boolean(errors.email))} px-11`}
                                                {...register("email", {
                                                    required:
                                                        "Email is required.",
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message:
                                                            "Enter a valid email address.",
                                                    },
                                                })}
                                            />
                                        </div>
                                        {errors.email ? (
                                            <p className="mt-0 text-xs font-medium text-red-600">
                                                {errors.email.message}
                                            </p>
                                        ) : null}
                                    </label>
                                ) : null}

                                {currentStep === 2 ? (
                                    <>
                                        <div className="w-full overflow-hidden rounded-(--cit-radius-lg) border border-(--cit-border) bg-white px-4 py-3">
                                            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-(--cit-text-muted)">
                                                Verification email
                                            </p>
                                            <p className="mt-1 break-all text-xs sm:text-sm font-semibold text-(--cit-text)">
                                                {getValues("email")}
                                            </p>
                                        </div>

                                        <div className="block space-y-2">
                                            <span className="text-xs sm:text-sm font-semibold text-(--cit-text)">
                                                OTP code
                                            </span>
                                            <div className="flex w-full gap-1.5 sm:gap-2 justify-between">
                                                {Array.from({ length: 6 }).map(
                                                    (_, i) => (
                                                        <input
                                                            key={i}
                                                            ref={(el) =>
                                                                (otpRefs.current[
                                                                    i
                                                                ] = el)
                                                            }
                                                            type="text"
                                                            inputMode="numeric"
                                                            maxLength={2}
                                                            value={
                                                                otpValue[i] ||
                                                                ""
                                                            }
                                                            onChange={(e) =>
                                                                handleOtpChange(
                                                                    i,
                                                                    e,
                                                                )
                                                            }
                                                            onKeyDown={(e) =>
                                                                handleOtpKeyDown(
                                                                    i,
                                                                    e,
                                                                )
                                                            }
                                                            onPaste={
                                                                handleOtpPaste
                                                            }
                                                            className={`w-full min-w-0 flex-1 px-1 h-12 sm:h-14 text-center text-lg sm:text-xl font-bold rounded-(--cit-radius-md) border ${errors.otp ? "border-red-300 bg-red-50 text-red-900 focus:border-red-400 focus:ring-red-200" : "border-(--cit-border) bg-white text-(--cit-text) focus:border-(--cit-primary) focus:ring-(--cit-primary-soft)"} outline-none transition-colors focus:ring-2`}
                                                        />
                                                    ),
                                                )}
                                            </div>
                                            {/* Hidden input to maintain react-hook-form validation */}
                                            <input
                                                type="hidden"
                                                {...register("otp", {
                                                    required:
                                                        "OTP is required.",
                                                    pattern: {
                                                        value: /^\d{6}$/,
                                                        message:
                                                            "Enter the 6-digit OTP.",
                                                    },
                                                })}
                                            />
                                            {errors.otp ? (
                                                <p className="mt-1 text-xs font-medium text-red-600">
                                                    {errors.otp.message}
                                                </p>
                                            ) : null}
                                        </div>
                                    </>
                                ) : null}

                                {currentStep === 3 ? (
                                    <>
                                        <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-white px-4 py-3">
                                            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-(--cit-text-muted)">
                                                Verified email
                                            </p>
                                            <p className="mt-1 break-all text-xs sm:text-sm font-semibold text-(--cit-text)">
                                                {getValues("email")}
                                            </p>
                                        </div>

                                        <label className="block space-y-1">
                                            <span className="text-xs sm:text-sm font-semibold text-(--cit-text)">
                                                New password
                                            </span>
                                            <input
                                                type="password"
                                                placeholder="Create a new password"
                                                aria-invalid={
                                                    errors.newPassword
                                                        ? "true"
                                                        : "false"
                                                }
                                                className={getFieldClass(
                                                    Boolean(errors.newPassword),
                                                )}
                                                {...register("newPassword", {
                                                    required:
                                                        "New password is required.",
                                                    minLength: {
                                                        value: 6,
                                                        message:
                                                            "Password must be at least 6 characters.",
                                                    },
                                                })}
                                            />
                                            {errors.newPassword ? (
                                                <p className="mt-0 text-xs font-medium text-red-600">
                                                    {errors.newPassword.message}
                                                </p>
                                            ) : null}
                                        </label>

                                        <label className="block space-y-1">
                                            <span className="text-xs sm:text-sm font-semibold text-(--cit-text)">
                                                Confirm password
                                            </span>
                                            <input
                                                type="password"
                                                placeholder="Repeat the new password"
                                                aria-invalid={
                                                    errors.confirmPassword
                                                        ? "true"
                                                        : "false"
                                                }
                                                className={getFieldClass(
                                                    Boolean(
                                                        errors.confirmPassword,
                                                    ),
                                                )}
                                                {...register(
                                                    "confirmPassword",
                                                    {
                                                        required:
                                                            "Please confirm your password.",
                                                        validate: (value) =>
                                                            value ===
                                                                getValues(
                                                                    "newPassword",
                                                                ) ||
                                                            "Passwords do not match.",
                                                    },
                                                )}
                                            />
                                            {errors.confirmPassword ? (
                                                <p className="mt-0 text-xs font-medium text-red-600">
                                                    {
                                                        errors.confirmPassword
                                                            .message
                                                    }
                                                </p>
                                            ) : null}
                                        </label>
                                    </>
                                ) : null}

                                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                                    <button
                                        type="button"
                                        onClick={moveToPreviousStep}
                                        disabled={currentStep === 1}
                                        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-(--cit-radius-md) border border-(--cit-border) bg-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-(--cit-text) transition-colors hover:border-(--cit-primary) hover:bg-(--cit-primary-soft) hover:text-(--cit-primary) disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <ArrowLeft size={16} />
                                        Back
                                    </button>

                                    {currentStep < steps.length ? (
                                        <button
                                            key="next-btn"
                                            type="button"
                                            onClick={moveToNextStep}
                                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-(--cit-radius-md) bg-(--cit-primary) px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-(--cit-shadow-sm) transition-all duration-150 hover:-translate-y-0.5 hover:bg-(--cit-primary-hover) hover:shadow-(--cit-shadow-md)"
                                        >
                                            {currentStep === 1
                                                ? "Send OTP"
                                                : "Verify OTP"}
                                            <ArrowRight size={16} />
                                        </button>
                                    ) : (
                                        <button
                                            key="submit-btn"
                                            type="submit"
                                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-(--cit-radius-md) bg-(--cit-primary) px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-(--cit-shadow-sm) transition-all duration-150 hover:-translate-y-0.5 hover:bg-(--cit-primary-hover) hover:shadow-(--cit-shadow-md)"
                                        >
                                            Change password
                                            <ArrowRight size={16} />
                                        </button>
                                    )}
                                </div>
                            </form>

                            <p className="mt-6 text-center text-xs sm:text-sm text-(--cit-text-muted)">
                                Remembered your password?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-(--cit-primary) transition-colors hover:text-(--cit-primary-hover)"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
