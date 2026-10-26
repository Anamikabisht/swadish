import { useDispatch, useSelector } from "react-redux";
import { addItem, decrementItem, incrementItem } from "../Stored/CartSlicer";

const formatPrice = (priceInPaise) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(priceInPaise / 100);

export default function GroceryProductCard({ product }) {
    const dispatch = useDispatch();
    const cartItem = useSelector((state) =>
        state.cartslice.items.find((item) => item.id === product.id)
    );
    const quantity = cartItem?.quantity || 0;

    return (
        <article className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-36 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-amber-100 text-6xl" aria-hidden="true">
                {product.emoji}
            </div>
            <div className="mt-4 flex flex-1 flex-col">
                <h2 className="font-bold text-stone-900">{product.name}</h2>
                <p className="mt-1 text-sm text-stone-500">{product.unit}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{product.description}</p>
                <div className="mt-4 flex items-center justify-between gap-2">
                    <p className="font-bold text-stone-900">{formatPrice(product.defaultPrice)}</p>
                    {quantity === 0 ? (
                        <button
                            className="rounded-lg border border-emerald-700 px-5 py-2 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                            onClick={() => dispatch(addItem(product))}
                            aria-label={`Add ${product.name} to cart`}
                        >
                            ADD
                        </button>
                    ) : (
                        <div className="flex items-center overflow-hidden rounded-lg border border-emerald-700 text-emerald-800">
                            <button
                                className="px-3 py-2 font-bold hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-emerald-700"
                                onClick={() => dispatch(decrementItem(product.id))}
                                aria-label={`Remove one ${product.name}`}
                            >
                                −
                            </button>
                            <span className="min-w-8 text-center text-sm font-bold" aria-live="polite">{quantity}</span>
                            <button
                                className="px-3 py-2 font-bold hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-emerald-700"
                                onClick={() => dispatch(incrementItem(product.id))}
                                aria-label={`Add one ${product.name}`}
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
