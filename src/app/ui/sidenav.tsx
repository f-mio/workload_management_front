"use client"

import { memo, useContext } from 'react';
import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
// コンポーネント
import UserNavLinks from '@/app/ui/users/nav-links';
import SuperuserNavLinks from '@/app/ui/users/superuser-nav-links';
import WorkloadNavLinks from '@/app/ui/workloads/nav-links';
import { UserContext } from '@/app/lib/contexts/UserContext';
import { User } from '@/app/lib/types/users';
import { logout } from '@/app/api/users';


const SideNav = memo(() => {
  // ユーザ情報を取得
  const loginUser = useContext<User>(UserContext);

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-start justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="text-white md:w-40">
          {"JIRA issues"}<br />
          {"WorkLoad App"}
        </div>
      </Link>
      <div className="flex grow flex-row justify-start space-x-2 md:flex-col md:space-x-0 md:space-y-2">

        {/* 工数登録 */}
        <h3 className="bg-blue-200 p-3 underline underline-offset-2">工数情報</h3>
        <WorkloadNavLinks />

        {/* ユーザ情報 */}
        <h3 className="bg-blue-200 p-3 underline underline-offset-2">ユーザ情報</h3>
        <UserNavLinks />

        {/* 管理者機能 */}
        { loginUser?.is_superuser === true && ( <>
          <h3 className="bg-blue-200 p-3 underline underline-offset-2">管理者機能</h3>
          <SuperuserNavLinks />
        </>)}

        {/* <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div> */}
        {loginUser !== null && (
          <form>
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
              onClick={() => {logout()}}
            >
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        )}
      </div>
    </div>
  );
});

export default SideNav;
