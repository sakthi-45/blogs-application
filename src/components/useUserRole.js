import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

export function useUserRole() {
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!active) return
      setRole(null)

      if (!user) {
        setLoading(false)
        return
      }

      setLoading(true)

      try {
        const profile = await getDoc(doc(db, 'users', user.uid))
        if (active && auth.currentUser?.uid === user.uid) {
          setRole(profile.exists() ? profile.data().role : null)
        }
      } catch {
        if (active) setRole(null)
      } finally {
        if (active && auth.currentUser?.uid === user.uid) setLoading(false)
      }
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [])

  return { role, loading }
}