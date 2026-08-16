import { Bot, Send, Sparkles, User } from 'lucide-react'
import { useEffect, useState } from 'react'

const keywordMap = [
  ['bitonet', 6],
  ['business', 5], ['entrepreneur', 5], ['yritt', 5], ['бизнес', 5], ['підприєм', 5],
  ['python', 4], ['api', 4], ['rag', 4], ['agent', 4], ['technical', 4], ['технич', 4], ['техніч', 4], ['tekn', 4],
  ['trust', 3], ['halluc', 3], ['quality', 3], ['review', 3], ['довер', 3], ['довір', 3], ['качест', 3], ['якіст', 3], ['luot', 3], ['laatu', 3],
  ['ci', 2], ['delivery', 2], ['deploy', 2], ['github actions', 2], ['достав', 2], ['toimit', 2],
  ['problem', 1], ['real software', 1], ['workflow', 1], ['проблем', 1], ['ongelm', 1],
  ['why', 0], ['miksi', 0], ['почему', 0], ['чому', 0], ['role', 0], ['rooli', 0],
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
          <p className="overline">{t.nav[3]}</p>
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
