import React, {useEffect} from "react";


const useOutsideClick = (ref: React.RefObject<HTMLInputElement>, onClickOutside: () => void) => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside()
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}


export default useOutsideClick;