import "./app.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <div className="space-x-4 p-4">
          {[1, 2, 3, 4].map((v) => (
            <Link key={v} href={`/${v}`}>
              ページ{v}
            </Link>
          ))}
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
