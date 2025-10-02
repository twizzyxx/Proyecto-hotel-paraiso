Sistema de Reservas - Hotel Paraíso
Descripción del Proyecto
Sistema web completo para la gestión de reservas de un hotel, desarrollado con HTML, CSS (Bootstrap 5) y JavaScript vanilla. Permite a los usuarios explorar habitaciones, realizar reservas y gestionar sus reservaciones de manera intuitiva.
Estructura del Proyecto
hotel-paraiso/
│
├── index.html              # Página principal
├── habitaciones.html       # Catálogo de habitaciones
├── reserva.html           # Formulario de reservas
├── reservas.html          # Gestión de reservas
│
├── css/
│   └── estilos.css        # Estilos personalizados
│
├── js/
│   ├── reserva.js         # Lógica del formulario de reservas
│   └── reservas.js        # Lógica de gestión de reservas
│
└── img/
    ├── logo.jpeg          # Logo del hotel
    ├── fachada.jpg        # Imagen de fachada
    ├── lobby.jpg          # Imagen del lobby
    ├── piscina.jpg        # Imagen de piscina
    └── habitaciones/
        ├── simple.jpeg    # Imagen habitación simple
        ├── intermedia.jpeg # Imagen habitación doble
        └── suit.jpeg      # Imagen suite
Páginas del Sistema
1. index.html - Página Principal
Funcionalidad:
•	Carrusel automático con 3 imágenes del hotel (fachada, lobby, piscina)
•	Presentación del hotel con descripción principal
•	Sección de servicios destacados (Piscina, Restaurante, Parking)
•	Navegación completa a todas las secciones
Elementos destacados:
•	Carrusel de Bootstrap con controles manuales e indicadores
•	Cards informativas con iconos emoji
•	Diseño responsive adaptable a móviles
2. habitaciones.html - Catálogo de Habitaciones
Funcionalidad:
•	Muestra 3 tipos de habitaciones disponibles: 
o	Habitación Simple: $50/noche, 1 persona
o	Habitación Doble: $80/noche, 2 personas
o	Suite: $150/noche, 2-3 personas
•	Modales con información detallada de cada habitación
•	Botón directo para reservar desde cada habitación
Características de habitaciones:
•	Lista completa de amenidades (WiFi, TV, aire acondicionado, etc.)
•	Imágenes representativas
•	Capacidad máxima de huéspedes
•	Botones de acción en los modales
3. reserva.html - Formulario de Reservas
Funcionalidad:
•	Formulario completo para crear nuevas reservas
•	Cálculo automático del precio total
•	Validación de fechas (no permite fechas pasadas)
•	Almacenamiento en localStorage
Campos del formulario:
•	Nombre completo (requerido)
•	Email (requerido)
•	Teléfono (requerido)
•	Tipo de habitación (selector con precios)
•	Fecha de entrada/salida (validación automática)
•	Número de huéspedes (1-5 personas)
•	Solicitudes especiales (opcional)
Cálculo automático:
•	Número de noches entre fechas
•	Precio por noche según tipo de habitación
•	Total a pagar
•	Resumen visual de la reserva antes de confirmar
4. reservas.html - Gestión de Reservas
Funcionalidad:
•	Listado completo de todas las reservas
•	Filtros por estado (Todas, Pendientes, Confirmadas)
•	Acciones disponibles por reserva: 
o	✓ Confirmar reserva (solo pendientes)
o	👁 Ver detalles completos
o	✕ Cancelar reserva
Estados de reservas:
•	Pendiente (amarillo): Reserva recién creada
•	Confirmada (verde): Reserva confirmada por el usuario
•	Cancelada (rojo): Reserva cancelada
Información mostrada:
•	ID único de reserva
•	Datos del huésped
•	Tipo de habitación
•	Fechas formateadas (DD/MM/AAAA)
•	Número de noches
•	Precio total
•	Estado actual
•	Botones de acción
Archivos JavaScript
reserva.js - Lógica del Formulario de Reservas
Funciones principales:
1.	Configuración inicial:
o	Establece fecha mínima como hoy para check-in y check-out
o	Previene selección de fechas pasadas
2.	calcularResumen():
o	Calcula número de noches entre fechas
o	Obtiene precio por noche del tipo de habitación seleccionado
o	Calcula y muestra el precio total
o	Valida que check-out sea posterior a check-in
3.	Event Listeners:
o	checkIn.change: Actualiza fecha mínima de check-out y recalcula resumen
o	checkOut.change: Recalcula resumen cuando cambia fecha de salida
o	tipoHabitacion.change: Recalcula resumen cuando cambia tipo de habitación
4.	formReserva.submit:
o	Previene envío tradicional del formulario
o	Crea objeto de reserva con todos los datos
o	Genera ID único usando timestamp
o	Valida fechas antes de guardar
o	Guarda en localStorage
o	Muestra confirmación con detalles
o	Redirige a página de gestión de reservas
Estructura del objeto reserva:
{
    id: timestamp,
    nombre: string,
    email: string,
    telefono: string,
    tipoHabitacion: string,
    checkIn: date,
    checkOut: date,
    huespedes: number,
    solicitudes: string,
    noches: number,
    precioTotal: number,
    estado: 'pendiente',
    fechaCreacion: ISO string
}
reservas.js - Lógica de Gestión de Reservas
Variables globales:
•	reservasGlobales[]: Array con todas las reservas cargadas
•	filtroActual: Estado del filtro activo ('todas', 'pendiente', 'confirmada')
Funciones principales:
1.	cargarReservas():
o	Se ejecuta al cargar la página
o	Lee reservas desde localStorage
o	Parsea JSON y actualiza array global
o	Llama a mostrarReservas() para renderizar
2.	mostrarReservas(reservas):
o	Limpia la tabla
o	Itera sobre array de reservas
o	Crea filas dinámicamente con información formateada
o	Aplica badges de color según estado
o	Muestra botones de acción según estado actual
o	Formatea fechas a formato español (DD/MM/AAAA)
3.	mostrarMensajeVacio():
o	Muestra mensaje cuando no hay reservas
o	Adapta mensaje según filtro activo
4.	filtrarReservas(estado):
o	Filtra reservas según estado seleccionado
o	Actualiza clases CSS de botones de filtro
o	Llama a mostrarReservas() con array filtrado
5.	confirmarReserva(id):
o	Solicita confirmación al usuario
o	Busca reserva por ID usando map()
o	Cambia estado a 'confirmada'
o	Actualiza localStorage
o	Recarga vista y muestra mensaje de éxito
6.	cancelarReserva(id):
o	Solicita confirmación al usuario
o	Busca reserva por ID
o	Cambia estado a 'cancelada'
o	Actualiza localStorage
o	Recarga vista
7.	verDetalles(id):
o	Busca reserva por ID usando find()
o	Formatea toda la información
o	Muestra alert con detalles completos: 
	Datos del huésped
	Información de la reserva
	Solicitudes especiales (si existen)
Estilos CSS (estilos.css)
Variables CSS personalizadas:
--primary-color: #2c3e50
--secondary-color: #95a5a6
--success-color: #27ae60
--warning-color: #f39c12
--danger-color: #e74c3c
Características principales:
1.	Layout responsive:
o	Flexbox para estructura vertical
o	Footer sticky en la parte inferior
o	Breakpoints para móviles (@media max-width: 768px)
2.	Placeholders de imágenes:
o	Gradiente lineal de fallback (135deg, #667eea a #764ba2)
o	Sistema de imágenes reales con object-fit: cover
o	Alturas fijas para mantener diseño consistente
o	Overflow hidden para recorte limpio
3.	Efectos interactivos:
o	Transform translateY(-5px) en hover de cards
o	Transiciones suaves (0.3s ease)
o	Sombras dinámicas que aumentan en hover
o	Botones con efecto elevación
4.	Animaciones:
o	@keyframes fadeIn: Aparición suave de elementos
o	@keyframes spin: Spinner de carga
o	Aplicadas a cards y alerts automáticamente
5.	Componentes estilizados:
o	Cards sin bordes con sombra sutil
o	Navbar con efectos de hover en links
o	Modales con header degradado
o	Badges personalizados por estado
o	Tablas responsive con scroll horizontal
6.	Optimización móvil:
o	Reduce altura de carrusel (300px)
o	Ajusta tamaño de fuentes
o	Reduce padding de botones pequeños
o	Tabla con fuente más pequeña (0.85rem)
Tecnologías Utilizadas
•	HTML5: Estructura semántica
•	CSS3: Estilos personalizados y animaciones
•	Bootstrap 5.3.0: Framework CSS responsive
•	JavaScript (ES6): Lógica del cliente
•	LocalStorage API: Persistencia de datos local
Características Técnicas
Persistencia de datos:
•	Usa localStorage del navegador
•	Datos almacenados en formato JSON
•	No requiere backend ni base de datos
Validaciones implementadas:
•	Fechas no pueden ser en el pasado
•	Check-out debe ser posterior a check-in
•	Todos los campos requeridos deben llenarse
•	Número de huéspedes limitado (1-5)
•	Validación HTML5 de tipos (email, tel, date)
Responsive Design:
•	Mobile-first approach
•	Breakpoints optimizados
•	Navbar colapsable en móviles
•	Tablas con scroll horizontal
•	Imágenes adaptativas
Experiencia de Usuario:
•	Cálculo automático de precios
•	Resumen visual antes de confirmar
•	Mensajes de confirmación claros
•	Estados visuales diferenciados
•	Navegación intuitiva entre páginas
•	Botones de acción contextuales
Limitaciones Conocidas
1.	Almacenamiento local:
o	Los datos solo persisten en el mismo navegador
o	Limpiar caché borra todas las reservas
o	No hay sincronización entre dispositivos
2.	Sin backend:
o	No hay verificación de disponibilidad real
o	No hay sistema de autenticación
o	No se envían emails reales de confirmación
3.	Validaciones básicas:
o	No verifica conflictos de fechas entre reservas
o	No limita número de reservas por habitación
o	No valida formato de teléfono específicamente
Mejoras Futuras Sugeridas
1.	Integración con backend (Node.js, PHP, etc.)
2.	Base de datos para persistencia real
3.	Sistema de autenticación de usuarios
4.	Verificación de disponibilidad en tiempo real
5.	Pasarela de pago integrada
6.	Envío de emails de confirmación
7.	Panel de administración
8.	Calendario visual de disponibilidad
9.	Sistema de calificaciones y reseñas
10.	Multi-idioma
11.	Integración con servicios de mapas
12.	Chat de soporte en vivo
Instrucciones de Instalación
1.	Descargar todos los archivos del proyecto
2.	Mantener la estructura de carpetas intacta
3.	Colocar imágenes en las carpetas correspondientes
4.	Abrir index.html en un navegador web moderno
5.	No requiere servidor web (puede ejecutarse localmente)
Navegadores Compatibles
•	Chrome 90+
•	Firefox 88+
•	Safari 14+
•	Edge 90+
•	Opera 76+
Autores y Licencia
Caballero Ramos, Aarón Paul
Castillo Abad, Jhosep
Cueva Guanilo, Aaron Raphael
Hotel Paraíso - Sistema de Reservas
© 2025 Todos los derechos reservados
________________________________________

