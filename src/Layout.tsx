import { Outlet } from "react-router";
import Navbar from "./shared/components/Navbar";

function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-[#F4F5F6] text-black dark:bg-[#111111] dark:text-white">
            <Navbar />
            <main className="h-full flex-1 bg-[#F4F5F6] dark:bg-[#111111]">
                <Outlet />
            </main>
        </div>

    );
}
export default Layout;
