import { useState } from "react";
import { Link, useParams } from "react-router";
import RestInfo from "./RestInfo";
import { localRestaurants } from "../Utils/LocalRestaurantData";

export default function SearchFood() {
    const { id } = useParams();
    const [food, setFood] = useState("");
    const restaurant = localRestaurants.find((item) => item.info.id === id);
    const allItems = restaurant
        ? restaurant.menuSections.flatMap((section) =>
            section.itemCards.map((item) => item.card.info)
        )
        : [];
    const query = food.trim().toLowerCase();
    const matchingItems = query
        ? allItems.filter((item) =>
            `${item.name} ${item.description}`.toLowerCase().includes(query)
        )
        : [];

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
        <main className="mx-auto mt-16 w-[80%]">
            <Link className="text-blue-600 underline" to={`/city/delhi/${id}`}>
                Back to {restaurant.info.name}
            </Link>
            <input
                className="mt-6 w-full rounded-2xl border bg-gray-200 py-4 pl-10 text-2xl"
                placeholder="Search this menu"
                value={food}
                onChange={(event) => setFood(event.target.value)}
            />
            <div className="mt-8">
                {query && matchingItems.length === 0 && (
                    <p className="text-center text-lg">No dishes match “{food}”.</p>
                )}
                {matchingItems.map((item) => (
                    <RestInfo key={item.id} restData={item}></RestInfo>
                ))}
            </div>
        </main>
    );
}
