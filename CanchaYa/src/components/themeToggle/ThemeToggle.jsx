import { useTheme } from "../context/ThemeProvider";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();


    return (
        <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-2 rounded-lg 
                bg-gray-200 text-black 
                dark:bg-gray-700 dark:text-white 
                transition-colors duration-300"
        >
            {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
    )
}