import { useEffect, useState } from "react"

// direkt al diyor domain'i bu :D
export const useOrigin = () => {
    const [mounted,setMounted] = useState(false);

    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';

    useEffect(() => {
        setMounted(true);
    },[]);

    if(!mounted){
        return '';
    }

    return origin;
}