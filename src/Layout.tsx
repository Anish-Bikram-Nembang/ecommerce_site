import { Outlet } from "react-router";
import Navbar from "./shared/components/Navbar";

function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 h-full bg-[#F4F5F6]">
                <Outlet />
            </main>
        </div>

    );
}
export default Layout;
