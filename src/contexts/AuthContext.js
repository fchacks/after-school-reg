import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import firebase from "firebase/app";
import "firebase";
import "firebase/auth"

const functions = firebase.functions();


// const adminForm = document.querySelector("input[name = '../components/Dashboard/admin-actions']")
// adminForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const adminEmail = document.querySelector("#admin-email").value;
//   const addAdminRole = functions.httpsCallable("addAdminRole");
//   addAdminRole({ email: adminEmail }).then(result =>{
//     console.log(result)
//   })
// })

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}



export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}