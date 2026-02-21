export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
        <body
            className={ 'bg-linear-120 from-teal-400 via-teal-600' +
                        ' to-teal-700 bg-fixed' }
        >
        { children }
        </body>
        </html>
    );
}
