import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "./firebase"

export const login = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error(error)
        throw error
    }
}
export const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error)
        throw error
    }
}