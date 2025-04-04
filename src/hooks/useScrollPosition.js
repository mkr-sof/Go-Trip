import { useEffect } from "react";

export const useScrollPosition = (onScroll) => {
    useEffect(() => {
        const handleScroll = () => {
            if (typeof onScroll === "function") {
                onScroll(window.scrollY);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [onScroll]);
};