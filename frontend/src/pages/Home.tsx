import React, { useState } from "react";
import type { Ticket, EstadoTicket } from "../types/tickets";
import { crearTicket, actualizarTicket, eliminarTicket } from "../services/api";

export const Home: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  const fechaActual = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleAgregarTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!codigo.trim()) {
      setError("Ingresa un código de ticket");
      return;
    }

    try {
      const nuevoTicket = await crearTicket({ codigo: codigo.trim() });
      setTickets([nuevoTicket, ...tickets]);
      setCodigo("");
      setError("");
    } catch (err) {
      setError("Error al crear ticket");
      console.error(err);
    }
  };

  const handleCambiarEstado = async (id: number, nuevoEstado: EstadoTicket) => {
    console.log(id, nuevoEstado);
    try {
      const ticketActualizado = await actualizarTicket(id, {
        estado: nuevoEstado,
      });
      setTickets(tickets.map((t) => (t.id === id ? ticketActualizado : t)));
    } catch (err) {
      console.error("Error al cambiar estado:", err);
      alert("Error al cambiar estado del ticket");
    }
  };

  const handleEliminar = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este ticket?")) return;

    try {
      await eliminarTicket(id);
      setTickets(tickets.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Error al eliminar ticket");
    }
  };

  const copiarAlPortapapeles = (texto: string) => {
    navigator.clipboard.writeText(texto);
    alert("Código copiado: " + texto);
  };

  // Agrupar tickets por estado
  const ticketsEnProceso = tickets.filter((t) => t.estado === "en_proceso");
  const ticketsPendientes = tickets.filter((t) => t.estado === "pendiente");
  const ticketsSolucionados = tickets.filter((t) => t.estado === "solucionado");

  /* if (cargando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">⏳</div>
          <p className="text-gray-600">Cargando tickets...</p>
        </div>
      </div>
    );
  }*/

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
        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Campo para agregar ticket */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleAgregarTicket} className="flex gap-3">
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Código del ticket (ej: ZCP520336)"
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
              {ticketsEnProceso.length}
            </span>
          </div>

          <div>
            <div className="space-y-3 bg-white shadow-lg rounded-md p-0.5">
              {ticketsEnProceso.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                  No hay tickets en proceso
                </div>
              ) : (
                ticketsEnProceso.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-white rounded-lg shadow m-2 p-2 hover:shadow-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-semibold text-gray-800">
                            {ticket.codigo}
                          </span>
                          <button
                            onClick={() => copiarAlPortapapeles(ticket.codigo)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            📋 Copiar
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() =>
                            handleCambiarEstado(ticket.id, "solucionado")
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition text-sm"
                          title="Marcar como solucionado"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() =>
                            handleCambiarEstado(ticket.id, "pendiente")
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition text-sm"
                          title="Mover a pendientes"
                        >
                          ⏸
                        </button>
                        <button
                          onClick={() => handleEliminar(ticket.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition text-sm"
                          title="Eliminar"
                        >
                          ✗
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <div className="flex gap-6">
          {/*TICKETS SOLUCIONADOS*/}
          <section className=" flex-1 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                ✅ SOLUCIONADOS
              </h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {ticketsSolucionados.length}
              </span>
            </div>
            <div className="space-y-3">
              {ticketsSolucionados.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                  No hay tickets solucionados hoy
                </div>
              ) : (
                ticketsSolucionados.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-white rounded-lg shadow-md p-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-semibold text-gray-800">
                            {ticket.codigo}
                          </span>
                          <button
                            onClick={() => copiarAlPortapapeles(ticket.codigo)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            📋 Copiar
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() =>
                            handleCambiarEstado(ticket.id, "pendiente")
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition text-sm"
                          title="Mover a pendientes"
                        >
                          ⏸
                        </button>
                        <button
                          onClick={() =>
                            handleCambiarEstado(ticket.id, "en_proceso")
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition text-sm"
                          title="Volver a en proceso"
                        >
                          ▶
                        </button>
                        <button
                          onClick={() => handleEliminar(ticket.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition text-sm"
                        >
                          ✗
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* TICKETS PENDIENTES */}
          <section className="flex-1 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">⏸ PENDIENTES</h2>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                {ticketsPendientes.length}
              </span>
            </div>
            <div className="space-y-3">
              {ticketsPendientes.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                  No hay tickets pendientes
                </div>
              ) : (
                ticketsPendientes.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-white rounded-lg shadow-md p-2 hover:shadow-lg transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-semibold text-gray-800">
                            {ticket.codigo}
                          </span>
                          <button
                            onClick={() => copiarAlPortapapeles(ticket.codigo)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            📋 Copiar
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() =>
                            handleCambiarEstado(ticket.id, "solucionado")
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition text-sm"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() =>
                            handleCambiarEstado(ticket.id, "en_proceso")
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition text-sm"
                          title="Volver a en proceso"
                        >
                          ▶
                        </button>
                        <button
                          onClick={() => handleEliminar(ticket.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition text-sm"
                        >
                          ✗
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
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
