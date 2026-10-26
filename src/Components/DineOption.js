import { Link } from "react-router";
import {dineoutRestaurants} from "../Utils/DineData"
import DineCard from "./DineCard"


export default function DineOption(){

    return (
        <section className="mx-auto mb-20 mt-20 w-[92%] max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">Make it a night out</p>
                    <h2 className="mt-1 text-3xl font-bold">Discover restaurants on Dineout</h2>
                </div>
                <Link className="font-semibold text-orange-700 hover:text-orange-900" to="/dineout">Explore all →</Link>
            </div>
            <div className="mt-5 flex gap-4 overflow-x-auto pb-4">
               {
                dineoutRestaurants.map((RestData)=><DineCard key={RestData?.info?.id} RestData={RestData}></DineCard>)
               }
            </div>

        </section>
    )

}