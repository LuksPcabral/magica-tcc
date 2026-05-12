'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  Save, Download, Settings, FileText, 
  Search, Wand2, HelpCircle, Layout,
  Bold, Italic, AlignLeft, AlignCenter, AlignJustify
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import ReferenceGenerator from '@/components/ReferenceGenerator'
import styles from './editor.module.css'

export default function EditorPage() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)

  // Verificar autenticação
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
        loadDocument(user.id)
      }
    }
    checkUser()
  }, [router])

  // Carregar documento do Supabase
  const loadDocument = async (userId: string) => {
    const { data, error } = await supabase
      .from('trabalhos')
      .select('conteudo')
      .eq('user_id', userId)
      .single()

    if (data) {
      setContent(data.conteudo)
    } else {
      setContent(`UNIVERSIDADE FEDERAL DO BRASIL\nCURSO DE TECNOLOGIA DA INFORMAÇÃO\n\n\n\nNOME DO ALUNO\n\n\n\nTÍTULO DO TRABALHO DE CONCLUSÃO DE CURSO\n\n\n\n\n\n\n\n\n\nCidade - UF\n2026`)
    }
    setLoading(false)
  }

  // Salvar documento
  const saveDocument = useCallback(async (newContent: string) => {
    if (!user) return
    setSaving(true)
    
    const { error } = await supabase
      .from('trabalhos')
      .upsert({ 
        user_id: user.id, 
        conteudo: newContent,
        updated_at: new Error().toISOString() 
      })

    setSaving(false)
  }, [user])

  // Auto-save debounced
  useEffect(() => {
    if (!content || loading) return
    const timeout = setTimeout(() => saveDocument(content), 2000)
    return () => clearTimeout(timeout)
  }, [content, saveDocument, loading])

  if (loading) return <div className={styles.loading}>Carregando seu TCC...</div>

  return (
    <div className={styles.wrapper}>
      {/* Sidebar Tool */}
      <aside className={styles.sidebar}>
        <div className={styles.sideHeader}>
          <Wand2 size={20} className={styles.magicIcon} />
          <span>Assistente IA</span>
        </div>
        
        <div className={styles.sideContent}>
          {/* Novo Bloco: Gerador de Referências */}
          <section className={styles.toolSection}>
            <h4 className={styles.sectionTitle}>Gerador de Referência</h4>
            <ReferenceGenerator />
          </section>

          <div className={styles.aiSuggestion}>
            <h4>Citação Sugerida</h4>
            <p>"A inteligência artificial não substitui o humano, mas amplia sua capacidade de síntese..." (SILVA, 2024)</p>
            <button className={styles.insertBtn}>Inserir no Texto</button>
          </div>

          <div className={styles.aiSuggestion}>
            <h4>Diálogo de Autores</h4>
            <p>Deseja confrontar Silva (2024) com as ideias de Santos (2025) sobre este parágrafo?</p>
            <button className={styles.actionBtn}>Gerar Diálogo</button>
          </div>
        </div>

        <div className={styles.sideFooter}>
          <button className={styles.sideItem}><HelpCircle size={18} /> Ajuda</button>
          <button className={styles.sideItem}><Settings size={18} /> Configurações</button>
        </div>
      </aside>

      {/* Main Editor Area */}
      <main className={styles.editorMain}>
        <header className={styles.editorToolbar}>
          <div className={styles.docTitle}>
            <FileText size={18} />
            <span>Meu_TCC_Final.docx</span>
          </div>
          
          <div className={styles.formatGroup}>
            <button><Bold size={18} /></button>
            <button><Italic size={18} /></button>
            <div className={styles.divider}></div>
            <button><AlignLeft size={18} /></button>
            <button><AlignCenter size={18} /></button>
            <button><AlignJustify size={18} /></button>
          </div>

          <div className={styles.actionGroup}>
            <button className={styles.saveBtn}>
              <Save size={18} /> {saving ? 'Salvando...' : 'Salvo'}
            </button>
            <button className={styles.downloadBtn}><Download size={18} /> Exportar PDF</button>
          </div>
        </header>

        <div className={styles.pageContainer}>
          {/* ABNT Ruler/Guides could go here */}
          <div className={styles.paper}>
            <textarea 
              className={styles.textArea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              spellCheck={false}
            />
          </div>
        </div>
      </main>

      {/* Right Utility Bar */}
      <div className={styles.utilityBar}>
        <button title="Estrutura"><Layout size={20} /></button>
        <button title="Pesquisar"><Search size={20} /></button>
      </div>
    </div>
  )
}
