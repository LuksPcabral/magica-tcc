'use client'

import { useState } from 'react'
import { 
  Save, Download, Settings, FileText, 
  Search, Wand2, HelpCircle, Layout,
  Bold, Italic, AlignLeft, AlignCenter, AlignJustify
} from 'lucide-react'
import styles from './editor.module.css'

export default function EditorPage() {
  const [content, setContent] = useState(`UNIVERSIDADE FEDERAL DO BRASIL\nCURSO DE TECNOLOGIA DA INFORMAÇÃO\n\n\n\nNOME DO ALUNO\n\n\n\nTÍTULO DO TRABALHO DE CONCLUSÃO DE CURSO\n\n\n\n\n\n\n\n\n\nCidade - UF\n2026`)

  return (
    <div className={styles.wrapper}>
      {/* Sidebar Tool */}
      <aside className={styles.sidebar}>
        <div className={styles.sideHeader}>
          <Wand2 size={20} className={styles.magicIcon} />
          <span>Assistente IA</span>
        </div>
        
        <div className={styles.sideContent}>
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
            <button className={styles.saveBtn}><Save size={18} /> Salvar</button>
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
