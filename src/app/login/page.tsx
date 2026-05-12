'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { GraduationCap, ArrowRight } from 'lucide-react'
import styles from './login.module.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Verifique seu e-mail para o link de login!')
    }
    setLoading(false)
  }

  return (
    <main className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>
          <GraduationCap size={32} />
          <h2>Mágica do TCC</h2>
        </div>
        
        <h3>Entrar na sua conta</h3>
        <p>Enviaremos um link mágico para o seu e-mail. Sem senhas necessárias!</p>

        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Seu e-mail acadêmico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Receber Link Mágico'} <ArrowRight size={18} />
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}
      </div>
    </main>
  )
}
