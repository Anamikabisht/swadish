import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { clearCart, decrementItem, incrementItem, removeItem } from "../Stored/CartSlicer";

const DELIVERY_FEE = 3000;

const formatPrice = (priceInPaise) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(priceInPaise / 100);

const getItemPrice = (item) => item.defaultPrice ?? item.price ?? 0;

export default function Checkout() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cartslice.items);
    const [order, setOrder] = useState(null);
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const itemTotal = items.reduce((total, item) => total + getItemPrice(item) * item.quantity, 0);
    const tax = Math.round(itemTotal * 0.05);
    const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
    const total = itemTotal + tax + deliveryFee;

    function placeDemoOrder(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const customerName = formData.get("customerName");
        setOrder({
            number: String(Date.now()).slice(-6),
            customerName,
            total
        });
        dispatch(clearCart());
    }

    if (order) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-stone-50 px-4 py-10 text-stone-800">
                <section className="w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-7 text-center shadow-sm sm:p-10" role="status">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700" aria-hidden="true">✓</div>
                    <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Demo order placed</p>
                    <h1 className="mt-2 text-3xl font-bold">Thank you, {order.customerName}!</h1>
                    <p className="mt-3 leading-relaxed text-stone-600">Your sample order is confirmed. No payment was taken.</p>
                    <div className="mt-6 rounded-xl bg-stone-50 p-4 text-left">
                        <p className="text-sm text-stone-500">Order reference</p>
                        <p className="font-bold">#{order.number}</p>
                        <p className="mt-3 text-sm text-stone-500">Demo total</p>
                        <p className="font-bold">{formatPrice(order.total)}</p>
                    </div>
                    <Link className="mt-7 inline-flex rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700" to="/restaurant">
                        Continue exploring
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-stone-50 px-4 py-10 text-stone-800 sm:px-6">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <Link className="text-sm font-semibold text-orange-700 hover:text-orange-900" to="/restaurant">← Keep exploring</Link>
                        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Your order</p>
                        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Checkout</h1>
                        {itemCount > 0 && <p className="mt-2 text-sm text-stone-500">{itemCount} {itemCount === 1 ? "item" : "items"} in your cart</p>}
                    </div>
                    {items.length > 0 && (
                        <button
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-stone-500 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-red-600"
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear cart
                        </button>
                    )}
                </div>

                {items.length === 0 ? (
                    <section className="rounded-2xl border border-stone-200 bg-white px-6 py-16 text-center shadow-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-3xl" aria-hidden="true">🛒</div>
                        <h2 className="mt-5 text-xl font-bold">Your cart is empty</h2>
                        <p className="mt-2 text-stone-500">Add something delicious from a restaurant menu to get started.</p>
                        <Link className="mt-6 inline-flex rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700" to="/restaurant">
                            Browse restaurants
                        </Link>
                    </section>
                ) : (
                    <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
                        <section className="rounded-2xl border border-stone-200 bg-white px-4 shadow-sm sm:px-6" aria-label="Cart items">
                            <div className="divide-y divide-stone-100">
                                {items.map((item) => {
                                    const unitPrice = getItemPrice(item);
                                    return (
                                        <article key={item.id} className="flex flex-wrap items-center gap-3 py-5 sm:flex-nowrap sm:gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg font-bold text-orange-700" aria-hidden="true">
                                                {item.name?.charAt(0)}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h2 className="font-semibold">{item.name}</h2>
                                                <p className="mt-1 text-sm text-stone-500">{formatPrice(unitPrice)} each</p>
                                            </div>
                                            <div className="flex items-center rounded-lg border border-stone-200">
                                                <button className="px-3 py-2 font-semibold text-stone-600 transition hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-orange-600" onClick={() => dispatch(decrementItem(item.id))} aria-label={`Remove one ${item.name}`}>−</button>
                                                <span className="min-w-8 text-center text-sm font-bold" aria-live="polite">{item.quantity}</span>
                                                <button className="px-3 py-2 font-semibold text-stone-600 transition hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-orange-600" onClick={() => dispatch(incrementItem(item.id))} aria-label={`Add one ${item.name}`}>+</button>
                                            </div>
                                            <p className="w-20 text-right font-semibold">{formatPrice(unitPrice * item.quantity)}</p>
                                            <button className="rounded-md p-2 text-xl text-stone-400 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-600" onClick={() => dispatch(removeItem(item.id))} aria-label={`Remove ${item.name} from cart`} title="Remove item">×</button>
                                        </article>
                                    );
                                })}
                            </div>
                            <div className="border-t border-stone-100 py-5">
                                <Link className="font-semibold text-orange-700 hover:text-orange-800" to="/restaurant">+ Add more items</Link>
                            </div>
                        </section>

                        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="text-lg font-bold">Delivery details</h2>
                            <form className="mt-4 space-y-4" onSubmit={placeDemoOrder}>
                                <label className="block text-sm font-medium text-stone-700" htmlFor="customer-name">
                                    Full name
                                    <input id="customer-name" name="customerName" autoComplete="name" required minLength="2" maxLength="80" className="mt-1.5 w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
                                </label>
                                <label className="block text-sm font-medium text-stone-700" htmlFor="customer-phone">
                                    Phone number
                                    <input id="customer-phone" name="phone" type="tel" autoComplete="tel" required pattern="[0-9]{10}" title="Enter a 10-digit phone number" inputMode="numeric" maxLength="10" className="mt-1.5 w-full rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
                                </label>
                                <label className="block text-sm font-medium text-stone-700" htmlFor="delivery-address">
                                    Delivery address
                                    <textarea id="delivery-address" name="address" autoComplete="street-address" required minLength="10" maxLength="240" rows="3" className="mt-1.5 w-full resize-y rounded-lg border border-stone-300 px-3 py-2.5 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
                                </label>
                                <div className="border-t border-stone-100 pt-4">
                                    <h3 className="font-bold">Bill details</h3>
                                    <div className="mt-4 flex justify-between text-sm text-stone-600"><span>Item total</span><span>{formatPrice(itemTotal)}</span></div>
                                    <div className="mt-2 flex justify-between text-sm text-stone-600"><span>Delivery fee</span><span>{formatPrice(deliveryFee)}</span></div>
                                    <div className="mt-2 flex justify-between text-sm text-stone-600"><span>Estimated tax (5%)</span><span>{formatPrice(tax)}</span></div>
                                    <div className="mt-4 flex justify-between border-t border-stone-100 pt-4 text-lg font-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
                                </div>
                                <p className="text-xs leading-relaxed text-stone-500">Demo checkout only. No payment will be collected, and delivery details are not saved.</p>
                                <button className="w-full rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white transition hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700" type="submit">
                                    Place demo order · {formatPrice(total)}
                                </button>
                            </form>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}
