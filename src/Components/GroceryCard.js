

import { Link } from "react-router"

export default function Grocerycard({foodData})
{

    return(
        <div className="flex-none">
        <Link to={`/grocery/${foodData?.id}`}>
        <img className="w-40 h-50 object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/"+foodData?.imageId} alt={foodData?.action?.text || "Grocery category"}></img>
        </Link>
        <h1 className="text-center font-bold">{foodData?.action?.text}</h1>
        </div>
    )
}