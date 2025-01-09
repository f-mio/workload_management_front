"use client"


import { PowerIcon } from '@heroicons/react/24/outline';
import { logout } from "@/app/api/users";


const LoginUserBar = ({user}: undefined | any) => {
  return (
    <div className="w-full flex">
      <div>{ user !== null ? user.name : "ログインしてください"}</div>
      <div>{ user !== null && <button className="btn" onClick={() => {logout()}}>
        <PowerIcon className="w-6" /></button>}
      </div>
    </div>
  )
}

export default LoginUserBar
