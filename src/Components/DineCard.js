import { Link } from "react-router";
import { getDineoutImage } from "../Utils/DineoutImages";

export default function DineCard({ RestData }) {
    const info = RestData?.info;
    const offer = info?.offerInfoV2?.otherOffers?.offers?.[0]?.header ||
        info?.vendorOffer?.info?.title;

    return (
        <Link
            className="group block w-72 flex-none overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            to={`/dineout/${info?.id}`}
        >
            <div className="relative">
                <img
                    className="h-44 w-full object-cover"
                    src={getDineoutImage(info?.id)}
                    alt={`${info?.name} restaurant`}
                    loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10">
                    <div className="flex items-end justify-between gap-2 text-white">
                        <h3 className="text-lg font-bold">{info?.name}</h3>
                        <span className="shrink-0 rounded-md bg-emerald-700 px-2 py-1 text-sm font-bold">★ {info?.rating?.value}</span>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <p className="line-clamp-1 text-sm text-stone-600">{info?.cuisines?.join(", ")}</p>
                <p className="mt-1 text-sm text-stone-500">{info?.locality?.trim()} · {info?.costForTwo}</p>
                {offer && <p className="mt-3 rounded-lg bg-orange-50 px-3 py-2 text-sm font-bold text-orange-800">{offer}</p>}
            </div>
        </Link>
    );
}
