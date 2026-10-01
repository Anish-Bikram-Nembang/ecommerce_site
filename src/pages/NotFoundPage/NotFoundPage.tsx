import { Link } from "react-router";

function NotFoundPage() {
    return (
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/45">Error 404</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page wandered off.</h1>
            <p className="mt-3 text-sm leading-6 text-black/60">
                The page you are looking for does not exist or may have moved.
            </p>
            <Link to="/" className="mt-7 rounded-full bg-black px-5 py-3 text-sm text-white hover:bg-[#2E3132] dark:bg-white dark:text-black dark:hover:bg-[#e5e5e5]">
                Back to shop
            </Link>
        </div>
    );
}

export default NotFoundPage;
