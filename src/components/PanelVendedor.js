import React, { useState } from 'react';

const PanelVendedor = ({ productos }) => {
  const [clienteRut, setClienteRut] = useState('');
  const [productoSel, setProductoSel] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [itemsVenta, setItemsVenta] = useState([]);
  const [filtroMensajes, setFiltroMensajes] = useState('');

  const agregarItem = () => {
    if (!productoSel) return;
    const prod = productos.find((p) => p.id === productoSel);
    if (!prod) return;

    setItemsVenta((prev) => [
      ...prev,
      {
        id: prod.id,
        nombre: prod.nombre,
        cant: parseInt(cantidad, 10),
        precio: prod.precio,
        subtotal: prod.precio * parseInt(cantidad, 10),
      },
    ]);
    setProductoSel('');
    setCantidad(1);
  };

  const emitirNota = () => {
    if (itemsVenta.length === 0) {
      alert('Agregue productos a la nota de venta antes de emitir.');
      return;
    }
    alert('¡Nota de Venta emitida con éxito!');
    setItemsVenta([]);
    setClienteRut('');
  };

  return (
    <section className="mt-4 mb-5">
      <div className="container" style={{ maxWidth: '1140px' }}>
        
        {/* SECCIÓN 1: PANEL DE VENTAS EN MOSTRADOR */}
        <h2 className="fw-bold fs-2 text-dark mb-4">
          <i className="bi bi-calculator me-2"></i>Panel de Ventas en Mostrador
        </h2>

        <div className="row g-4 mb-5">
          {/* Columna Izquierda: Formulario Cotización / Venta */}
          <div className="col-md-5">
            <div className="card p-3 shadow-sm border-0 bg-white">
              <h6 className="fw-bold text-danger mb-3">
                <i className="bi bi-cart-plus me-1"></i> Nueva Cotización / Venta
              </h6>

              <div className="mb-3">
                <label className="form-label text-muted small fw-bold">Cliente / Rut</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Ej: Pedro Soto (15.432.111-K)"
                  value={clienteRut}
                  onChange={(e) => setClienteRut(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted small fw-bold">Producto</label>
                <select
                  className="form-select form-select-sm"
                  value={productoSel}
                  onChange={(e) => setProductoSel(e.target.value)}
                >
                  <option value="">-- Seleccionar producto --</option>
                  {productos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} (${p.precio.toLocaleString('es-CL')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label text-muted small fw-bold">Cantidad</label>
                <input
                  type="number"
                  min="1"
                  className="form-control form-control-sm"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn btn-danger btn-sm w-100 fw-bold mb-3"
                onClick={agregarItem}
              >
                <i className="bi bi-plus-circle me-1"></i> Agregar a la Venta
              </button>

              {/* Tabla Detalle de Venta Actual */}
              <div className="table-responsive border-top pt-2">
                <table className="table table-sm align-middle small mb-2">
                  <thead>
                    <tr className="text-muted">
                      <th>Producto</th>
                      <th className="text-center">Cant.</th>
                      <th className="text-end">Precio</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemsVenta.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-3 text-muted">
                          No hay items en la nota actual.
                        </td>
                      </tr>
                    ) : (
                      itemsVenta.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.nombre}</td>
                          <td className="text-center">{item.cant}</td>
                          <td className="text-end">${item.precio.toLocaleString('es-CL')}</td>
                          <td className="text-end fw-bold">${item.subtotal.toLocaleString('es-CL')}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                className="btn-mint-carrito w-100 py-2 fw-bold text-uppercase mt-2"
                onClick={emitirNota}
              >
                <i className="bi bi-printer me-1"></i> Emitir Nota de Venta
              </button>
            </div>
          </div>

          {/* Columna Derecha: Ventas Recientes Mostrador */}
          <div className="col-md-7">
            <div className="card p-3 shadow-sm border-0 bg-white">
              <h6 className="fw-bold text-dark mb-3">
                <i className="bi bi-receipt me-1"></i> Ventas Recientes Mostrador
              </h6>

              <div className="table-responsive">
                <table className="table align-middle small mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>N° Nota</th>
                      <th>Cliente</th>
                      <th className="text-end">Total</th>
                      <th className="text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="fw-bold">#NV-501</td>
                      <td>Constructora El Faro</td>
                      <td className="text-end fw-bold">$145.000</td>
                      <td className="text-center">
                        <span className="badge bg-success">Pagado</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: GESTIÓN DE PEDIDOS WEB DE CLIENTES */}
        <div className="card p-3 shadow-sm border-0 bg-white mb-5">
          <h5 className="fw-bold text-dark mb-3 fs-6">
            <i className="bi bi-box-seam me-2"></i>Gestión de Pedidos Web de Clientes
          </h5>

          <div className="table-responsive">
            <table className="table align-middle small mb-0">
              <thead className="table-dark">
                <tr>
                  <th>N° Pedido</th>
                  <th>Fecha</th>
                  <th>Cliente / RUT</th>
                  <th>Detalle</th>
                  <th>Total</th>
                  <th>Estado Actual</th>
                  <th className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted border-0">
                    No hay pedidos web registrados actualmente.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECCIÓN 3: CONSULTAS Y MENSAJES DE CLIENTES */}
        <div className="card p-3 shadow-sm border-0 bg-white">
          <h5 className="fw-bold text-danger mb-1 fs-6">
            <i className="bi bi-envelope-paper me-2"></i>Consultas y Mensajes de Clientes
          </h5>
          <p className="text-secondary small mb-3">
            Filtra consultas por RUT o Email del cliente para enviar una respuesta directa.
          </p>

          <div className="row g-2 mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="Buscar por RUT o Correo del Cliente..."
                value={filtroMensajes}
                onChange={(e) => setFiltroMensajes(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <button type="button" className="btn btn-dark btn-sm w-100 fw-bold">
                <i className="bi bi-search me-1"></i> Filtrar
              </button>
            </div>
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm w-100 fw-bold"
                onClick={() => setFiltroMensajes('')}
              >
                Limpiar
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table align-middle small mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Fecha</th>
                  <th>Cliente / RUT / Email</th>
                  <th>Teléfono</th>
                  <th>Motivo</th>
                  <th>Mensaje / Consulta</th>
                  <th>Respuesta del Vendedor</th>
                  <th className="text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted border-0">
                    No se encontraron mensajes con el filtro especificado.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PanelVendedor;