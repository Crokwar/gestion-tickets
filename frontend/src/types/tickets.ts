export type EstadoTicket = 'en_proceso' | 'pendiente' | 'solucionado';

export interface Ticket {
    id: number;
    codigo: string;
    estado: EstadoTicket;
    fecha: string;
    hora_creacion: string;
    detalles?: string;
}

export interface TicketCreate {
    codigo: string;
    estado?: EstadoTicket;
    detalles?: string;
}

export interface TicketUpdate {
    estado?: EstadoTicket;
    detalles?: string;
}