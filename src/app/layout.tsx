import { Providers } from './providers';
import { htmlFontVariablesClassName } from '@/shared/styles/fonts';
import '@/shared/styles/globals/globals.scss';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={htmlFontVariablesClassName}>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
