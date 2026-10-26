import { useState } from "react";
import { Link, useParams } from "react-router";
import MenuCard from "./MenuCard";
import { localRestaurants } from "../Utils/LocalRestaurantData";

export default function RestaurantMenu() {
    const { id } = useParams();
    const [selected, setSelected] = useState(null);
    const restaurant = localRestaurants.find((item) => item.info.id === id);

    if (!restaurant) {
        return (
            <main className="mx-auto mt-20 w-[80%] text-center">
                <p className="text-xl">Restaurant not found in the sample menu.</p>
                <Link className="mt-4 inline-block text-blue-600 underline" to="/restaurant">
                    Browse restaurants
                </Link>
            </main>
        );
    }

    return (
        <main>
            <div className="mx-auto mt-16 w-[80%]">
                <Link className="text-blue-600 underline" to="/restaurant">All restaurants</Link>
                <h1 className="mt-4 text-3xl font-bold">{restaurant.info.name}</h1>
                <p className="mt-1 text-gray-600">{restaurant.info.cuisines.join(", ")}</p>
                <Link to={`/city/delhi/${id}/search`}>
                    <p className="mt-8 w-full rounded-4xl bg-gray-200 py-4 text-center text-2xl">
                        Search for dishes
                    </p>
                </Link>
            </div>

            <div className="mx-auto mb-12 mt-8 w-[80%]">
                <button
                    className={`mr-4 rounded-2xl border px-8 py-2 text-2xl ${selected === "veg" ? "bg-green-600" : "bg-gray-300"}`}
                    onClick={() => setSelected(selected === "veg" ? null : "veg")}
                >
                    Veg
                </button>
                <button
                    className={`rounded-2xl border px-4 py-2 text-2xl ${selected === "nonveg" ? "bg-red-500" : "bg-gray-300"}`}
                    onClick={() => setSelected(selected === "nonveg" ? null : "nonveg")}
                >
                    Non veg
                </button>
            </div>

            <div className="mx-auto mt-8 w-[80%]">
                {restaurant.menuSections.map((section) => (
                    <MenuCard key={section.title} menuItems={section} foodselected={selected}></MenuCard>
                ))}
            </div>
        </main>
    );
}
