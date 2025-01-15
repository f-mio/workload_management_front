import React from 'react';
import '@/app/ui/global.css';
import { getUser } from "@/app/lib/dal";
import { inter } from '@/app/ui/fonts';
import SideNav from '@/app/ui/sidenav';
import { User } from '@/app/lib/types/users';
import { UserProvider } from '@/app/lib/contexts/UserContext';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // JWT tokenからログイン情報を取得
  const loginUser: User = await getUser()

  return (
    <html lang="ja">
      <body className={`${inter.className} antialiased`}>
        <UserProvider loginUser={loginUser}>
          <Layout children={children} />
        </UserProvider>
      </body>
    </html>
  );
}


function Layout({ children }: { children: React.ReactNode }) {

  return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
  );
}
