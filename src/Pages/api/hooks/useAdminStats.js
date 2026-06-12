import { useState, useEffect } from 'react'
import { getAdminStats } from '../api/admin.js'

export default function useAdminStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAdminStats().then(setStats).finally(() => setLoading(false))
  }, [])

  return { stats, loading }
}