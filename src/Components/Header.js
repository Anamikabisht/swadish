import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const serviceCards = [
    {
        label: "Food",
        to: "/restaurant",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/1/fa01e85b-3057-482d-9523-5289722b1df2_Food4BU.png"
    },
    {
        label: "Instamart",
        to: "/grocery",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/16/ca34e375-f1bd-4a2e-a3e7-0a20833be83b_IM4BU1.png"
    },
    {
        label: "Dineout",
        to: "/dineout",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/MERCHANDISING_BANNERS/IMAGES/MERCH/2024/8/1/76c30e5a-8adb-4795-bf5b-fa64e9e9e1d3_DO4BU.png"
    },
];

export default function Header() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const items = useSelector((state) => state.cartslice.items);
    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    function handleSearch(event) {
        event.preventDefault();
        const value = query.trim();
        navigate(value ? `/restaurant?q=${encodeURIComponent(value)}` : "/restaurant");
    }

    return (
        <header className="bg-[#ff5200] font-serif text-white">
            <div className="container mx-auto flex w-[92%] max-w-6xl flex-wrap items-center justify-between gap-4 py-6 sm:py-8">
                <Link
                    to="/"
                    className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                    aria-label="Swadish home"
                >
                    Swadish<span className="text-orange-200">.</span>
                </Link>
                <nav className="flex flex-wrap items-center justify-end gap-3 text-sm font-bold sm:gap-6 sm:text-base" aria-label="Main navigation">
                    <Link className="hover:text-orange-100" to="/restaurant">Restaurants</Link>
                    <Link className="hover:text-orange-100" to="/grocery">Instamart</Link>
                    <Link className="hover:text-orange-100" to="/dineout">Dineout</Link>
                    <Link className="rounded-xl border border-white px-3 py-2 transition hover:bg-white hover:text-[#ff5200] sm:px-4" to="/Checkout">
                        Cart ({cartCount})
                    </Link>
                </nav>
            </div>

            <div className="relative overflow-hidden pb-10 pt-8 sm:pb-14 sm:pt-12">
                <img
                    className="pointer-events-none absolute left-0 top-0 hidden h-80 w-40 object-contain opacity-90 lg:block"
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Veggies_new.png"
                    alt=""
                />
                <img
                    className="pointer-events-none absolute right-0 top-0 hidden h-80 w-40 object-contain opacity-90 lg:block"
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/testing/seo-home/Sushi_replace.png"
                    alt=""
                />
                <div className="mx-auto w-[92%] max-w-3xl text-center">
                    <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
                        Order food and groceries. Discover the best restaurants. Swadish it!
                    </h1>
                    <form className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 text-left sm:flex-row" onSubmit={handleSearch}>
                        <label className="sr-only" htmlFor="delivery-location">Delivery location</label>
                        <input
                            id="delivery-location"
                            className="min-w-0 rounded-2xl bg-white px-5 py-4 text-base text-stone-800 outline-none placeholder:text-stone-500 focus-visible:ring-2 focus-visible:ring-orange-200 sm:w-[38%]"
                            placeholder="Delhi, India"
                            defaultValue="Delhi, India"
                        />
                        <label className="sr-only" htmlFor="home-search">Search for restaurants or dishes</label>
                        <input
                            id="home-search"
                            className="min-w-0 flex-1 rounded-2xl bg-white px-5 py-4 text-base text-stone-800 outline-none placeholder:text-stone-500 focus-visible:ring-2 focus-visible:ring-orange-200"
                            placeholder="Search for restaurant, cuisine, or dish"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <button className="rounded-2xl bg-stone-900 px-6 py-4 font-bold text-white transition hover:bg-stone-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <nav className="mx-auto grid w-[92%] max-w-6xl grid-cols-2 gap-3 pb-8 sm:grid-cols-3 sm:gap-5" aria-label="Swadish services">
                {serviceCards.map((service) => (
                    <Link
                        key={service.label}
                        to={service.to}
                        className="overflow-hidden rounded-xl transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        aria-label={`Explore ${service.label}`}
                    >
                        <img className="w-full object-contain" src={service.image} alt={service.label} />
                    </Link>
                ))}
            </nav>
        </header>
    );
}
