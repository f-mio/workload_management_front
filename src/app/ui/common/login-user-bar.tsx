"use client"

import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { logout } from "@/app/api/users";
import { User } from "@/app/lib/types/users";


const LoginUserBar = ({loginUser}: {loginUser: User|null}) => {

  return (
    <div className="fixed top-1 right-2">
      <div className="flex flex-row px-5 py-3 bg-blue-200 rounded-md items-center">
        <div>
          { loginUser !== null ?
              <span className="align-bottom px-2" >ようこそ、{loginUser.name}さん</span>
              : "ログインしてください"
          }
        </div>
        { loginUser !== null && (
          <div className="align-middle">
            <button className="btn" onClick={() => {logout()}}>
              <ArrowRightStartOnRectangleIcon className="ms-3 w-8 text-rose-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginUserBar
