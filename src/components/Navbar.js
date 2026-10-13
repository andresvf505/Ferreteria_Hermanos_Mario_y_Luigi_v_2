import React, { useState } from 'react';
import ModalLogin from './ModalLogin';
import ModalMensajes from './ModalMensajes';

const Navbar = ({ vistaActual, setVistaActual, cantidadCarrito, usuarioLogueado, setUsuarioLogueado, cerrarSesion }) => {
  const [mostrarModalLogin, setMostrarModalLogin] = useState(false);
  const [mostrarModalMensajes, setMostrarModalMensajes] = useState(false);

  return (
    <header className="py-3">
      <div className="container" style={{ maxWidth: '1140px' }}>
        <h1>
          <i className="bi bi-tools text-danger"></i>
          <span id="logo-tienda">Ferretería Hermanos Mario y Luigi</span>
        </h1>
        <p>
          {usuarioLogueado?.rol === 'admin'
            ? 'Panel de Control y Administración de la Tienda'
            : usuarioLogueado?.rol === 'vendedor'
            ? 'Panel de Ventas en Mostrador y Cotizaciones'
            : 'Materiales de construcción, herramientas y ferretería general en La Serena'}
        </p>

        <nav className="nav-menu">
          <div className="d-flex flex-wrap align-items-center gap-1">
            <button 
              type="button"
              className={`nav-link-btn ${vistaActual === 'inicio' ? 'active' : ''}`}
              onClick={() => setVistaActual('inicio')}
            >
              <i className="bi bi-house"></i> <span>Inicio</span>
            </button>

            <button 
              type="button"
              className={`nav-link-btn ${vistaActual === 'pedidos' ? 'active' : ''}`}
              onClick={() => setVistaActual('pedidos')}
            >
              <i className="bi bi-clock-history"></i> <span>Mis Pedidos</span>
            </button>

            <button 
              type="button"
              className={`nav-link-btn ${vistaActual === 'carrito' ? 'active' : ''}`}
              onClick={() => setVistaActual('carrito')}
            >
              <i className="bi bi-cart3"></i> <span>Mi Carrito</span>
              <span id="cart-count" className="badge bg-danger rounded-pill ms-1">
                {cantidadCarrito}
              </span>
            </button>

            <button 
              type="button"
              className={`nav-link-btn ${vistaActual === 'contacto' ? 'active' : ''}`}
              onClick={() => setVistaActual('contacto')}
            >
              <i className="bi bi-envelope"></i> <span>Contacto</span>
            </button>
          </div>

          <div id="contenedor-login">
            {usuarioLogueado ? (
              <div className="d-flex align-items-center gap-2">
                {usuarioLogueado.rol === 'admin' && (
                  <button 
                    type="button"
                    className="btn-mint-carrito w-auto px-3 py-1 text-uppercase fw-bold"
                    onClick={() => setVistaActual('admin')}
                  >
                    <i className="bi bi-shield-lock-fill me-1"></i> PANEL ADMIN
                  </button>
                )}

                {usuarioLogueado.rol === 'vendedor' && (
                  <button 
                    type="button"
                    className="btn-mint-carrito w-auto px-3 py-1 text-uppercase fw-bold"
                    onClick={() => setVistaActual('vendedor')}
                  >
                    <i className="bi bi-speedometer2 me-1"></i> PANEL VENDEDOR
                  </button>
                )}

                {usuarioLogueado.rol === 'cliente' && (
                  <button 
                    type="button"
                    className="btn-mint-carrito w-auto px-3 py-1 text-uppercase fw-bold"
                    onClick={() => setMostrarModalMensajes(true)}
                  >
                    <i className="bi bi-chat-dots-fill me-1"></i> MIS MENSAJES
                  </button>
                )}

                <button 
                  type="button"
                  className="btn-mint-carrito w-auto px-3 py-1 text-uppercase fw-bold"
                  onClick={cerrarSesion}
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Cerrar Sesión
                </button>
              </div>
            ) : (
              <button 
                type="button"
                onClick={() => setMostrarModalLogin(true)}
              >
                <i className="bi bi-person-circle"></i> INICIAR SESIÓN / MI CUENTA
              </button>
            )}
          </div>
        </nav>
      </div>

      <ModalLogin 
        mostrar={mostrarModalLogin} 
        setMostrar={setMostrarModalLogin} 
        setUsuarioLogueado={setUsuarioLogueado}
        setVistaActual={setVistaActual}
      />

      <ModalMensajes 
        mostrar={mostrarModalMensajes} 
        setMostrar={setMostrarModalMensajes} 
      />
    </header>
  );
};

export default Navbar;