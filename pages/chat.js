import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

// Custom Button component
function Button({ variant = 'default', size = 'default', className = '', children, ...props }) {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variants = {
    default: 'bg-gray-900 text-white hover:bg-gray-800',
    ghost: 'bg-transparent hover:bg-gray-800',
    outline: 'border border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300'
  }
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    icon: 'h-10 w-10',
    sm: 'h-8 px-3'
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Custom Input component
function Input({ className = '', ...props }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

// Mock past conversations
const pastConversations = [
  { id: "1", title: "Políticas de trabajo remoto", date: "Hoy" },
  { id: "2", title: "Reporte de ventas Q2", date: "Ayer" },
  { id: "3", title: "Contactos de marketing", date: "2 días" },
  { id: "4", title: "Reuniones programadas", date: "3 días" },
  { id: "5", title: "Análisis de datos CRM", date: "1 semana" },
]

export default function ChatPage() {
  const router = useRouter()
  const { q: initialQuestion } = router.query
  const messagesEndRef = useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Initialize with question from URL
  useEffect(() => {
    if (initialQuestion && typeof initialQuestion === 'string') {
      setMessages([{
        id: "1",
        role: "user",
        content: initialQuestion
      }])
      // Auto-send the initial question
      setTimeout(() => {
        handleSubmit(null, initialQuestion)
      }, 500)
    }
  }, [initialQuestion])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSubmit = async (e, questionText = null) => {
    if (e) e.preventDefault()
    const question = questionText || input.trim()
    if (!question || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: question
    }

    const newMessages = questionText ? messages : [...messages, userMessage]
    if (!questionText) {
      setMessages(newMessages)
      setInput('')
    }
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch response')
      }

      const data = await response.json()
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message.content
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, ocurrió un error al procesar tu mensaje. Por favor, inténtalo de nuevo.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Chat - MemoryAI</title>
      </Head>
      
      <div className="flex h-screen bg-black text-white">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 bg-gray-900 border-r border-gray-800 overflow-hidden`}>
          <div className="p-4">
            <Link href="/" className="mb-6 block">
              <div className="flex items-center space-x-2">
                <Image src="/memoryai-logo.png" alt="MemoryAI" width={24} height={24} />
                <span className="font-semibold">MemoryAI</span>
              </div>
            </Link>

            <Button className="w-full mb-4 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700">
              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo chat
            </Button>

            <div className="mb-4">
              <Button variant="ghost" className="w-full justify-start text-gray-400 hover:bg-gray-800">
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar chats
              </Button>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Conversaciones</h3>
              {pastConversations.map((conversation) => (
                <Button
                  key={conversation.id}
                  variant="ghost"
                  className="w-full justify-start text-left text-gray-300 hover:bg-gray-800 h-auto py-2"
                >
                  <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-sm">{conversation.title}</div>
                    <div className="text-xs text-gray-500">{conversation.date}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b border-gray-800 py-3 px-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:bg-gray-800"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
            <div className="text-center">
              <span className="font-medium">MemoryAI</span>
            </div>
            <div></div>
          </header>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-3 ${
                      message.role === "user" ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-100"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg px-4 py-3 max-w-[70%]">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area */}
          <div className="border-t border-gray-800 p-4">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Button>
                <div className="relative flex-1">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pregunta lo que quieras"
                    className="w-full py-3 pl-4 pr-4 bg-gray-800/50 border-gray-700 rounded-xl text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                  </svg>
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  variant="outline"
                  disabled={!input.trim() || isLoading}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </Button>
              </form>
              <p className="text-xs text-gray-500 text-center mt-2">
                MemoryAI puede cometer errores. Comprueba la información importante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 