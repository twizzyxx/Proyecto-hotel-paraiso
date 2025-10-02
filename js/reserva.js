const hoy = new Date().toISOString().split('T')[0];
document.getElementById('checkIn').setAttribute('min', hoy);
document.getElementById('checkOut').setAttribute('min', hoy);

function calcularResumen() {
    const tipoHabitacion = document.getElementById('tipoHabitacion');
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const resumenDiv = document.getElementById('resumenReserva');

    if (tipoHabitacion.value && checkIn && checkOut) {
        const fechaEntrada = new Date(checkIn);
        const fechaSalida = new Date(checkOut);
        const diferenciaTiempo = fechaSalida - fechaEntrada;
        const noches = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

        if (noches > 0) {
            const precioPorNoche = tipoHabitacion.selectedOptions[0].getAttribute('data-precio');
            const precioTotal = noches * precioPorNoche;

            document.getElementById('numNoches').textContent = noches;
            document.getElementById('precioPorNoche').textContent = precioPorNoche;
            document.getElementById('precioTotal').textContent = precioTotal;
            resumenDiv.style.display = 'block';
        } else {
            resumenDiv.style.display = 'none';
            alert('La fecha de salida debe ser posterior a la fecha de entrada');
        }
    }
}

document.getElementById('checkIn').addEventListener('change', function() {
    const checkIn = this.value;
    document.getElementById('checkOut').setAttribute('min', checkIn);
    calcularResumen();
});

document.getElementById('checkOut').addEventListener('change', calcularResumen);
document.getElementById('tipoHabitacion').addEventListener('change', calcularResumen);

document.getElementById('formReserva').addEventListener('submit', function(e) {
    e.preventDefault();

    const reserva = {
        id: Date.now(), 
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        tipoHabitacion: document.getElementById('tipoHabitacion').value,
        checkIn: document.getElementById('checkIn').value,
        checkOut: document.getElementById('checkOut').value,
        huespedes: document.getElementById('huespedes').value,
        solicitudes: document.getElementById('solicitudes').value,
        noches: parseInt(document.getElementById('numNoches').textContent),
        precioTotal: parseFloat(document.getElementById('precioTotal').textContent),
        estado: 'pendiente',
        fechaCreacion: new Date().toISOString()
    };

   
    const fechaEntrada = new Date(reserva.checkIn);
    const fechaSalida = new Date(reserva.checkOut);
    
    if (fechaSalida <= fechaEntrada) {
        alert('La fecha de salida debe ser posterior a la fecha de entrada');
        return;
    }

    let reservas = [];
    const reservasGuardadas = localStorage.getItem('reservas');
    if (reservasGuardadas) {
        reservas = JSON.parse(reservasGuardadas);
    }
    
    reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));

    alert(`¡Reserva confirmada!\n\nID de Reserva: ${reserva.id}\nNombre: ${reserva.nombre}\nHabitación: ${reserva.tipoHabitacion}\nCheck-in: ${reserva.checkIn}\nCheck-out: ${reserva.checkOut}\nTotal: $${reserva.precioTotal}\n\nRecibirás un email de confirmación en breve.`);

    window.location.href = 'reservas.html';
});
