"use client"

import { useState, useActionState } from 'react'
import { signup } from '@/app/api/users'


export function SignupForm() {
  // stateの宣言
  const [state, action, pending] = useActionState(signup, undefined)
  const [formData, setFormData] = useState({
    family_name: '',
    first_name: '',
    name: '',
    email: '',
    password: ''
  })
  // フォーム内容の変更時のハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
 
  return (
    <form action={action}>
      <div className="w-full flex flex-col items-center justify-center border-4 border-sky-200 pt-4">
        <div className="w-full flex flex-row pt-3 justify-center">
          <div className="flex flex-col">
            <label htmlFor="family_name">姓:</label>
            <input
              id="family_name" 
              name="family_name" 
              placeholder="姓" 
              className="ms-2 w-60"
              value={formData.family_name}
              onChange={handleChange}
            />
            {state?.errors?.family_name && <p className="ms-2 w-60 text-red-600">{state.errors.family_name}</p>}
          </div>
          <div className="flex flex-col ms-5">
            <label htmlFor="first_name">名:</label>
            <input
              id="first_name" 
              name="first_name" 
              placeholder="名" 
              className="ms-2 w-60"
              value={formData.first_name}
              onChange={handleChange}
            />
            {state?.errors?.first_name && <p className="ms-2 w-60 text-red-600">{state.errors.first_name}</p>}
          </div>
        </div>
        <div className="w-full flex flex-row pt-3 justify-center">
          <div className="flex flex-col">
            <label htmlFor="name">ユーザ名:</label>
            <input
              id="name" 
              name="name" 
              placeholder="ユーザ名" 
              className="ms-2 w-60"
              value={formData.name}
              onChange={handleChange}
            />
            {state?.errors?.name && <p className="ms-2 w-60 text-red-600">{state.errors.name}</p>}
          </div>
          <div className="flex flex-col ms-5">
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
            {state?.errors?.email && <p className="ms-2 w-60 text-red-600">{state.errors.email}</p>}
          </div>
        </div>
        <div className="w-full flex flex-row pt-3 justify-center">
          <div className="flex flex-col pt-3">
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
          <div className="flex flex-col ms-5">
            <div className="spacer ms-2 w-60"></div>
          </div>
        </div>
        <div className="w-96 flex pt-3">
          {state?.errors?.password && <p className="ms-2 text-red-600">{state.errors.password}</p>}
        </div>
        <div className="w-full flex flex-row justify-center mt-3 mb-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            ユーザ登録
          </button>
        </div>
      </div>
    </form>
  )
}
