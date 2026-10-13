import React, { useState } from 'react';

const Carrito = ({ carrito, actualizarCantidad, eliminarDelCarrito, totalCarrito, vaciarCarrito, setVistaActual, agregarPedido }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tipoComprador, setTipoComprador] = useState('Cliente Particular / Persona Natural');
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [metodoPago, setMetodoPago] = useState('Pago Online / Webpay / Contado');

  const handlePagarClick = () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío. Agrega productos desde el catálogo.');
      return;
    }
    setMostrarFormulario(true);
  };

  const handleFinalizarPedido = (e) => {
    e.preventDefault();
    if (!nombre || !rut || !email || !direccion) {
      alert('Por favor complete todos los campos obligatorios del despacho (*).');
      return;
    }

    // Crear el resumen de productos para el historial
    const detalleProductos = carrito
      .map((item) => `${item.cantidad}x ${item.nombre}`)
      .join(', ');

    const nuevoPedido = {
      id: `#PED-${Math.floor(1000 + Math.random() * 9000)}`,
      fecha: new Date().toLocaleDateString('es-CL'),
      detalle: detalleProductos,
      tipoPago: metodoPago.includes('Webpay') ? 'Pago Contado / Online' : 'Crédito Cuenta Corriente',
      total: totalCarrito,
      estado: 'Aprobado / En Despacho'
    };

    agregarPedido(nuevoPedido);
    vaciarCarrito();
    alert('¡Pedido registrado e iniciado con éxito!');
    setVistaActual('pedidos');
  };

  return (
    <section className="mt-4 mb-5">
      <div className="container" style={{ maxWidth: '1140px' }}>
        <h2 className="fw-bold fs-2 text-dark">
          <i className="bi bi-cart4 me-2"></i>Carrito de Compras
        </h2>

        <div className="card p-4 shadow-sm border-0 mt-3 bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '40%' }}>Producto</th>
                  <th className="text-center" style={{ width: '15%' }}>Precio</th>
                  <th className="text-center" style={{ width: '15%' }}>Cantidad</th>
                  <th className="text-end" style={{ width: '15%' }}>Subtotal</th>
                  <th className="text-center" style={{ width: '15%' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 border-0">
                      <h5 className="fw-bold text-dark mb-1">Tu carrito de compras está vacío</h5>
                      <p className="text-muted small mb-3">Revisa nuestro catálogo y agrega productos.</p>
                      <button 
                        type="button" 
                        className="btn-mint-carrito d-inline-flex w-auto px-4 py-2"
                        onClick={() => setVistaActual('inicio')}
                      >
                        VER CATÁLOGO
                      </button>
                    </td>
                  </tr>
                ) : (
                  carrito.map((prod) => (
                    <tr key={prod.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          {prod.imagen && (
                            <img src={prod.imagen} alt={prod.nombre} width="40" height="40" style={{ objectFit: 'contain' }} />
                          )}
                          <strong className="text-dark small">{prod.nombre}</strong>
                        </div>
                      </td>
                      <td className="text-center small">${prod.precio.toLocaleString('es-CL')} CLP</td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm">
                          <button type="button" className="btn btn-outline-secondary" onClick={() => actualizarCantidad(prod.id, prod.cantidad - 1)}>-</button>
                          <button type="button" className="btn btn-light fw-bold px-2" disabled>{prod.cantidad}</button>
                          <button type="button" className="btn btn-outline-secondary" onClick={() => actualizarCantidad(prod.id, prod.cantidad + 1)}>+</button>
                        </div>
                      </td>
                      <td className="text-end fw-bold small">${(prod.precio * prod.cantidad).toLocaleString('es-CL')} CLP</td>
                      <td className="text-center">
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => eliminarDelCarrito(prod.id)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <hr className="my-4" />

          {/* BARRA INFERIOR DE TOTAL Y BOTÓN PAGAR */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <button 
              type="button" 
              className="btn-mint-carrito w-auto px-3 py-2"
              onClick={vaciarCarrito}
            >
              <i className="bi bi-trash me-1"></i> VACIAR CARRITO
            </button>

            <div className="text-end">
              <div className="fs-4 fw-bold mb-2 text-dark">
                Total a Pagar: <span className="text-danger">${totalCarrito.toLocaleString('es-CL')} CLP</span>
              </div>
              <button 
                type="button" 
                className="btn-mint-carrito w-auto px-4 py-2 fs-6 d-inline-flex ms-auto"
                onClick={handlePagarClick}
              >
                <i className="bi bi-credit-card-fill me-2"></i> PAGAR PEDIDO
              </button>
            </div>
          </div>

          {/* FORMULARIO DE DESPACHO (SE DESPLIEGA AL DAR CLIC EN PAGAR PEDIDO) */}
          {mostrarFormulario && (
            <form onSubmit={handleFinalizarPedido} className="border-top pt-4 mt-4">
              <h6 className="fw-bold text-danger mb-3">
                <i className="bi bi-check-square-fill me-1"></i> Datos para la Orden de Compra y Despacho
              </h6>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label text-muted small fw-bold">Tipo de Comprador (*)</label>
                  <select 
                    className="form-select"
                    value={tipoComprador}
                    onChange={(e) => setTipoComprador(e.target.value)}
                  >
                    <option value="Cliente Particular / Persona Natural">Cliente Particular / Persona Natural</option>
                    <option value="Empresa / Contratista">Empresa / Contratista</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small fw-bold">Nombre Completo del Cliente (*)</label>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Ej: Juan Pérez Soto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small fw-bold">RUT Persona (*)</label>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Ej: 12.345.678-9"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small fw-bold">Correo Electrónico (*)</label>
                  <input 
                    type="email"
                    className="form-control"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small fw-bold">Dirección de Entrega / Obra (*)</label>
                  <input 
                    type="text"
                    className="form-control"
                    placeholder="Ej: Av. Francisco de Aguirre #450, La Serena"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-muted small fw-bold">Método de Pago (*)</label>
                  <select 
                    className="form-select"
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  >
                    <option value="Pago Online / Webpay / Contado">Pago Online / Webpay / Contado</option>
                    <option value="Crédito Cuenta Corriente">Crédito Cuenta Corriente</option>
                  </select>
                </div>

                <div className="col-12 text-end mt-4">
                  <button type="submit" className="btn-mint-carrito w-auto px-4 py-2 fs-6">
                    <i className="bi bi-check-circle-fill me-2"></i> CONFIRMAR Y FINALIZAR PEDIDO
                  </button>
                </div>
              </div>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};

export default Carrito;