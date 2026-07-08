import { createContext, useContext, useState } from "react";

/**
 * @typedef {Object} Filters
 * @property {string} search
 * @property {string} category
 * @property {string} paid
 * @property {string} mode
 * @property {string} type
 * @property {string} department
 * @property {string} dateFrom
 * @property {string} dateTo
 */

/**
 * @typedef {import("react").Dispatch<import("react").SetStateAction<Filters>>} FiltersSetter
 */

/**
 * @typedef {Object} SearchContextValue
 * @property {Filters} filters
 * @property {FiltersSetter} setFilters
 */

/** @type {React.Context<SearchContextValue | null>} */
const SearchContext = createContext(null);

/**
 * @param {{ children: React.ReactNode }} props
 */
export const SearchContextProvider = ({ children }) => {
    let [filters, setFilters] = useState({
        search: "",
        category: "All",
        paid: "All",
        mode: "All",
        type: "All",
        department: "All",
        dateFrom: "",
        dateTo: "",
    });

    return (
        <SearchContext.Provider value={{ filters, setFilters }}>
            {children}
        </SearchContext.Provider>
    );
};

export function useSearchContext() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error(
            "useSearchContext must be used within SearchContextProvider",
        );
    }
    return context;
}
