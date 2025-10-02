let reservasGlobales = [];
let filtroActual = 'todas';

document.addEventListener('DOMContentLoaded', function() {
    cargarReservas();
});


function cargarReservas() {
    const reservasGuardadas = localStorage.getItem('reservas');
    if (reservasGuardadas) {
        reservasGlobales = JSON.parse(reservasGuardadas);
        mostrarReservas(reservasGlobales);
    } else {
        mostrarMensajeVacio();
    }
}


function mostrarReservas(reservas) {
    const tbody = document.getElementById('tablaReservas');
    
    if (reservas.length === 0) {
        mostrarMensajeVacio();
        return;
    }

    tbody.innerHTML = '';

    reservas.forEach(reserva => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-estado', reserva.estado);
        
        const checkInFormateado = new Date(reserva.checkIn).toLocaleDateString('es-ES');
        const checkOutFormateado = new Date(reserva.checkOut).toLocaleDateString('es-ES');

        let estadoBadge = '';
        if (reserva.estado === 'pendiente') {
            estadoBadge = '<span class="badge bg-warning text-dark">Pendiente</span>';
        } else if (reserva.estado === 'confirmada') {
            estadoBadge = '<span class="badge bg-success">Confirmada</span>';
        } else if (reserva.estado === 'cancelada') {
            estadoBadge = '<span class="badge bg-danger">Cancelada</span>';
        }

        tr.innerHTML = `
            <td>${reserva.id}</td>
            <td>${reserva.nombre}</td>
            <td>${reserva.tipoHabitacion}</td>
            <td>${checkInFormateado}</td>
            <td>${checkOutFormateado}</td>
            <td>${reserva.noches}</td>
            <td>$${reserva.precioTotal}</td>
            <td>${estadoBadge}</td>
            <td>
                <div class="btn-group btn-group-sm" role="group">
                    ${reserva.estado === 'pendiente' ? 
                        `<button class="btn btn-success" onclick="confirmarReserva(${reserva.id})" title="Confirmar">
                            ✓
                        </button>` : ''}
                    <button class="btn btn-info" onclick="verDetalles(${reserva.id})" title="Ver detalles">
                        👁
                    </button>
                    ${reserva.estado !== 'cancelada' ?
                        `<button class="btn btn-danger" onclick="cancelarReserva(${reserva.id})" title="Cancelar">
                            ✕
                        </button>` : ''}
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
}


function mostrarMensajeVacio() {
    const tbody = document.getElementById('tablaReservas');
    tbody.innerHTML = `
        <tr>
            <td colspan="9" class="text-center text-muted py-4">
                No hay reservas ${filtroActual !== 'todas' ? filtroActual + 's' : 'registradas'}
            </td>
        </tr>
    `;
}


function filtrarReservas(estado) {
    filtroActual = estado;
    
  
    document.querySelectorAll('.btn-group button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    let reservasFiltradas;
    if (estado === 'todas') {
        reservasFiltradas = reservasGlobales;
    } else {
        reservasFiltradas = reservasGlobales.filter(r => r.estado === estado);
    }

    mostrarReservas(reservasFiltradas);
}

function confirmarReserva(id) {
    if (confirm('¿Confirmar esta reserva?')) {
        reservasGlobales = reservasGlobales.map(reserva => {
            if (reserva.id === id) {
                reserva.estado = 'confirmada';
            }
            return reserva;
        });

        localStorage.setItem('reservas', JSON.stringify(reservasGlobales));
        cargarReservas();
        alert('Reserva confirmada exitosamente');
    }
}

function cancelarReserva(id) {
    if (confirm('¿Está seguro que desea cancelar esta reserva?')) {
        reservasGlobales = reservasGlobales.map(reserva => {
            if (reserva.id === id) {
                reserva.estado = 'cancelada';
            }
            return reserva;
        });

        localStorage.setItem('reservas', JSON.stringify(reservasGlobales));
        cargarReservas();
        alert('Reserva cancelada');
    }
}

function verDetalles(id) {
    const reserva = reservasGlobales.find(r => r.id === id);
    
    if (reserva) {
        const checkInFormateado = new Date(reserva.checkIn).toLocaleDateString('es-ES');
        const checkOutFormateado = new Date(reserva.checkOut).toLocaleDateString('es-ES');
        
        let mensaje = `DETALLES DE LA RESERVA\n\n`;
        mensaje += `ID: ${reserva.id}\n`;
        mensaje += `Estado: ${reserva.estado.toUpperCase()}\n\n`;
        mensaje += `DATOS DEL HUÉSPED\n`;
        mensaje += `Nombre: ${reserva.nombre}\n`;
        mensaje += `Email: ${reserva.email}\n`;
        mensaje += `Teléfono: ${reserva.telefono}\n\n`;
        mensaje += `DETALLES DE LA RESERVA\n`;
        mensaje += `Habitación: ${reserva.tipoHabitacion}\n`;
        mensaje += `Check-in: ${checkInFormateado}\n`;
        mensaje += `Check-out: ${checkOutFormateado}\n`;
        mensaje += `Número de noches: ${reserva.noches}\n`;
        mensaje += `Huéspedes: ${reserva.huespedes}\n`;
        mensaje += `Total: $${reserva.precioTotal}\n`;
        
        if (reserva.solicitudes) {
            mensaje += `\nSOLICITUDES ESPECIALES\n${reserva.solicitudes}`;
        }

        alert(mensaje);
    }
}