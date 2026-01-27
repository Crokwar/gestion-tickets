import type { Ticket, TicketCreate, TicketUpdate } from '../types/tickets';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const headers = {
    'Content-Type': 'application/json',
};

//Manejo de errores
async function handleResponse<T>(response:Response): Promise<T> {
    if(!response.ok) {
        const error = await response.json().catch(() => ({detail: 'Error desconocido'}));
        throw new Error(error.detail || 'Error en la petición');
    }
    return response.json();
}

//===============================TICKETS===================================================

export async function crearTicket(ticket:TicketCreate): Promise<Ticket> {
    const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers,
        body: JSON.stringify(ticket),
    });
    return handleResponse<Ticket>(response);
}

export async function actualizarTicket(id: number, datos: TicketUpdate): Promise<Ticket> {
  const response = await fetch(`${API_URL}/tickets/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(datos),
  });
  return handleResponse<Ticket>(response);
}


export async function eliminarTicket(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/tickets/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) {
    throw new Error('Error al eliminar ticket');
  }
}