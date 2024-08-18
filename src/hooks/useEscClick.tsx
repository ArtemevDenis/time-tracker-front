import {useCallback, useEffect} from "react";


const useEscClick = (onClick: () => void) => {

    const escFunction = useCallback((event: any) => {
        if (event.key === "Escape") {
            onClick()
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);

        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, [escFunction]);
}


export default useEscClick;