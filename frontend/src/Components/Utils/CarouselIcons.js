import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

/**
 * @returns previous icon for chart carousel
 */
export const PrevIcon = () => {
    return (
        <MdNavigateBefore style={{ color: "black", fontSize: "xx-large" }} />
    )
}

/**
 * @returns next icon for chart carousel
 */
export const NextIcon = () => {
    return (
        <MdNavigateNext style={{ color: "black", fontSize: "xx-large" }} />
    )
}
