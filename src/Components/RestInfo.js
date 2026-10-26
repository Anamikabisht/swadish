import { addItem, incrementItem, decrementItem } from "../Stored/CartSlicer"
import { useDispatch, useSelector } from "react-redux";
import FoodImage from "./FoodImage";

export default function RestInfo({restData}){
  const dispatch = useDispatch();
  const items = useSelector(state=>state.cartslice.items);

  const element = items.find(item=>item.id===restData.id);
  const count = element? element.quantity:0;
  const price = ("defaultPrice" in restData ? restData.defaultPrice : restData.price) / 100;

  function handleAdditems(){
    dispatch(addItem(restData));
  }

  function handleIncrementItems(){
    dispatch(incrementItem(restData.id));
  }

  function handleDecrementItems(){
    dispatch(decrementItem(restData.id));
  }

    return (
         <>
        <div className="mb-4 flex w-full items-center justify-between gap-6 border-b border-stone-200 py-5">
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-lg font-semibold text-stone-800">{restData?.name}</p>
            <p className="font-medium text-stone-700">₹{Number.isFinite(price) ? price.toFixed(0) : "—"}</p>
            {restData?.ratings?.aggregatedRating?.rating && (
                <p className="mt-1 text-sm font-medium text-emerald-700">
                    ★ {restData.ratings.aggregatedRating.rating}
                    {restData.ratings.aggregatedRating.ratingCountV2 && ` (${restData.ratings.aggregatedRating.ratingCountV2})`}
                </p>
            )}
            {restData?.description && <p className="mt-2 text-sm leading-relaxed text-stone-500">{restData.description}</p>}
          </div>
          <div className="relative flex w-32 shrink-0 flex-col items-center">
            <FoodImage
                className="h-24 w-32 rounded-xl object-cover"
                src={restData.imageId ? `https://media-assets.swiggy.com/swiggy/image/upload/${restData.imageId}` : undefined}
                alt={restData.name}
            />
          {
            (count===0)?(
                <button
                    className="mt-2 rounded-lg border border-emerald-600 bg-white px-6 py-1.5 text-sm font-bold tracking-wide text-emerald-700 shadow-sm transition hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                    onClick={handleAdditems}
                    aria-label={`Add ${restData.name} to cart`}
                >
                    ADD
                </button>
            ):(
              <div className="mt-2 flex items-center overflow-hidden rounded-lg border border-emerald-600 bg-white text-emerald-700 shadow-sm">
                <button className="px-3 py-1 font-bold hover:bg-emerald-50" onClick={handleDecrementItems} aria-label={`Remove one ${restData.name}`}>−</button>
                <span className="min-w-7 text-center text-sm font-bold" aria-live="polite">{count}</span>
                <button className="px-3 py-1 font-bold hover:bg-emerald-50" onClick={handleIncrementItems} aria-label={`Add one ${restData.name}`}>+</button>
              </div>
            )
          }  
          </div>
        </div>
        <hr className="mb-6 mt-2"></hr>
        </>

    )
}