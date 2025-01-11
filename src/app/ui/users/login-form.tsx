"use client"

import { useActionState, useState } from "react";
import { login } from "@/app/api/users";


export default function LoginForm() {
  // stateの宣言
  const [ state, action, pending ] = useActionState(async (state: any, formData: FormData) => {
    const userData = await login(state, formData)
    if (userData) {
      return userData
    }
  }, undefined)
  const [ formData, setFormData ] = useState({
    email: "", password: ""
  })
  // フォーム内容の変更時のハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

	return (
    <>
      <h2 className="text-3xl underline underline-offset-1 pt-3">ログインフォーム</h2>
      <form action={action} className="w-full">
        <div className="w-full flex flex-col items-center justify-center border-4 border-sky-200 pt-4">
          <div className="w-full flex flex-row pt-3 justify-center">
            <div className="flex flex-col">
              <label htmlFor="email">Email:</label>
              <input
                id="email" 
                name="email" 
                type="email" 
                placeholder="Email" 
                className="ms-2 w-60"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col ms-5">
              <label htmlFor="password">Password:</label>
              <input
                id="password" 
                name="password" 
                type="password" 
                className="ms-2 w-60"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-96 flex pt-3">
            {state?.errors?.email && <p className="ms-2 w-60 text-red-600">{state.errors.email}</p>}
            {state?.errors?.password && <p className="ms-2 text-red-600">{state.errors.password}</p>}
          </div>
          {state?.errors?.apiMessage && <p className="ms-2 w-60 text-red-600">{state.errors.apiMessage}</p>}
          <div className="w-full flex flex-row justify-center mt-3 mb-5">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              ログイン
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
