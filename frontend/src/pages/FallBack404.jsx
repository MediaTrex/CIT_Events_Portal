import { Link } from "react-router-dom";

export default function FallBack404() {
    return (
        <div className="min-h-screen bg-(--cit-bg) flex items-center justify-center p-6">
            <div className="max-w-3xl w-full bg-(--cit-surface) rounded-(--cit-radius-lg) shadow-(--cit-shadow-sm) border border-(--cit-border) p-8 text-center">
                <div className="flex flex-col items-center gap-6">
                    <img src="/404.png" alt="404" className="w-full max-w-lg object-contain" />

                    <div className="pt-2">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 bg-(--cit-primary) hover:bg-(--cit-primary-hover) text-white font-medium rounded-(--cit-radius-md) px-5 py-2"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
