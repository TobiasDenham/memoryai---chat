import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>MemoryAI - Enterprise Memory Assistant</title>
        <meta name="description" content="Your AI-powered enterprise memory system for ACME Corporation" />
      </Head>
      
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="border-b border-gray-800 py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/memoryai-logo.png"
                alt="MemoryAI"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="text-xl font-semibold">MemoryAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white px-3 py-1 rounded">
                Empresa
              </button>
              <button className="text-gray-400 hover:text-white px-3 py-1 rounded">
                Ayuda
              </button>
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Bienvenido a MemoryAI, Andrés
            </h1>
            <p className="text-gray-400 text-lg">
              Tu asistente de memoria empresarial de ACME Corporation
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="¿Qué necesitas saber sobre ACME?"
                className="w-full py-4 pl-12 pr-20 text-lg bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder:text-gray-400 focus:border-teal-500 focus:outline-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    router.push(`/chat?q=${encodeURIComponent(e.target.value)}`)
                  }
                }}
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link href="/chat?q=¿Cuáles son las políticas de trabajo remoto en ACME?">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Políticas de Empresa</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Consulta políticas, procedimientos y normas de ACME
                </p>
              </div>
            </Link>

            <Link href="/chat?q=¿Quiénes son mis stakeholders clave en el proyecto Digital Transformation Q1?">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Proyectos Actuales</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Información sobre proyectos en curso y stakeholders
                </p>
              </div>
            </Link>

            <Link href="/chat?q=¿Cómo puedo acceder a Tableau y qué dashboards debería revisar?">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Herramientas</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Guías de uso de Tableau, Salesforce y otras herramientas
                </p>
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-gray-400">Revisaste el organigrama de ACME</span>
                <span className="text-gray-500">hace 2 horas</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-400">Consultaste políticas de trabajo remoto</span>
                <span className="text-gray-500">ayer</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">Accediste a información del proyecto LATAM</span>
                <span className="text-gray-500">hace 3 días</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
} 