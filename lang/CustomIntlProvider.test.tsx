import React from 'react';
import CustomIntlProvider from './';
import { FormattedMessage } from 'react-intl';
import { render } from '@testing-library/react';

jest.mock(
    './en/global.en.json',
    () => ({
        'app.title': 'english language',
    }),
    { virtual: true },
);
jest.mock(
    './fr/global.fr.json',
    () => ({
        'app.title': 'french',
    }),
    { virtual: true },
);

let languageGetter: jest.SpyInstance<string, []>;

describe('CustomIntlProvider', () => {
    beforeEach(() => {
        languageGetter = jest.spyOn(window.navigator, 'language', 'get');
    });
    test('It should render english message', () => {
        languageGetter.mockReturnValue('en-US');
        const { getByText } = render(
            <CustomIntlProvider>
                <FormattedMessage id="app.title" />
            </CustomIntlProvider>,
        );
        const formattedMessage = getByText(/english/);
        expect(formattedMessage).toBeInTheDocument();
    });
    test('It should render french message', () => {
        languageGetter.mockReturnValue('fr-FR');
        const { getByText } = render(
            <CustomIntlProvider>
                <FormattedMessage id="app.title" />
            </CustomIntlProvider>,
        );
        const formattedMessage = getByText(/french/);
        expect(formattedMessage).toBeInTheDocument();
    });
    test('It should fallback to english message when locale is inexistant', () => {
        languageGetter.mockReturnValue('zh-Zh');
        const { getByText } = render(
            <CustomIntlProvider>
                <FormattedMessage id="app.title" />
            </CustomIntlProvider>,
        );
        const formattedMessage = getByText(/english/);
        expect(formattedMessage).toBeInTheDocument();
    });
});
