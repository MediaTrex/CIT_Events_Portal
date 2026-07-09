import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { initialTeams } from "../../data/teams";
import { ChevronDown, ChevronUp, Plus, Trash2, Check, X } from "lucide-react";

// Helper functions
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const getTeamMemberCount = (team) => {
    return team.members.length;
};

const isTeamFull = (team) => {
    return getTeamMemberCount(team) >= 6;
};

export default function StudentMyTeams() {
    const { user } = useAuthContext();
    const [teams, setTeams] = useState(initialTeams);
    const [expandedTeamId, setExpandedTeamId] = useState(null);
    const [formData, setFormData] = useState({
        teamName: "",
        teammates: [""],
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Get user's teams
    const userTeams = teams.filter((team) =>
        team.members.some((member) => member.id === user.id),
    );

    // Handle team name change
    const handleTeamNameChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            teamName: e.target.value,
        }));
        setErrors((prev) => ({ ...prev, teamName: "" }));
    };

    // Handle teammate email change
    const handleTeammateChange = (index, value) => {
        const newTeammates = [...formData.teammates];
        newTeammates[index] = value;
        setFormData((prev) => ({
            ...prev,
            teammates: newTeammates,
        }));
        setErrors((prev) => ({
            ...prev,
            [`teammate_${index}`]: "",
        }));
    };

    // Add another teammate field
    const addTeammateField = () => {
        if (formData.teammates.length < 5) {
            setFormData((prev) => ({
                ...prev,
                teammates: [...prev.teammates, ""],
            }));
        }
    };

    // Remove teammate field
    const removeTeammateField = (index) => {
        if (formData.teammates.length > 1) {
            setFormData((prev) => ({
                ...prev,
                teammates: prev.teammates.filter((_, i) => i !== index),
            }));
        }
    };

    // Validate and create team
    const handleCreateTeam = (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validate team name
        if (!formData.teamName.trim()) {
            newErrors.teamName = "Team name is required";
        } else if (formData.teamName.trim().length < 2) {
            newErrors.teamName = "Team name must be at least 2 characters";
        }

        // Validate teammates
        const validMembers = [
            {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        ];
        let hasTeammateErrors = false;

        formData.teammates.forEach((email, index) => {
            if (email.trim()) {
                if (!isValidEmail(email)) {
                    newErrors[`teammate_${index}`] = "Invalid email format";
                    hasTeammateErrors = true;
                } else {
                    validMembers.push({
                        id: `tm-${Date.now()}-${index}`,
                        email: email.trim(),
                        name: email.split("@")[0],
                    });
                }
            }
        });

        // Check if total members exceeds 6
        if (validMembers.length > 6) {
            newErrors.teammates =
                "Maximum 5 teammates allowed (6 members total including leader)";
            hasTeammateErrors = true;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Create team
        setLoading(true);
        try {
            const newTeam = {
                id: `team-${Date.now()}`,
                name: formData.teamName.trim(),
                leaderId: user.id,
                members: validMembers,
                createdAt: new Date().toISOString(),
                status: "active",
            };

            setTeams((prev) => [...prev, newTeam]);
            setFormData({
                teamName: "",
                teammates: [""],
            });
            setErrors({});
            setSuccessMessage("Team created successfully!");

            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (error) {
            setErrors({ form: "Failed to create team. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    // Delete team
    const handleDeleteTeam = (teamId) => {
        if (window.confirm("Are you sure you want to delete this team?")) {
            setTeams((prev) => prev.filter((team) => team.id !== teamId));
        }
    };

    return (
        <main className="min-h-screen bg-(--cit-bg)">
            <div className="mx-auto max-w-300">
                {/* Header */}
                <div className="mb-8">
                   
                    <p className="mt-2 text-sm text-(--cit-text-muted) md:text-base">
                        Create teams for events or join existing ones
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left: Create Team Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) p-6 shadow-(--cit-shadow-sm)">
                            <h2 className="flex items-center gap-2 text-xl font-bold text-(--cit-text) mb-6">
                                <Plus size={20} />
                                Create Team
                            </h2>

                            {/* Success Message */}
                            {successMessage && (
                                <div className="mb-4 flex items-center gap-2 rounded-(--cit-radius-md) bg-(--cit-success) bg-opacity-10 p-3 text-(--cit-success)">
                                    <Check size={18} />
                                    <span className="text-sm font-medium">
                                        {successMessage}
                                    </span>
                                </div>
                            )}

                            {/* Error Message */}
                            {errors.form && (
                                <div className="mb-4 flex items-center gap-2 rounded-(--cit-radius-md) bg-(--cit-danger) bg-opacity-10 p-3 text-(--cit-danger)">
                                    <X size={18} />
                                    <span className="text-sm font-medium">
                                        {errors.form}
                                    </span>
                                </div>
                            )}

                            <form
                                onSubmit={handleCreateTeam}
                                className="space-y-4"
                            >
                                {/* Team Name */}
                                <div>
                                    <label className="block text-sm font-medium text-(--cit-text) mb-2">
                                        Team Name{" "}
                                        <span className="text-(--cit-danger)">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.teamName}
                                        onChange={handleTeamNameChange}
                                        placeholder="Enter team name"
                                        className="w-full rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface-subtle) px-4 py-2.5 text-sm text-(--cit-text) placeholder-text-(--cit-text-muted) transition-all focus:border-(--cit-primary) focus:outline-none focus:ring-2 focus:ring-(--cit-primary) focus:ring-opacity-10"
                                    />
                                    {errors.teamName && (
                                        <p className="mt-1 text-xs text-(--cit-danger)">
                                            {errors.teamName}
                                        </p>
                                    )}
                                </div>

                                {/* Teammates */}
                                <div>
                                    <label className="block text-sm font-medium text-(--cit-text) mb-2">
                                        Teammates{" "}
                                        <span className="text-xs text-(--cit-text-muted)">
                                            (Max 5)
                                        </span>
                                    </label>
                                    {errors.teammates && (
                                        <p className="mb-2 text-xs text-(--cit-danger)">
                                            {errors.teammates}
                                        </p>
                                    )}

                                    {formData.teammates.map((email, index) => (
                                        <div
                                            key={index}
                                            className="mb-3 flex gap-2"
                                        >
                                            <div className="flex-1">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        handleTeammateChange(
                                                            index,
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder={`Teammate ${index + 1} email`}
                                                    className="w-full rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface-subtle) px-4 py-2 text-sm text-(--cit-text) placeholder-text-(--cit-text-muted) transition-all focus:border-(--cit-primary) focus:outline-none focus:ring-2 focus:ring-(--cit-primary) focus:ring-opacity-10"
                                                />
                                                {errors[
                                                    `teammate_${index}`
                                                ] && (
                                                    <p className="mt-1 text-xs text-(--cit-danger)">
                                                        {
                                                            errors[
                                                                `teammate_${index}`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {formData.teammates.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeTeammateField(
                                                            index,
                                                        )
                                                    }
                                                    className="rounded-(--cit-radius-md) border border-(--cit-border) bg-(--cit-surface-subtle) p-2 text-(--cit-text-muted) transition-colors hover:bg-(--cit-danger) hover:text-white"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Add More Teammate Button */}
                                {formData.teammates.length < 5 && (
                                    <button
                                        type="button"
                                        onClick={addTeammateField}
                                        className="w-full flex items-center justify-center gap-2 rounded-(--cit-radius-md) border-2 border-dashed border-(--cit-border) bg-(--cit-surface-subtle) py-2.5 text-sm font-medium text-(--cit-primary) transition-all hover:border-(--cit-primary) hover:bg-(--cit-primary-soft)"
                                    >
                                        <Plus size={16} />
                                        Add Teammate
                                    </button>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-(--cit-radius-md) bg-(--cit-primary) py-2.5 font-medium text-white transition-all hover:bg-(--cit-primary-hover) disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Creating..." : "Create Team"}
                                </button>

                                {/* Info Text */}
                                <p className="text-xs text-(--cit-text-muted) text-center">
                                    You will be the team leader. Max 6 members
                                    total (including you).
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Right: Teams List */}
                    <div className="lg:col-span-2">
                        <div className="rounded-(--cit-radius-lg) border border-(--cit-border) bg-(--cit-surface) shadow-(--cit-shadow-sm) overflow-hidden">
                            {userTeams.length === 0 ? (
                                <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--cit-surface-subtle)">
                                        <Plus
                                            size={24}
                                            className="text-(--cit-text-muted)"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-(--cit-text)">
                                        No teams yet
                                    </h3>
                                    <p className="mt-2 text-sm text-(--cit-text-muted) max-w-xs">
                                        Create a new team on the left to get
                                        started
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide--(--cit-border)">
                                    {userTeams.map((team) => (
                                        <div
                                            key={team.id}
                                            className="transition-colors hover:bg-(--cit-surface-subtle)"
                                        >
                                            {/* Team Row */}
                                            <div
                                                onClick={() =>
                                                    setExpandedTeamId(
                                                        expandedTeamId ===
                                                            team.id
                                                            ? null
                                                            : team.id,
                                                    )
                                                }
                                                className="flex items-center justify-between gap-4 cursor-pointer px-6 py-4"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-(--cit-text) truncate">
                                                                {team.name}
                                                            </h3>
                                                            <p className="text-xs text-(--cit-text-muted) mt-1">
                                                                {team.leaderId ===
                                                                user.id
                                                                    ? "Leader"
                                                                    : "Member"}{" "}
                                                                •{" "}
                                                                {getTeamMemberCount(
                                                                    team,
                                                                )}{" "}
                                                                members
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-2">
                                                    {team.leaderId ===
                                                        user.id && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDeleteTeam(
                                                                    team.id,
                                                                );
                                                            }}
                                                            className="rounded-(--cit-radius-md) p-2 text-(--cit-text-muted) transition-colors hover:bg-(--cit-danger) hover:text-white"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    )}
                                                    <div className="text-(--cit-text-muted)">
                                                        {expandedTeamId ===
                                                        team.id ? (
                                                            <ChevronUp
                                                                size={20}
                                                            />
                                                        ) : (
                                                            <ChevronDown
                                                                size={20}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expanded Content */}
                                            {expandedTeamId === team.id && (
                                                <div className="border-t border-(--cit-border) bg-(--cit-surface-subtle) px-6 py-4">
                                                    <h4 className="mb-4 font-semibold text-(--cit-text)">
                                                        Team Members
                                                    </h4>

                                                    {/* Team Members List */}
                                                    <div className="space-y-3">
                                                        {team.members.map(
                                                            (member, idx) => {
                                                                const isLeader =
                                                                    member.id ===
                                                                    team.leaderId;
                                                                return (
                                                                    <div
                                                                        key={
                                                                            member.id
                                                                        }
                                                                        className="flex items-center gap-3 rounded-(--cit-radius-md) bg-(--cit-surface) p-3 border border-(--cit-border)"
                                                                    >
                                                                        <div
                                                                            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                                                                isLeader
                                                                                    ? "bg-(--cit-primary-soft) text-(--cit-primary)"
                                                                                    : "bg-(--cit-surface-subtle) text-(--cit-text-muted)"
                                                                            }`}
                                                                        >
                                                                            {isLeader
                                                                                ? "L"
                                                                                : idx}
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-sm font-medium text-(--cit-text) truncate">
                                                                                {
                                                                                    member.name
                                                                                }
                                                                            </p>
                                                                            <p className="text-xs text-(--cit-text-muted) truncate">
                                                                                {
                                                                                    member.email
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <span
                                                                            className={`whitespace-nowrap text-xs font-semibold px-2.5 py-1 rounded-(--cit-radius-sm) ${
                                                                                isLeader
                                                                                    ? "bg-(--cit-primary-soft) text-(--cit-primary)"
                                                                                    : "bg-(--cit-surface-subtle) text-(--cit-text-muted)"
                                                                            }`}
                                                                        >
                                                                            {isLeader
                                                                                ? "Leader"
                                                                                : "Member"}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            },
                                                        )}
                                                    </div>

                                                    {/* Team Created Date */}
                                                    <p className="mt-4 text-xs text-(--cit-text-muted)">
                                                        Created on{" "}
                                                        {new Date(
                                                            team.createdAt,
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
