"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Mic, Send } from "lucide-react"

const exampleQuestions = [
  "¿Cuáles son las políticas actuales de ACME sobre trabajo remoto?",
  "Encuentra el último reporte de ventas del Q2",
  "¿Quién es el contacto para la campaña de marketing?",
  "¿Qué reuniones tengo programadas para hoy?",
]

export default function Home() {
  const [input, setInput] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    // Encode the question for URL
    const encodedQuestion = encodeURIComponent(input)
    router.push(`/chat?q=${encodedQuestion}`)
  }

  const handleExampleClick = (question: string) => {
    const encodedQuestion = encodeURIComponent(question)
    router.push(`/chat?q=${encodedQuestion}`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {/* Logo */}
      <div className="absolute top-4 left-4">
        <Image src="/memoryai-logo.png" alt="MemoryAI" width={60} height={60} />
      </div>

      <div className="w-full max-w-2xl px-4 flex flex-col items-center">
        {/* Main content */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            MemoryAI
          </h1>
          <p className="text-gray-400 text-lg">La memoria empresarial de tu organización</p>
        </div>

        {/* Central question */}
        <h2 className="text-2xl font-medium text-center mb-8">¿En qué puedo ayudarte hoy?</h2>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="w-full mb-8">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pregúntame lo que quieras sobre ACME..."
              className="w-full py-6 pl-4 pr-12 bg-gray-800/50 border-gray-700 rounded-xl text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-gray-700 text-gray-400"
              disabled={!input.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-center mt-3 space-x-2">
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="bg-transparent border-gray-700 hover:bg-gray-800 text-gray-400"
            >
              <Sparkles className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              className="bg-transparent border-gray-700 hover:bg-gray-800 text-gray-400"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </form>

        {/* Example questions */}
        <div className="w-full">
          <h3 className="text-sm text-gray-500 mb-3 text-center">Ejemplos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="bg-gray-800/30 border-gray-700 hover:bg-gray-700 text-gray-300 justify-start h-auto py-3 px-4 text-sm font-normal whitespace-normal text-left leading-relaxed"
                onClick={() => handleExampleClick(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
