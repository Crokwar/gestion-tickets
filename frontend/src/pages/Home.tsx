import React from 'react';

export const Home: React.FC = () => {
  const fechaActual = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">🎫 Bitácora de Tickets</h1>
              <p className="text-blue-100 mt-1 capitalize">📅 {fechaActual}</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition">
                Hoy
              </button>
              <button className="bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition">
                Historial
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="container mx-auto px-4 py-8">
        {/* Campo para agregar ticket */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form className="flex gap-3">
            <input
              type="text"
              placeholder="Código del ticket (ej: TICKET - 001)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
            >
              <span>➕</span>
              Agregar Ticket
            </button>
          </form>
        </div>

        {/* EN PROCESO */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">💥 EN PROCESO</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              0
            </span>
          </div>
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            No hay tickets en proceso
          </div>
        </section>

        {/* PENDIENTES */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">⏸ PENDIENTES</h2>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              0
            </span>
          </div>
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            No hay tickets pendientes
          </div>
        </section>

        {/* SOLUCIONADOS */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">✅ SOLUCIONADOS</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              0
            </span>
          </div>
          <div className="bg-white rounded-lg p-8 text-center text-gray-500">
            No hay tickets solucionados hoy
          </div>
        </section>
      </main>

      {/* ÁREA DE NOTAS (VERDE) */}
      <div className="bg-green-50 border-t-4 border-green-500 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📝 Notas y Comandos
          </h2>
          <div className="bg-white rounded-lg p-6 text-gray-600">
            Comandos, procedimientos y notas importantes...
          </div>
        </div>
      </div>
    </div>
  );
};