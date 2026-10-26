

import { Link } from "react-router"

export default function Foodcard({foodData})
{


    return(
        <>
        <Link to={`/restaurant?category=${encodeURIComponent(foodData?.action?.text || "")}`}>
        <img className="w-40 h-50 object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+foodData?.imageId} alt={foodData?.action?.text || "Food category"}></img>
        </Link>
        </>
    )
}