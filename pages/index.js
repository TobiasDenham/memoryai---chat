import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

const exampleQuestions = [
  "¿Cuáles son las políticas actuales de ACME sobre trabajo remoto?",
  "Encuentra el último reporte de ventas del Q2",
  "¿Quién es el contacto para la campaña de marketing?",
  "¿Qué reuniones tengo programadas para hoy?",
]

export default function Home() {
  const [input, setInput] = useState("")
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Encode the question for URL
    const encodedQuestion = encodeURIComponent(input)
    router.push(`/chat?q=${encodedQuestion}`)
  }

  const handleExampleClick = (question) => {
    const encodedQuestion = encodeURIComponent(question)
    router.push(`/chat?q=${encodedQuestion}`)
  }

  return (
    <>
      <Head>
        <title>MemoryAI - Enterprise Memory Assistant</title>
        <meta name="description" content="Your AI-powered enterprise memory system for ACME Corporation" />
      </Head>
      
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
          <h2 className="text-2xl font-medium text-center mb-8">¿En qué puedo ayudarte hoy, Andrés?</h2>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="w-full mb-8">
            <div className="relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pregúntame lo que quieras sobre ACME..."
                className="w-full py-6 pl-4 pr-12 bg-gray-800/50 border-gray-700 rounded-xl text-white placeholder:text-gray-400 focus:border-teal-500 focus:ring-teal-500 focus:outline-none text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-gray-700 text-gray-400 p-3 rounded-lg transition-colors"
                disabled={!input.trim()}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center mt-3 space-x-2">
              <button
                type="button"
                className="bg-transparent border-gray-700 hover:bg-gray-800 text-gray-400 border rounded-lg p-2 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                </svg>
              </button>
              <button
                type="button"
                className="bg-transparent border-gray-700 hover:bg-gray-800 text-gray-400 border rounded-lg p-2 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Example questions */}
          <div className="w-full">
            <h3 className="text-sm text-gray-500 mb-3 text-center">Ejemplos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  className="bg-gray-800/30 border-gray-700 hover:bg-gray-700 text-gray-300 justify-start h-auto py-3 px-4 text-sm font-normal whitespace-normal text-left leading-relaxed border rounded-lg transition-colors"
                  onClick={() => handleExampleClick(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 