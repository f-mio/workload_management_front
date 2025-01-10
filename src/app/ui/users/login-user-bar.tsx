"use client"


import { PowerIcon } from '@heroicons/react/24/outline';
import { logout } from "@/app/api/users";


const LoginUserBar = ({user}: undefined | any) => {
  return (
    <div className="fixed top-1 right-2">
      <div className="flex flex-row px-5 py-3  bg-blue-200 rounded-md">
        <div>{ user !== null ? <span className="align-bottom px-2" >{user.name}さん</span> : "ログインしてください"}</div>
        <div className="align-middle">{ user !== null && <button className="btn" onClick={() => {logout()}}>
          <PowerIcon className="ms-3 w-7 text-rose-600" /></button>}
        </div>
      </div>
    </div>
  )
}

export default LoginUserBar
