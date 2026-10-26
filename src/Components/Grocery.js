import { Link, useParams } from "react-router";
import { GrocerGridCard } from "../Utils/Grocery";
import { groceryProductsByCategory } from "../Utils/GroceryProducts";
import GroceryProductCard from "./GroceryProductCard";

export default function Grocery() {
    const { id } = useParams();
    const category = GrocerGridCard.find((item) => item.id === id);

    if (!id) {
        return (
            <main className="mx-auto min-h-[60vh] w-[92%] max-w-6xl py-10 sm:py-14">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Everyday essentials</p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">Shop groceries</h1>
                <p className="mt-2 text-stone-600">Choose a category to browse our sample products.</p>
                <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {GrocerGridCard.map((item) => (
                        <Link
                            className="group overflow-hidden rounded-2xl border border-stone-200 bg-white p-3 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                            key={item.id}
                            to={`/grocery/${item.id}`}
                        >
                            <img
                                className="h-32 w-full rounded-xl bg-stone-50 object-contain p-2 transition group-hover:scale-105 sm:h-40"
                                src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
                                alt=""
                                loading="lazy"
                            />
                            <p className="mt-3 font-semibold text-stone-800 group-hover:text-orange-700">
                                {item.action?.text || item.description}
                            </p>
                            <p className="mt-1 text-sm text-stone-500">{groceryProductsByCategory[item.action?.text]?.length || 0} sample products</p>
                        </Link>
                    ))}
                </div>
            </main>
        );
    }

    if (!category) {
        return (
            <main className="mx-auto mt-16 w-[92%] max-w-6xl text-center">
                <h1 className="text-2xl font-bold">Grocery category not found</h1>
                <Link className="mt-4 inline-block font-semibold text-orange-700 underline" to="/grocery">
                    Browse grocery categories
                </Link>
            </main>
        );
    }

    const categoryName = category.action?.text || category.description;
    const products = groceryProductsByCategory[categoryName] || [];

    return (
        <main className="mx-auto min-h-[60vh] w-[92%] max-w-6xl py-10 sm:py-14">
            <Link className="font-semibold text-orange-700 hover:text-orange-900" to="/grocery">← All grocery categories</Link>
            <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Instamart · Sample catalogue</p>
                    <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">{categoryName}</h1>
                    <p className="mt-2 text-stone-600">{products.length} sample products available</p>
                </div>
                <Link className="rounded-xl bg-[#ff5200] px-4 py-2.5 font-bold text-white transition hover:bg-orange-700" to="/Checkout">
                    View cart
                </Link>
            </div>

            {products.length > 0 ? (
                <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <GroceryProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="mt-8 rounded-2xl border border-dashed border-stone-300 px-6 py-14 text-center">
                    <h2 className="text-lg font-bold">Products are coming soon</h2>
                    <p className="mt-2 text-sm text-stone-500">This category doesn’t have sample products yet.</p>
                </div>
            )}
            <p className="mt-8 text-center text-xs text-stone-500">Sample product catalogue for demonstration. No real order will be fulfilled.</p>
        </main>
    );
}
