import React, { useState } from 'react';

const ModalLogin = ({ mostrar, setMostrar, setUsuarioLogueado, setVistaActual }) => {
  const [tabActiva, setTabActiva] = useState('cliente');

  // Estados de Login
  const [clienteEmail, setClienteEmail] = useState('');
  const [clientePassword, setClientePassword] = useState('');
  
  const [vendedorEmail, setVendedorEmail] = useState('');
  const [vendedorPassword, setVendedorPassword] = useState('');
  
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Estados de Registro de Cliente
  const [regRut, setRegRut] = useState('');
  const [regNombre, setRegNombre] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regPassConfirm, setRegPassConfirm] = useState('');

  // Mensajes
  const [mensaje, setMensaje] = useState(null);
  const [msgRegistro, setMsgRegistro] = useState(null);

  if (!mostrar) return null;

  const handleLoginCliente = (e) => {
    e.preventDefault();
    if (clienteEmail && clientePassword) {
      setMensaje({ tipo: 'success', texto: '¡Bienvenido! Sesión de Cliente iniciada.' });
      setTimeout(() => {
        setUsuarioLogueado({ rol: 'cliente', email: clienteEmail });
        setVistaActual('pedidos'); // Redirige a Mis Pedidos
        setMostrar(false);
        setMensaje(null);
      }, 1000);
    } else {
      setMensaje({ tipo: 'danger', texto: 'Por favor complete correo y contraseña.' });
    }
  };

  const handleLoginVendedor = (e) => {
    e.preventDefault();
    if (vendedorEmail === 'vendedor@marioyluigi.cl' && vendedorPassword === 'vendedor123') {
      setMensaje({ tipo: 'success', texto: '¡Acceso concedido! Bienvenido Vendedor.' });
      setTimeout(() => {
        setUsuarioLogueado({ rol: 'vendedor', email: vendedorEmail });
        setVistaActual('vendedor');
        setMostrar(false);
        setMensaje(null);
      }, 1000);
    } else {
      setMensaje({ tipo: 'danger', texto: 'Credenciales de Vendedor incorrectas.' });
    }
  };

  const handleLoginAdmin = (e) => {
    e.preventDefault();
    if (adminEmail === 'admin@marioyluigi.cl' && adminPassword === 'admin123') {
      setMensaje({ tipo: 'success', texto: '¡Acceso concedido! Bienvenido Administrador.' });
      setTimeout(() => {
        setUsuarioLogueado({ rol: 'admin', email: adminEmail });
        setVistaActual('admin');
        setMostrar(false);
        setMensaje(null);
      }, 1000);
    } else {
      setMensaje({ tipo: 'danger', texto: 'Credenciales de Administrador incorrectas.' });
    }
  };

  const handleRegistroCliente = (e) => {
    e.preventDefault();
    if (!regRut || regRut.length < 8) {
      setMsgRegistro({ tipo: 'danger', texto: 'Ingrese un RUT válido (mínimo 8 caracteres).' });
      return;
    }
    if (!regNombre || regNombre.length < 3) {
      setMsgRegistro({ tipo: 'danger', texto: 'El nombre debe tener al menos 3 caracteres.' });
      return;
    }
    if (!regEmail || !regEmail.includes('@')) {
      setMsgRegistro({ tipo: 'danger', texto: 'Ingrese un correo electrónico válido.' });
      return;
    }
    if (!regPass || regPass.length < 4) {
      setMsgRegistro({ tipo: 'danger', texto: 'La contraseña debe tener al menos 4 caracteres.' });
      return;
    }
    if (regPass !== regPassConfirm) {
      setMsgRegistro({ tipo: 'danger', texto: 'Las contraseñas no coinciden.' });
      return;
    }

    setMsgRegistro({ tipo: 'success', texto: '¡Cuenta creada con éxito! Entrando...' });
    setTimeout(() => {
      setUsuarioLogueado({ rol: 'cliente', email: regEmail, nombre: regNombre, rut: regRut });
      setVistaActual('pedidos'); // Redirige a Mis Pedidos
      setMostrar(false);
      setMsgRegistro(null);
      setRegRut('');
      setRegNombre('');
      setRegEmail('');
      setRegPass('');
      setRegPassConfirm('');
    }, 1000);
  };

  return (
    <>
      <div 
        className="modal-backdrop fade show" 
        style={{ zIndex: 1040 }}
        onClick={() => setMostrar(false)}
      ></div>

      <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title fw-bold fs-6">
                <i className="bi bi-person-badge-fill me-2"></i> Acceso a la Plataforma
              </h5>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={() => setMostrar(false)}
              ></button>
            </div>

            <div className="modal-body p-4 bg-white">
              <ul className="nav nav-tabs mb-3 border-bottom">
                <li className="nav-item">
                  <button 
                    className={`nav-link fw-bold border-0 ${tabActiva === 'cliente' ? 'active text-danger border-bottom border-danger border-2' : 'text-secondary'}`}
                    onClick={() => { setTabActiva('cliente'); setMensaje(null); setMsgRegistro(null); }}
                  >
                    Cliente
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link fw-bold border-0 ${tabActiva === 'vendedor' ? 'active text-warning border-bottom border-warning border-2' : 'text-secondary'}`}
                    onClick={() => { setTabActiva('vendedor'); setMensaje(null); setMsgRegistro(null); }}
                  >
                    Vendedor
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link fw-bold border-0 ${tabActiva === 'admin' ? 'active text-dark border-bottom border-dark border-2' : 'text-secondary'}`}
                    onClick={() => { setTabActiva('admin'); setMensaje(null); setMsgRegistro(null); }}
                  >
                    Administrador
                  </button>
                </li>
              </ul>

              {mensaje && (
                <div className={`alert alert-${mensaje.tipo} py-2 small text-center fw-bold`}>
                  {mensaje.texto}
                </div>
              )}

              {/* TAB CLIENTE */}
              {tabActiva === 'cliente' && (
                <>
                  <form onSubmit={handleLoginCliente}>
                    <div className="mb-3">
                      <label className="form-label fw-bold small text-secondary">Correo Electrónico</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="cliente@correo.com"
                        value={clienteEmail}
                        onChange={(e) => setClienteEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold small text-secondary">Contraseña</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        placeholder="••••••••"
                        value={clientePassword}
                        onChange={(e) => setClientePassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-danger w-100 fw-bold mt-2">
                      Entrar como Cliente
                    </button>
                  </form>

                  <div className="border-top pt-3 mt-4">
                    <h6 className="fw-bold text-danger text-center mb-3">
                      <i className="bi bi-person-plus-fill me-1"></i> ¿No tienes cuenta de Cliente? Regístrate
                    </h6>

                    {msgRegistro && (
                      <div className={`alert alert-${msgRegistro.tipo} py-1 small text-center mb-2`}>
                        {msgRegistro.texto}
                      </div>
                    )}

                    <form onSubmit={handleRegistroCliente}>
                      <div className="row g-2">
                        <div className="col-6">
                          <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="RUT (Ej: 12345678-9)"
                            value={regRut}
                            onChange={(e) => setRegRut(e.target.value)}
                          />
                        </div>
                        <div className="col-6">
                          <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="Nombre Completo"
                            value={regNombre}
                            onChange={(e) => setRegNombre(e.target.value)}
                          />
                        </div>
                        <div className="col-12">
                          <input 
                            type="email" 
                            className="form-control form-control-sm" 
                            placeholder="Correo Electrónico"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                          />
                        </div>
                        <div className="col-6">
                          <input 
                            type="password" 
                            className="form-control form-control-sm" 
                            placeholder="Contraseña"
                            value={regPass}
                            onChange={(e) => setRegPass(e.target.value)}
                          />
                        </div>
                        <div className="col-6">
                          <input 
                            type="password" 
                            className="form-control form-control-sm" 
                            placeholder="Confirmar Contraseña"
                            value={regPassConfirm}
                            onChange={(e) => setRegPassConfirm(e.target.value)}
                          />
                        </div>
                        <div className="col-12 mt-3">
                          <button type="submit" className="btn btn-danger btn-sm w-100 fw-bold">
                            REGISTRARSE E INICIAR SESIÓN
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}

              {/* TAB VENDEDOR */}
              {tabActiva === 'vendedor' && (
                <form onSubmit={handleLoginVendedor}>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-secondary">Correo Electrónico</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="vendedor@marioyluigi.cl"
                      value={vendedorEmail}
                      onChange={(e) => setVendedorEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-secondary">Contraseña</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="••••••••"
                      value={vendedorPassword}
                      onChange={(e) => setVendedorPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-warning w-100 fw-bold mt-2 text-dark">
                    Entrar como Vendedor
                  </button>
                </form>
              )}

              {/* TAB ADMIN */}
              {tabActiva === 'admin' && (
                <form onSubmit={handleLoginAdmin}>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-secondary">Correo Electrónico</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="admin@ferreteriaml.cl"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-secondary">Contraseña</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark w-100 fw-bold mt-2">
                    Entrar como Admin
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalLogin;