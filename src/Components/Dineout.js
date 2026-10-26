import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { dineoutRestaurants } from "../Utils/DineData";
import { getDineoutImage } from "../Utils/DineoutImages";
import DineCard from "./DineCard";

const FAVORITES_STORAGE_KEY = "swiggy-demo-dineout-favorites";
const BOOKINGS_STORAGE_KEY = "swiggy-demo-dineout-bookings";
const timeSlots = ["12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

function readStoredList(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(value) ? value : [];
    } catch (error) {
        console.error(`Could not read ${key} from local storage.`, error);
        return [];
    }
}

function getTodayDate() {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 10);
}

function getOffers(info) {
    const offers = info?.offerInfoV2?.otherOffers?.offers?.map((offer) => offer.header).filter(Boolean) || [];
    const vendorOffer = info?.vendorOffer?.info?.title;
    if (vendorOffer) offers.push(vendorOffer);
    return [...new Set(offers)];
}

function getBookingNumber() {
    return String(Date.now()).slice(-6);
}

export default function Dineout() {
    const { id } = useParams();
    const restaurant = dineoutRestaurants.find((item) => item.info?.id === id);
    const [query, setQuery] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [locality, setLocality] = useState("");
    const [minimumRating, setMinimumRating] = useState("0");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [favorites, setFavorites] = useState(() => readStoredList(FAVORITES_STORAGE_KEY));
    const [favoriteError, setFavoriteError] = useState("");
    const [booking, setBooking] = useState(null);
    const [bookingError, setBookingError] = useState("");

    const cuisineOptions = [...new Set(dineoutRestaurants.flatMap((item) => item.info?.cuisines || []))].sort();
    const localityOptions = [...new Set(dineoutRestaurants.map((item) => item.info?.locality?.trim()).filter(Boolean))].sort();

    const visibleRestaurants = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return dineoutRestaurants.filter((item) => {
            const info = item.info || {};
            const searchable = [
                info.name,
                info.locality,
                info.locationInfo?.formattedAddress,
                ...(info.cuisines || [])
            ].join(" ").toLowerCase();
            return (!normalizedQuery || searchable.includes(normalizedQuery))
                && (!cuisine || info.cuisines?.includes(cuisine))
                && (!locality || info.locality?.trim() === locality)
                && Number(info.rating?.value || 0) >= Number(minimumRating)
                && (!showFavoritesOnly || favorites.includes(info.id));
        }).sort((first, second) => Number(second.info?.rating?.value || 0) - Number(first.info?.rating?.value || 0));
    }, [cuisine, favorites, locality, minimumRating, query, showFavoritesOnly]);

    function toggleFavorite(restaurantId) {
        const nextFavorites = favorites.includes(restaurantId)
            ? favorites.filter((favoriteId) => favoriteId !== restaurantId)
            : [...favorites, restaurantId];
        try {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(nextFavorites));
            setFavorites(nextFavorites);
            setFavoriteError("");
        } catch (error) {
            console.error("Could not save Dineout favorites.", error);
            setFavoriteError("Favorites could not be saved in this browser.");
        }
    }

    function makeReservation(event) {
        event.preventDefault();
        setBookingError("");
        const form = event.currentTarget;
        if (!form.reportValidity()) return;
        const formData = new FormData(form);
        const reservation = {
            reference: getBookingNumber(),
            restaurantId: restaurant.info.id,
            restaurantName: restaurant.info.name,
            guestName: formData.get("guestName"),
            date: formData.get("date"),
            time: formData.get("time"),
            guests: Number(formData.get("guests"))
        };

        try {
            const savedBookings = readStoredList(BOOKINGS_STORAGE_KEY);
            localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify([...savedBookings, reservation]));
            setBooking(reservation);
        } catch (error) {
            console.error("Could not save the table reservation.", error);
            setBookingError("Your reservation could not be saved. Please check browser storage and try again.");
        }
    }

    if (!id) {
        return (
            <main className="mx-auto min-h-[60vh] w-[92%] max-w-6xl py-10 sm:py-14">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">A table worth sharing</p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Discover restaurants on Dineout</h1>
                <p className="mt-2 text-stone-600">Browse local listings, find a spot, and reserve a table for your next meal out.</p>

                <section className="mt-7 grid gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Filter Dineout restaurants">
                    <label className="text-sm font-semibold text-stone-700">
                        Search
                        <input className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" placeholder="Restaurant, area, cuisine" value={query} onChange={(event) => setQuery(event.target.value)} />
                    </label>
                    <label className="text-sm font-semibold text-stone-700">
                        Cuisine
                        <select className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" value={cuisine} onChange={(event) => setCuisine(event.target.value)}>
                            <option value="">All cuisines</option>
                            {cuisineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                    </label>
                    <label className="text-sm font-semibold text-stone-700">
                        Area
                        <select className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" value={locality} onChange={(event) => setLocality(event.target.value)}>
                            <option value="">All areas</option>
                            {localityOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                        </select>
                    </label>
                    <label className="text-sm font-semibold text-stone-700">
                        Minimum rating
                        <select className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" value={minimumRating} onChange={(event) => setMinimumRating(event.target.value)}>
                            <option value="0">Any rating</option>
                            <option value="4">4.0 and above</option>
                            <option value="4.3">4.3 and above</option>
                            <option value="4.5">4.5 and above</option>
                        </select>
                    </label>
                    {(query || cuisine || locality || minimumRating !== "0") && (
                        <button
                            className="justify-self-start text-sm font-bold text-orange-700 underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-orange-600 sm:col-span-2 lg:col-span-4"
                            onClick={() => { setQuery(""); setCuisine(""); setLocality(""); setMinimumRating("0"); }}
                        >
                            Clear filters
                        </button>
                    )}
                </section>

                <div className="mb-4 mt-7 flex items-center justify-between">
                    <h2 className="text-xl font-bold">{visibleRestaurants.length} {showFavoritesOnly ? "saved" : "places"} to discover</h2>
                    <div className="flex items-center gap-3">
                        <button
                            className={`rounded-full border px-3 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 ${showFavoritesOnly ? "border-rose-600 bg-rose-50 text-rose-700" : "border-stone-300 bg-white text-stone-700 hover:border-rose-300"}`}
                            onClick={() => setShowFavoritesOnly((isShowing) => !isShowing)}
                            aria-pressed={showFavoritesOnly}
                        >
                            {showFavoritesOnly ? "♥ Saved places" : "♡ Saved places"}
                        </button>
                        <p className="hidden text-sm text-stone-500 sm:block">Sorted by rating</p>
                    </div>
                </div>
                {visibleRestaurants.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleRestaurants.map((item) => (
                            <div className="relative" key={item.info.id}>
                                <DineCard RestData={item} />
                                <button
                                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-xl text-rose-600 shadow transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                                    onClick={() => toggleFavorite(item.info.id)}
                                    aria-label={favorites.includes(item.info.id) ? `Remove ${item.info.name} from favorites` : `Add ${item.info.name} to favorites`}
                                    aria-pressed={favorites.includes(item.info.id)}
                                    title={favorites.includes(item.info.id) ? "Remove favorite" : "Save favorite"}
                                >
                                    {favorites.includes(item.info.id) ? "♥" : "♡"}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-stone-300 px-6 py-14 text-center">
                        <h2 className="text-lg font-bold">{showFavoritesOnly && favorites.length === 0 ? "No saved restaurants yet" : "No restaurants match those filters"}</h2>
                        <p className="mt-2 text-sm text-stone-500">{showFavoritesOnly && favorites.length === 0 ? "Tap the heart on a restaurant card to save it here." : "Try a different search, cuisine, or area."}</p>
                        {(query || cuisine || locality || minimumRating !== "0" || showFavoritesOnly) && (
                            <button
                                className="mt-5 rounded-xl bg-orange-600 px-5 py-2.5 font-semibold text-white hover:bg-orange-700"
                                onClick={() => { setQuery(""); setCuisine(""); setLocality(""); setMinimumRating("0"); setShowFavoritesOnly(false); }}
                            >
                                Show all restaurants
                            </button>
                        )}
                    </div>
                )}
                {favoriteError && <p className="mt-4 text-sm text-red-700" role="alert">{favoriteError}</p>}
            </main>
        );
    }

    if (!restaurant) {
        return (
            <main className="mx-auto mt-16 w-[92%] max-w-4xl text-center">
                <h1 className="text-2xl font-bold">Dineout restaurant not found</h1>
                <Link className="mt-4 inline-block font-semibold text-orange-700 underline" to="/dineout">Browse Dineout restaurants</Link>
            </main>
        );
    }

    const info = restaurant.info;
    const offers = getOffers(info);
    const highlights = info.highlights || [];
    const formattedAddress = info.locationInfo?.formattedAddress || `${info.locality || ""}, ${info.locationInfo?.city?.name || "Delhi"}`;

    if (booking) {
        return (
            <main className="mx-auto flex min-h-[70vh] w-[92%] max-w-3xl items-center justify-center py-12">
                <section className="w-full rounded-3xl border border-stone-200 bg-white p-7 text-center shadow-sm sm:p-10" role="status">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-700" aria-hidden="true">✓</div>
                    <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">Reservation confirmed</p>
                    <h1 className="mt-2 text-3xl font-bold">You’re all set, {booking.guestName}!</h1>
                    <p className="mt-3 text-stone-600">Your demo table reservation at {booking.restaurantName} has been saved on this device.</p>
                    <div className="mx-auto mt-6 max-w-md rounded-2xl bg-stone-50 p-5 text-left">
                        <p className="text-sm text-stone-500">Reference</p>
                        <p className="font-bold">#{booking.reference}</p>
                        <p className="mt-3 font-semibold">{booking.date} · {booking.time}</p>
                        <p className="mt-1 text-stone-600">{booking.guests} {booking.guests === 1 ? "guest" : "guests"}</p>
                    </div>
                    <Link className="mt-7 inline-flex rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700" to="/dineout">
                        Explore more restaurants
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="mx-auto min-h-[60vh] w-[92%] max-w-6xl py-8 sm:py-12">
            <Link className="font-semibold text-orange-700 hover:text-orange-900" to="/dineout">← All Dineout restaurants</Link>
            <div className="mt-5 overflow-hidden rounded-3xl bg-stone-900 shadow-sm">
                <img className="h-64 w-full object-cover sm:h-96" src={getDineoutImage(info.id)} alt={`${info.name} restaurant`} />
            </div>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
                <section>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-orange-600">Dineout · {info.locality?.trim()}</p>
                            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{info.name}</h1>
                            <p className="mt-2 text-stone-600">{info.cuisines?.join(" · ")}</p>
                        </div>
                        <span className="rounded-xl bg-emerald-700 px-3 py-2 font-bold text-white">★ {info.rating?.value}</span>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-stone-200 bg-white p-4">
                            <p className="text-sm text-stone-500">Average spend</p>
                            <p className="mt-1 font-bold">{info.costForTwo || "Cost details unavailable"}</p>
                        </div>
                        <div className="rounded-2xl border border-stone-200 bg-white p-4">
                            <p className="text-sm text-stone-500">Location</p>
                            <p className="mt-1 font-bold">{formattedAddress}</p>
                            {info.locationInfo?.distanceString && <p className="mt-1 text-sm text-stone-500">{info.locationInfo.distanceString} away</p>}
                        </div>
                    </div>

                    {offers.length > 0 && (
                        <section className="mt-7" aria-labelledby="dineout-offers-title">
                            <h2 id="dineout-offers-title" className="text-xl font-bold">Offers</h2>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                {offers.map((offer) => (
                                    <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4" key={offer}>
                                        <p className="font-bold text-orange-900">{offer}</p>
                                        <p className="mt-1 text-sm text-orange-800">Offer information shown from the local demo dataset.</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {highlights.length > 0 && (
                        <section className="mt-7" aria-labelledby="dineout-highlights-title">
                            <h2 id="dineout-highlights-title" className="text-xl font-bold">What this place offers</h2>
                            <ul className="mt-3 flex flex-wrap gap-2">
                                {highlights.map((highlight) => (
                                    <li className="rounded-full border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700" key={highlight}>{highlight}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </section>

                <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-600">Book a table</p>
                    <h2 className="mt-1 text-2xl font-bold">Make a reservation</h2>
                    <p className="mt-2 text-sm leading-relaxed text-stone-500">Choose a date and time. This demo reservation is saved only in your browser.</p>
                    <form className="mt-5 space-y-4" onSubmit={makeReservation}>
                        <label className="block text-sm font-semibold text-stone-700" htmlFor="booking-name">
                            Your name
                            <input id="booking-name" name="guestName" autoComplete="name" required minLength="2" maxLength="80" className="mt-1.5 w-full rounded-lg border border-stone-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
                        </label>
                        <label className="block text-sm font-semibold text-stone-700" htmlFor="booking-phone">
                            Phone number
                            <input id="booking-phone" name="phone" type="tel" autoComplete="tel" required pattern="[0-9]{10}" inputMode="numeric" maxLength="10" title="Enter a 10-digit phone number" className="mt-1.5 w-full rounded-lg border border-stone-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
                        </label>
                        <label className="block text-sm font-semibold text-stone-700" htmlFor="booking-date">
                            Date
                            <input id="booking-date" name="date" type="date" required min={getTodayDate()} defaultValue={getTodayDate()} className="mt-1.5 w-full rounded-lg border border-stone-300 px-3 py-2.5 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
                        </label>
                        <label className="block text-sm font-semibold text-stone-700" htmlFor="booking-time">
                            Time
                            <select id="booking-time" name="time" required defaultValue="" className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100">
                                <option value="" disabled>Select a time</option>
                                {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                            </select>
                        </label>
                        <label className="block text-sm font-semibold text-stone-700" htmlFor="booking-guests">
                            Guests
                            <select id="booking-guests" name="guests" required defaultValue="2" className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100">
                                {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count} {count === 1 ? "guest" : "guests"}</option>)}
                            </select>
                        </label>
                        {bookingError && <p className="text-sm text-red-700" role="alert">{bookingError}</p>}
                        <button className="w-full rounded-xl bg-[#ff5200] px-4 py-3 font-bold text-white transition hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700" type="submit">
                            Confirm demo reservation
                        </button>
                    </form>
                </aside>
            </div>
        </main>
    );
}
