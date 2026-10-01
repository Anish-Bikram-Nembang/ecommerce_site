import { Handbag, ShoppingCart } from "lucide-react";
import { Link } from "react-router";

function Navbar() {
    return (
        <div className="flex items-center justify-between p-2 gap-2" >
            <div className="flex items-center gap-2">
                <Handbag />
                <div>
                    <h3 className="leading-none font-semibold">Pasal</h3>
                    <p className="leading-none text-[12px]">e-commerce site</p>
                </div>
            </div>

            <Link to="/cart"><ShoppingCart /></Link></div>
    );
}
export default Navbar;
