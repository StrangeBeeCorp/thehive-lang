import React, { ReactElement, useState } from 'react';
import { IntlProvider } from 'react-intl';
import flatten from 'flat';
import fr from './fr';
import en from './en';
import { AvailableLanguages, AvailableLanguagesArray, LanguageSwitcherContext } from './LanguageSwitcherContext';

const isAvailableLanguage = (language: string | AvailableLanguages): language is AvailableLanguages => {
    return AvailableLanguagesArray.includes(language as any);
};

const messages: Record<AvailableLanguages, any> = {
    en,
    fr,
};

interface CustomIntlProviderProps {
    children: React.ReactNode;
}

const CustomIntlProvider = ({ children }: CustomIntlProviderProps): ReactElement => {
    const navigatorLanguage = navigator.language.split(/[-_]/)[0];
    const [language, setLanguage] = useState<AvailableLanguages>(
        isAvailableLanguage(navigatorLanguage) ? navigatorLanguage : 'en',
    );
    const defaultMessages = messages[language] || messages['en'];

    return (
        <LanguageSwitcherContext.Provider value={{ language, setLanguage }}>
            <IntlProvider locale={language} messages={flatten(defaultMessages)}>
                {children}
            </IntlProvider>
        </LanguageSwitcherContext.Provider>
    );
};

export default CustomIntlProvider;
