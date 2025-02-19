import AuthContext from "@/components/providers/AuthProvider"
import { logout } from "@/infrastructure/auth"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"

export default function Login() {
    const {user}= useContext(AuthContext)
    const router = useRouter()
    const handleLogout = async () => {
        try {
          await logout()
        } catch (error) {
          console.log(error)
        }
      }
      useEffect(() => {
        if (!user) {
          router.push("/")
        }
      }, [user, router])
    if (!user) return
    return(
        <div>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}