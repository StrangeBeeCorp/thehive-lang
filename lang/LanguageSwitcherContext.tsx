import { createContext } from 'react';

export const AvailableLanguagesArray = ['fr', 'en'] as const;
export type AvailableLanguages = typeof AvailableLanguagesArray[number];

interface LanguageSwitcherContextInterface {
    language: AvailableLanguages;
    setLanguage: (value: AvailableLanguages) => void;
}

export const LanguageSwitcherContext = createContext<LanguageSwitcherContextInterface>({
    language: 'en',
    setLanguage: () => ({}),
});
