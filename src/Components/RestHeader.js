import { useSelector } from "react-redux"
import { Link } from "react-router";


export default function RestHeader(){

    const items = useSelector(state => state.cartslice.items);
    const counter = items.reduce((total, item) => total + item.quantity, 0);
    
    return (
        <header className="bg-[#ff5200] text-white">
            <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between py-4">
                <Link to="/" className="text-2xl font-extrabold tracking-tight" aria-label="Swadish home">
                    Swadish<span className="text-orange-200">.</span>
                </Link>
                <Link
                    to="/Checkout"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/70 px-4 py-2 font-semibold text-white transition hover:bg-white hover:text-[#ff5200] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    <span>Cart</span>
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-[#ff5200]">
                        {counter}
                    </span>
                </Link>
            </div>
        </header>
    )
}