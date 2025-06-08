"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Mic, Sparkles, Plus, MessageSquare, Search, Edit3 } from "lucide-react"
import Link from "next/link"

// Mock past conversations
const pastConversations = [
  { id: "1", title: "Políticas de trabajo remoto", date: "Hoy" },
  { id: "2", title: "Reporte de ventas Q2", date: "Ayer" },
  { id: "3", title: "Contactos de marketing", date: "2 días" },
  { id: "4", title: "Reuniones programadas", date: "3 días" },
  { id: "5", title: "Análisis de datos CRM", date: "1 semana" },
]

export default function ChatPage() {
  const searchParams = useSearchParams()
  const initialQuestion = searchParams.get("q") || ""
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: initialQuestion ? [{ id: "1", role: "user", content: initialQuestion }] : [],
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 bg-gray-900 border-r border-gray-800 overflow-hidden`}
      >
        <div className="p-4">
          <Link href="/" className="mb-6 block"></Link>

          <Button className="w-full mb-4 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo chat
          </Button>

          <div className="mb-4">
            <Button variant="ghost" className="w-full justify-start text-gray-400 hover:bg-gray-800">
              <Search className="h-4 w-4 mr-2" />
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
                <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
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
            <Edit3 className="h-5 w-5" />
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
                    <div
                      className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
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
                className="bg-transparent hover:bg-gray-700 text-gray-400 border border-gray-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <div className="relative flex-1">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Pregunta lo que quieras"
                  className="w-full py-3 pl-4 pr-4 bg-gray-800/50 border-gray-700 rounded-xl text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <Button
                type="button"
                size="icon"
                className="bg-transparent hover:bg-gray-700 text-gray-400 border border-gray-700"
              >
                <Sparkles className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                className="bg-transparent hover:bg-gray-700 text-gray-400 border border-gray-700"
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button
                type="submit"
                size="icon"
                className="bg-transparent hover:bg-gray-700 text-gray-400 border border-gray-700"
                disabled={!input.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-gray-500 text-center mt-2">
              MemoryAI puede cometer errores. Comprueba la información importante.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
