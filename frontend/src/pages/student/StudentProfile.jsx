import { useEffect, useRef, useState } from "react";
import {
    AlertCircle,
    Building2,
    Camera,
    CheckCircle2,
    Mail,
    Phone,
    Save,
    UserRound,
    X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";

const departments = [
    "Artificial Intelligence and Data Science",
    "Artificial Intelligence and Machine Learning",
    "Computer Science and Engineering",
    "Information Technology",
    "Electronics and Communication Engineering",
    "Electrical and Electronics Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Automobile Engineering",
    "Biomedical Engineering",
    "Mechatronics Engineering",
    "Cyber Security",
    "Computer Science with Business Systems",
];

export default function StudentProfile() {
    const { user, setUser } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
    const fileInputRef = useRef(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            department: user?.department || "",
        },
    });

    const isProfileComplete = Boolean(user?.profileSetupCompleted);

    useEffect(() => {
        reset({
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            department: user?.department || "",
        });
        setAvatarPreview(user?.avatar || null);
    }, [user, reset]);

    const displayName = user?.name || user?.email?.split("@")[0] || "Student";
    const initials = displayName
        .split(" ")
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleCancel = () => {
        reset({
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            department: user?.department || "",
        });
        setAvatarPreview(user?.avatar || null);
        setIsEditing(false);
    };

    const onSubmit = (data) => {
        setUser((currentUser) => ({
            ...currentUser,
            ...data,
            avatar: avatarPreview || currentUser?.avatar || null,
            profileSetupCompleted: true,
        }));
        setIsEditing(false);
    };

    return (
        <main className="min-h-screen bg-(--cit-bg) px-6 py-8 md:px-8 lg:px-10">
            <div className="mx-auto flex max-w-300 flex-col gap-6">
                {!isProfileComplete && (
                    <div className="rounded-(--cit-radius-xl) border border-amber-200 bg-amber-50 p-5 shadow-(--cit-shadow-sm)">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 rounded-full bg-amber-100 p-2 text-amber-600">
                                    <AlertCircle size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-amber-800">
                                        Complete your profile setup
                                    </p>
                                    <p className="mt-1 text-sm text-amber-700">
                                        Add your phone number and department so
                                        your profile is ready for campus events
                                        and team activities.
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="cursor-pointer inline-flex items-center justify-center rounded-(--cit-radius-md) bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600"
                            >
                                Update Profile
                            </button>
                        </div>
                    </div>
                )}

                <section className="overflow-hidden rounded-(--cit-radius-xl) border border-(--cit-border) bg-(--cit-surface) shadow-(--cit-shadow-sm)">
                    <div className="bg-linear-to-r from-[#0f172a] via-(--cit-primary) to-[#7c3aed] px-6 py-8 text-white md:px-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white/80 bg-white/20 text-2xl font-extrabold shadow-(--cit-shadow-md)">
                                    {avatarPreview ? (
                                        <img
                                            src={avatarPreview}
                                            alt={displayName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        initials
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
                                            Student Profile
                                        </p>
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${isProfileComplete ? "bg-emerald-500/20 text-emerald-100" : "bg-amber-400/20 text-amber-100"}`}
                                        >
                                            {isProfileComplete
                                                ? "Profile ready"
                                                : "Setup pending"}
                                        </span>
                                    </div>
                                    <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
                                        {displayName}
                                    </h1>
                                    <p className="mt-1 text-sm text-white/80">
                                        {user?.email || "No email provided"}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsEditing((prev) => !prev)}
                                className="cursor-pointer inline-flex items-center justify-center rounded-(--cit-radius-md) border border-white/30 bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
                            >
                                {isEditing ? "Cancel" : "Update Profile"}
                            </button>
                        </div>
                    </div>

                    <div className="px-6 py-7 md:px-8">
                        {!isEditing ? (
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface-subtle) p-4">
                                    <div className="flex items-center gap-2 text-(--cit-text-muted)">
                                        <UserRound size={16} />
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                                            Full Name
                                        </p>
                                    </div>
                                    <p className="mt-2 text-base font-semibold text-(--cit-text)">
                                        {user?.name || "Not provided"}
                                    </p>
                                </div>
                                <div className="rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface-subtle) p-4">
                                    <div className="flex items-center gap-2 text-(--cit-text-muted)">
                                        <Mail size={16} />
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                                            Email
                                        </p>
                                    </div>
                                    <p className="mt-2 text-base font-semibold text-(--cit-text)">
                                        {user?.email || "Not provided"}
                                    </p>
                                </div>
                                <div className="rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface-subtle) p-4">
                                    <div className="flex items-center gap-2 text-(--cit-text-muted)">
                                        <Phone size={16} />
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                                            Phone Number
                                        </p>
                                    </div>
                                    <p className="mt-2 text-base font-semibold text-(--cit-text)">
                                        {user?.phone || "Not provided"}
                                    </p>
                                </div>
                                <div className="rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface-subtle) p-4">
                                    <div className="flex items-center gap-2 text-(--cit-text-muted)">
                                        <Building2 size={16} />
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                                            Department
                                        </p>
                                    </div>
                                    <p className="mt-2 text-base font-semibold text-(--cit-text)">
                                        {user?.department || "Not provided"}
                                    </p>
                                </div>
                                <div className="rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface-subtle) p-4 md:col-span-2">
                                    <div className="flex items-center gap-2 text-(--cit-text-muted)">
                                        <CheckCircle2 size={16} />
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                                            Profile Status
                                        </p>
                                    </div>
                                    <p className="mt-2 text-base font-semibold text-(--cit-text)">
                                        {isProfileComplete
                                            ? "Your profile is complete and ready for campus engagement."
                                            : "Your profile setup is still pending."}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                <div className="flex flex-col gap-4 rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface-subtle) p-5 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-(--cit-text)">
                                            Profile photo
                                        </p>
                                        <p className="mt-1 text-sm text-(--cit-text-muted)">
                                            Upload a square image for a sharper
                                            profile preview.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            className="inline-flex items-center gap-2 rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface) px-4 py-2 text-sm font-semibold text-(--cit-text) transition hover:bg-(--cit-primary-soft)"
                                        >
                                            <Camera size={16} />
                                            Upload Photo
                                        </button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-(--cit-text)">
                                            Full name
                                        </label>
                                        <input
                                            {...register("name", {
                                                required: "Name is required",
                                                minLength: {
                                                    value: 2,
                                                    message:
                                                        "Name must be at least 2 characters",
                                                },
                                            })}
                                            className="w-full rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface) px-4 py-3 text-sm text-(--cit-text) outline-none transition focus:border-(--cit-primary) focus:ring-2 focus:ring-(--cit-primary-soft)"
                                            placeholder="Enter your name"
                                        />
                                        {errors.name && (
                                            <p className="mt-2 text-sm text-(--cit-danger)">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-(--cit-text)">
                                            Email
                                        </label>
                                        <input
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message:
                                                        "Enter a valid email address",
                                                },
                                            })}
                                            className="w-full rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface) px-4 py-3 text-sm text-(--cit-text) outline-none transition focus:border-(--cit-primary) focus:ring-2 focus:ring-(--cit-primary-soft)"
                                            placeholder="Enter your email"
                                        />
                                        {errors.email && (
                                            <p className="mt-2 text-sm text-(--cit-danger)">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-(--cit-text)">
                                            Phone number
                                        </label>
                                        <input
                                            {...register("phone", {
                                                required:
                                                    "Phone number is required",
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message:
                                                        "Enter a valid 10-digit phone number",
                                                },
                                            })}
                                            className="w-full rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface) px-4 py-3 text-sm text-(--cit-text) outline-none transition focus:border-(--cit-primary) focus:ring-2 focus:ring-(--cit-primary-soft)"
                                            placeholder="Enter your phone number"
                                        />
                                        {errors.phone && (
                                            <p className="mt-2 text-sm text-(--cit-danger)">
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-(--cit-text)">
                                            Department
                                        </label>
                                        <select
                                            {...register("department", {
                                                required:
                                                    "Please select your department",
                                            })}
                                            className="w-full rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface) px-4 py-3 text-sm text-(--cit-text) outline-none transition focus:border-(--cit-primary) focus:ring-2 focus:ring-(--cit-primary-soft)"
                                        >
                                            <option value="">
                                                Select department
                                            </option>
                                            {departments.map((department) => (
                                                <option
                                                    key={department}
                                                    value={department}
                                                >
                                                    {department}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.department && (
                                            <p className="mt-2 text-sm text-(--cit-danger)">
                                                {errors.department.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-end gap-3 border-t border-(--cit-border) pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="inline-flex items-center gap-2 rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface) px-4 py-2 text-sm font-semibold text-(--cit-text) transition hover:bg-(--cit-surface-subtle)"
                                    >
                                        <X size={16} />
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-2 rounded-(--cit-radius-md) bg-(--cit-primary) px-4 py-2 text-sm font-semibold text-white transition hover:bg-(--cit-primary-hover)"
                                    >
                                        <Save size={16} />
                                        Save Profile
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
