import { useState } from "react";
import { getFoodImage } from "../Utils/FoodImages";

export default function FoodImage({ src, alt, className }) {
    const fallbackSrc = getFoodImage(alt);
    const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
    const [showPlaceholder, setShowPlaceholder] = useState(false);

    function handleImageError() {
        if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
        } else {
            setShowPlaceholder(true);
        }
    }

    if (showPlaceholder) {
        return (
            <div
                className={`${className} flex items-center justify-center bg-gradient-to-br from-orange-200 to-rose-300 text-4xl font-bold text-white`}
                role="img"
                aria-label={alt}
            >
                {alt?.charAt(0)}
            </div>
        );
    }

    return <img className={className} src={currentSrc} alt={alt} loading="lazy" onError={handleImageError} />;
}
