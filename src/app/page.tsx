'use client'

import { useState, useEffect } from 'react'
import { Sparkles, GraduationCap, PenTool, BookOpen, ChevronRight, MessageSquare } from 'lucide-react'
import styles from './page.module.css'

export default function Home() {
  const [isStarted, setIsStarted] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Olá! Sou o Oráculo da Mágica do TCC. ✨ Qual é a sua ideia inicial para o trabalho? Pode ser um tema vago ou algo bem específico!' }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const newMessages = [...messages, { role: 'user', text: inputValue }]
    setMessages(newMessages)
    setInputValue('')

    // Simulação de resposta da IA
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'Interessante! Com base nisso, aqui estão 3 caminhos possíveis: \n1. Abordagem Prática \n2. Estudo de Caso \n3. Revisão Bibliográfica. \n\nQual desses te atrai mais?' 
      }])
    }, 1000)
  }

  return (
    <main className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.iconBox}>
            <GraduationCap className={styles.icon} />
          </div>
          <h1>Mágica do TCC</h1>
        </div>
        <nav className={styles.nav}>
          <a href="#">Como Funciona</a>
          <a href="#">Normas ABNT</a>
          <button className={styles.loginBtn}>Entrar</button>
        </nav>
      </header>

      {!isStarted ? (
        <section className={`${styles.hero} animate-fade`}>
          <div className={styles.badge}>
            <Sparkles size={14} />
            <span>Escrita Acadêmica Inteligente</span>
          </div>
          <h2 className={styles.title}>
            Transforme sua ideia em um <br />
            <span>TCC Impecável</span> com IA.
          </h2>
          <p className={styles.subtitle}>
            Escreva conforme as normas ABNT de forma automática. <br />
            Deixe a IA conectar os autores enquanto você foca no seu pensamento.
          </p>
          
          <div className={styles.ctaGroup}>
            <button 
              className={styles.primaryBtn}
              onClick={() => setIsStarted(true)}
            >
              Começar Agora <ChevronRight size={18} />
            </button>
            <button className={styles.secondaryBtn}>Ver Exemplo</button>
          </div>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <PenTool size={20} />
              <span>Normas ABNT 2026</span>
            </div>
            <div className={styles.featureItem}>
              <MessageSquare size={20} />
              <span>IA Especializada</span>
            </div>
            <div className={styles.featureItem}>
              <BookOpen size={20} />
              <span>Citações Automáticas</span>
            </div>
          </div>
        </section>
      ) : (
        <section className={`${styles.chatInterface} animate-fade`}>
          <div className={styles.chatHeader}>
            <h3>O Oráculo</h3>
            <p>Definindo o seu tema e estrutura...</p>
          </div>
          
          <div className={styles.messageList}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${styles[msg.role]}`}>
                <div className={styles.avatar}>
                  {msg.role === 'ai' ? <Sparkles size={16} /> : 'U'}
                </div>
                <div className={styles.text}>{msg.text}</div>
              </div>
            ))}
          </div>

          <form className={styles.inputArea} onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder="Digite sua ideia aqui..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </form>
          
          <div className={styles.chatFooter}>
            <button 
              className={styles.skipBtn}
              onClick={() => window.location.href = '/editor'}
            >
              Pular para o Editor →
            </button>
          </div>
        </section>
      )}
    </main>
  )
}
