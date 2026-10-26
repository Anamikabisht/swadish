import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import RestCard from "./RestCard";
import { localRestaurants } from "../Utils/LocalRestaurantData";

export default function Restaurant() {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category") || "";
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [cuisine, setCuisine] = useState("");
    const [minimumRating, setMinimumRating] = useState("0");
    const [sortBy, setSortBy] = useState("recommended");

    const cuisines = [...new Set(localRestaurants.flatMap((restaurant) => restaurant.info.cuisines))].sort();
    const visibleRestaurants = useMemo(() => {
        const normalizedCategory = category.toLowerCase().replace(/s$/, "");
        const normalizedQuery = query.trim().toLowerCase();

        return localRestaurants
            .filter((restaurant) => {
                const restaurantCuisines = restaurant.info.cuisines || [];
                const dishes = restaurant.menuSections.flatMap((section) =>
                    section.itemCards.map((item) => item.card.info.name)
                );
                const searchableText = [restaurant.info.name, ...restaurantCuisines, ...dishes].join(" ").toLowerCase();
                const matchesCategory = !normalizedCategory || [...restaurantCuisines, ...dishes].some((value) =>
                    value.toLowerCase().includes(normalizedCategory)
                );
                const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
                const matchesCuisine = !cuisine || restaurantCuisines.includes(cuisine);
                const matchesRating = Number(restaurant.info.avgRating) >= Number(minimumRating);
                return matchesCategory && matchesQuery && matchesCuisine && matchesRating;
            })
            .sort((first, second) => {
                if (sortBy === "rating") return Number(second.info.avgRating) - Number(first.info.avgRating);
                if (sortBy === "delivery") {
                    return parseInt(first.info.sla.slaString, 10) - parseInt(second.info.sla.slaString, 10);
                }
                return 0;
            });
    }, [category, cuisine, minimumRating, query, sortBy]);

    return (
        <main className="mx-auto min-h-[60vh] w-[92%] max-w-6xl py-10 sm:py-14">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Made for you</p>
                    <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                        {category ? `${category} restaurants` : "Explore restaurants"}
                    </h1>
                    <p className="mt-2 text-sm text-stone-500">{visibleRestaurants.length} places to explore</p>
                </div>
            </div>

            <section className="mt-7 rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:p-5" aria-label="Filter restaurants">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <label className="text-sm font-medium text-stone-700">
                        Search
                        <input
                            className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                            placeholder="Restaurant, dish, cuisine"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    </label>
                    <label className="text-sm font-medium text-stone-700">
                        Cuisine
                        <select className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" value={cuisine} onChange={(event) => setCuisine(event.target.value)}>
                            <option value="">All cuisines</option>
                            {cuisines.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                    </label>
                    <label className="text-sm font-medium text-stone-700">
                        Minimum rating
                        <select className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" value={minimumRating} onChange={(event) => setMinimumRating(event.target.value)}>
                            <option value="0">Any rating</option>
                            <option value="4">4.0 and above</option>
                            <option value="4.2">4.2 and above</option>
                            <option value="4.4">4.4 and above</option>
                        </select>
                    </label>
                    <label className="text-sm font-medium text-stone-700">
                        Sort by
                        <select className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                            <option value="recommended">Recommended</option>
                            <option value="rating">Top rated</option>
                            <option value="delivery">Fastest delivery</option>
                        </select>
                    </label>
                </div>
                {(category || query || cuisine || minimumRating !== "0" || sortBy !== "recommended") && (
                    <button
                        className="mt-3 rounded-md text-sm font-semibold text-orange-700 underline underline-offset-2 hover:text-orange-900 focus-visible:outline-2 focus-visible:outline-orange-600"
                        onClick={() => {
                            setQuery("");
                            setCuisine("");
                            setMinimumRating("0");
                            setSortBy("recommended");
                            setSearchParams({});
                        }}
                    >
                        Clear filters
                    </button>
                )}
            </section>

            {visibleRestaurants.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleRestaurants.map((restInfo) => (
                        <RestCard key={restInfo.info.id} restInfo={restInfo}></RestCard>
                    ))}
                </div>
            ) : (
                <section className="mt-8 rounded-2xl border border-dashed border-stone-300 px-6 py-14 text-center">
                    <h2 className="text-lg font-bold text-stone-800">No restaurants match those filters</h2>
                    <p className="mt-2 text-sm text-stone-500">Try another search or clear the filters to see all restaurants.</p>
                    <button
                        className="mt-5 rounded-xl bg-orange-600 px-5 py-2.5 font-semibold text-white hover:bg-orange-700"
                        onClick={() => {
                            setQuery("");
                            setCuisine("");
                            setMinimumRating("0");
                            setSortBy("recommended");
                            setSearchParams({});
                        }}
                    >
                        Show all restaurants
                    </button>
                </section>
            )}
        </main>
    );
}
