'use client'

import { useState } from 'react'
import { Book, Link, Wand2, Copy, Plus } from 'lucide-react'
import styles from './ReferenceGenerator.module.css'

export default function ReferenceGenerator() {
  const [mode, setMode] = useState<'manual' | 'magic'>('magic')
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const generateReference = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [{ 
            text: `Gere uma referência bibliográfica no padrão ABNT (NBR 6023) com estas informações: ${input}. Retorne APENAS a string formatada.` 
          }] 
        }),
      })
      const data = await response.json()
      setResult(data.text)
    } catch (error) {
      setResult('Erro ao gerar referência. Tente novamente.')
    }
    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button 
          className={mode === 'magic' ? styles.activeTab : ''} 
          onClick={() => setMode('magic')}
        >
          <Wand2 size={16} /> Modo Mágico
        </button>
        <button 
          className={mode === 'manual' ? styles.activeTab : ''} 
          onClick={() => setMode('manual')}
        >
          <Book size={16} /> Manual
        </button>
      </div>

      <div className={styles.content}>
        {mode === 'magic' ? (
          <div className={styles.magicInput}>
            <p className={styles.label}>Cole o link ou os dados brutos da obra:</p>
            <textarea 
              placeholder="Ex: https://link-do-artigo.com ou Silva, Joao. Livro de Teste, 2024, Editora XYZ"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className={styles.generateBtn} onClick={generateReference} disabled={loading}>
              {loading ? 'Gerando...' : 'Gerar Referência ABNT'}
            </button>
          </div>
        ) : (
          <div className={styles.manualInput}>
            <p>Formulário manual em breve...</p>
          </div>
        )}

        {result && (
          <div className={styles.resultBox}>
            <div className={styles.resultHeader}>
              <span>Resultado:</span>
              <button onClick={() => navigator.clipboard.writeText(result)}>
                <Copy size={14} /> Copiar
              </button>
            </div>
            <p className={styles.resultText}>{result}</p>
          </div>
        )}
      </div>
    </div>
  )
}
