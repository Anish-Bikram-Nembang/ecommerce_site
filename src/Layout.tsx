import { Outlet } from "react-router";
import Navbar from "./shared/components/Navbar";

function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-[#F4F5F6] text-gray-900 dark:bg-[#111111] dark:text-white">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-500 dark:border-white/10 dark:bg-[#171717] dark:text-gray-400">
                © 2026 Pasal - React JS assessment project
            </footer>
        </div>
    );
}
export default Layout;
