import { useState } from "react"
import RestInfo from "./RestInfo"


export default function MenuCard({menuItems,foodselected}){

    const [isOpen, setIsOpen] = useState(true);

    if(menuItems?.categories){
        return(
            <div className="w-full">
            <p className="text-2xl font-bold">{menuItems.title}</p>
            <div>
                {
                    menuItems?.categories?.map((items)=> <MenuCard key={items?.title} menuItems={items} foodselected={foodselected}></MenuCard>)
                }
            </div>
            </div>
        )
    }

    const visibleItems = menuItems?.itemCards?.filter((food) => {
        if (foodselected === "veg") return food?.card?.info?.isVeg === true;
        if (foodselected === "nonveg") return food?.card?.info?.isVeg === false;
        return true;
    }) || [];

    if(!isOpen){
        return(
        <div className="w-full">
            <div className="flex justify-between w-full">
            <p className="text-3xl font-bold mb-4">{menuItems.title}</p>
            <button className="text-5xl font-bold mr-20" onClick={()=>setIsOpen(!isOpen)}>{isOpen?'^':'⌄'}</button>
            </div>
            <div className="h-5 bg-gray-200 mt-2 mb-2"></div>
        </div>   
        ) 
    }
    

    return (
        <div className="w-full">
            <div className="flex justify-between w-full">
            <p className="text-3xl font-bold mb-4">{menuItems.title}</p>
            <button className="text-5xl font-bold mr-20" onClick={()=>setIsOpen(!isOpen)}>{isOpen?'^':'˯'}</button>
            </div>
            <div>
                {
                    visibleItems.length > 0
                        ? visibleItems.map((items)=><RestInfo key={items?.card?.info?.id} restData = {items?.card?.info}></RestInfo>)
                        : <p className="mb-4 text-gray-600">No {foodselected} items in this section.</p>
                }
            </div>
            <div className="h-5 bg-gray-200 mt-2 mb-2"></div>
        </div>
        
    )
}