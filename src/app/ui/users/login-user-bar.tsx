"use client"

import { useContext } from "react";
import { PowerIcon } from '@heroicons/react/24/outline';
import { logout } from "@/app/api/users";
import { User } from "@/app/lib/types/users";
import { UserContext } from "@/app/lib/contexts/UserContext";


const LoginUserBar = () => {

  const loginUser = useContext<User>(UserContext);

  return (
    <div className="fixed top-1 right-2">
      <div className="flex flex-row px-5 py-3  bg-blue-200 rounded-md">
        <div>
          { loginUser !== null ?
              <span className="align-bottom px-2" >{loginUser.name}さん</span>
              : "ログインしてください"
          }
        </div>
          { loginUser !== null && (
            <div className="align-middle">
              <button className="btn" onClick={() => {logout()}}>
                <PowerIcon className="ms-3 w-7 text-rose-600" />
              </button>
            </div>
          )}
        </div>
    </div>
  )
}

export default LoginUserBar
