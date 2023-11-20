"use client";
import { useState, useEffect } from "react";
export const COLOR_THEME_SELECTOR_KEY = "color-theme"

export default function ThemeChanger() {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem(COLOR_THEME_SELECTOR_KEY) == 'dark');
    const toggleDarkMode = () => {
        setIsDarkMode((previousState) => {
            if (!previousState) {
                localStorage.setItem(COLOR_THEME_SELECTOR_KEY, "dark")
            }
            else {
                localStorage.setItem(COLOR_THEME_SELECTOR_KEY, "")
            }
            return !previousState
        })
    }
    const initializeMode = () => {
        if (localStorage.getItem(COLOR_THEME_SELECTOR_KEY) == 'dark') {
            setIsDarkMode(true)
        } else {
            setIsDarkMode(false)
        }
    }
    useEffect(() => {
        initializeMode();
    }, []);
    const lightSvg = (<svg
        onClick={toggleDarkMode}
        className="icons"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"
        ></path>
    </svg>)
    const darkSvg = (<svg
        onClick={toggleDarkMode}
        className="icons"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        ></path>
    </svg>)
    const dynamiClassList = isDarkMode ? "cursor-pointer dark-theme themeSelector" : "cursor-pointer themeSelector"
    return (
        <div className={dynamiClassList} >
            <span>Select Theme</span>
            {isDarkMode ? lightSvg : darkSvg}
        </div >
    )
}