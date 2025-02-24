"use client"

import { useState } from "react"
import AuthForm from "@/components/ui/auth-form"
import { useRouter } from "next/navigation"

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const handleAuthSuccess = (data: any) => {
    if (data.accessToken) {
      localStorage.setItem("token", data.accessToken)
      localStorage.setItem("user", JSON.stringify(data.user))
      router.push(data.user.role === "admin" ? "/admin" : "/dashboard")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-4">
        <AuthForm type={isLogin ? "login" : "register"} onSuccess={handleAuthSuccess} />
        <p className="text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </main>
  )
}

