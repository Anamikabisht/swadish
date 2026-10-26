import { Link } from "react-router"
import FoodImage from "./FoodImage";

export default function RestCard({restInfo}){
   
    
    return (
        <Link className="group block h-full rounded-2xl border border-stone-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600" to={"/city/delhi/"+restInfo?.info?.id}>
        <div className="h-full">
        <FoodImage
            className="h-48 w-full rounded-xl object-cover"
            src={restInfo?.info?.cloudinaryImageId ? `https://media-assets.swiggy.com/swiggy/image/upload/${restInfo.info.cloudinaryImageId}` : undefined}
            alt={`${restInfo?.info?.name} ${restInfo?.info?.cuisines?.join(" ")}`}
        />
        <div className="mt-3 px-1">
            <div className="text-lg font-bold text-stone-900 group-hover:text-orange-700">{restInfo?.info?.name}</div>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm font-medium text-stone-600">
                <span className="inline-flex items-center gap-1 text-emerald-700">
                    <span aria-hidden="true">★</span>
                    <span>{restInfo?.info?.avgRating}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>{restInfo?.info?.sla?.slaString}</span>
            </div>
            <div className="mt-1 line-clamp-1 text-sm text-stone-500">{restInfo?.info?.cuisines?.join(", ")}</div>
        </div>
        </div>
        </Link>
    )
}