import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { UploadProvider } from '@/app/contexts/UploadContext';
import UploadProgressBar from '@/app/ui/upload/UploadProgressBar';
import UploadProgressWrapper from '@/app/ui/upload/UploadProgressWrapper';
import FioriThemeProvider from '@/app/ui/theme/FioriThemeProvider';

export const metadata = {
  title: 'SAP Business One - Invoice Management',
  description: 'Professional invoice management system powered by SAP Business One',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>SAP Business One - Invoice Management</title>
        <meta name="description" content="Professional invoice management system powered by SAP Business One" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <UploadProvider>
          {children}
          <UploadProgressWrapper />
        </UploadProvider>
      </body>
    </html>
  );
}
