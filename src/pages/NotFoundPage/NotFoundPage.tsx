import { Link } from "react-router";

function NotFoundPage() {
    return (
        <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
            <p className="text-6xl font-bold text-gray-300 dark:text-gray-600">404</p>
            <h1 className="mt-2 text-2xl font-semibold">Page Not Found</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">The page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 rounded-lg bg-black px-5 py-2.5 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-black">
                Back to Shop
            </Link>
        </div>
    );
}

export default NotFoundPage;
