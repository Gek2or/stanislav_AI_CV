import { Bot, Send, Sparkles, User } from 'lucide-react'
import { useEffect, useState } from 'react'

const keywordMap = [
  ['bitonet', 6], ['why', 0], ['miksi', 0], ['почему', 0], ['чому', 0],
  ['model', 2], ['модел', 2], ['malli', 2],
  ['autom', 3], ['simpl', 3], ['упрост', 3], ['спрост', 3],
  ['halluc', 4], ['quality', 4], ['качест', 4], ['якіст', 4], ['laatu', 4],
  ['python', 5], ['api', 5], ['rag', 5], ['agent', 5],
  ['use ai', 1], ['käyttää ai', 1], ['использ', 1], ['використ', 1],
]

export default function Assistant({ t, lang }) {
  const [messages, setMessages] = useState([{ type: 'bot', text: t.assistantIntro }])
  const [input, setInput] = useState('')

  useEffect(() => {
    setMessages([{ type: 'bot', text: t.assistantIntro }])
    setInput('')
  }, [lang, t.assistantIntro])

  const ask = (question, forcedIndex) => {
    const value = question.trim()
    if (!value) return
    const lower = value.toLowerCase()
    let answerIndex = forcedIndex
    if (answerIndex === undefined) {
      answerIndex = keywordMap.find(([keyword]) => lower.includes(keyword))?.[1] ?? 0
    }
    setMessages((prev) => [
      ...prev,
      { type: 'user', text: value },
      { type: 'bot', text: t.answers[answerIndex] },
    ])
    setInput('')
  }

  return (
    <section className="contentSection sectionShell assistantSection" id="assistant">
      <div className="assistantIntroGrid">
        <div>
          <p className="sectionNumber">05</p>
          <p className="overline">OPTIONAL INTERACTIVE DETAIL</p>
          <h2>{t.assistantTitle}</h2>
        </div>
        <p>{t.assistantIntro}</p>
      </div>

      <div className="assistantShell">
        <div className="suggestedQuestions">
          {t.questions.map((question, index) => (
            <button key={question} onClick={() => ask(question, index)}><Sparkles size={14}/>{question}</button>
          ))}
        </div>

        <div className="assistantChat">
          {messages.map((message, index) => (
            <div className={`chatMessage ${message.type}`} key={`${index}-${message.text.slice(0, 12)}`}>
              <div className="chatIcon">{message.type === 'bot' ? <Bot size={17}/> : <User size={17}/>}</div>
              <p>{message.text}</p>
            </div>
          ))}
        </div>

        <form className="assistantInput" onSubmit={(event) => { event.preventDefault(); ask(input) }}>
          <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={t.assistantPlaceholder}/>
          <button type="submit" aria-label={t.assistantSend}><Send size={18}/><span>{t.assistantSend}</span></button>
        </form>
      </div>
    </section>
  )
}
