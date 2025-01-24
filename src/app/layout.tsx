import React, { memo } from 'react';
import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
// コンポーネント
import SideNav from '@/app/ui/sidenav';
// 関数
import { getUser } from "@/app/lib/dal";
import { UserProvider } from '@/app/lib/contexts/UserContext';
// 型
import { User } from '@/app/lib/types/users';


const RootLayout = memo(
  async ({ children, }: { children: React.ReactNode; }) => {

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
);


const Layout = memo(({ children }: { children: React.ReactNode }) => {

  return (
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow md:overflow-y-auto md:p-5">
          {children}
        </div>
      </div>
  );
});


export default RootLayout;
