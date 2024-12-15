import { NextLayoutProps } from "~/app/type";
import "./app.css";

export default function RootLayout({ children }: NextLayoutProps) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
