import {useCallback, useEffect} from "react";


const useEnterClick = (onClick: () => void) => {

    const escFunction = useCallback((event: any) => {
        console.log(event.key)
        if (event.key === "Enter") {
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


export default useEnterClick;