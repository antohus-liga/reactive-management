import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Languages, Check } from "lucide-react";
import { LANGUAGES, useLanguage } from "@/hooks/useLanguage.ts";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <Menu as="div" className="relative">
            <MenuButton
                className="flex items-center gap-1.5 bg-slate-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 rounded-md transition-colors duration-150 p-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                aria-label="Change language"
            >
                <Languages className="size-5 text-zinc-600 dark:text-zinc-300"/>
            </MenuButton>
            <MenuItems
                transition
                anchor="bottom end"
                className="mt-2 w-44 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg p-1 text-sm focus:outline-none transition duration-150 ease-out data-closed:opacity-0 data-closed:scale-95 z-50"
            >
                {LANGUAGES.map(({code, label}) => (
                    <MenuItem key={code}>
                        <button
                            onClick={() => setLanguage(code)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-zinc-700 dark:text-zinc-300 data-focus:bg-zinc-50 dark:data-focus:bg-zinc-800 transition-colors duration-150"
                        >
                            <span className="flex-1 text-left">{label}</span>
                            {code === language && <Check className="size-4 text-blue-600 dark:text-blue-400"/>}
                        </button>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
}