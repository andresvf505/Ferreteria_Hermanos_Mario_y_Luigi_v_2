import React from 'react';

const Pedidos = ({ historialPedidos = [] }) => {
  return (
    <section className="mt-4 mb-5">
      <div className="container" style={{ maxWidth: '1140px' }}>
        {/* SECCIÓN 1: ESTADO DE CUENTA CORRIENTE */}
        <h2 className="fw-bold fs-2 text-dark">
          <i className="bi bi-wallet2 me-2"></i>Estado de Cuenta Corriente
        </h2>
        <p className="text-secondary small mb-4">
          Resumen de tu crédito disponible, saldo adeudado y cupo asignado para compras.
        </p>

        <div className="row g-3 mb-5">
          <div className="col-md-4">
            <div className="card-producto text-center border-start border-top border-end border-bottom border-4 border-success p-3 bg-white">
              <small className="text-muted fw-bold d-block">Cupo Disponible</small>
              <h3 className="text-success fw-bold my-2 display-6">$1.250.000</h3>
              <small className="text-secondary">De un cupo total de $2.000.000</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-producto text-center border-start border-top border-end border-bottom border-4 border-danger p-3 bg-white">
              <small className="text-muted fw-bold d-block">Saldo Utilizado / Facturado</small>
              <h3 className="text-danger fw-bold my-2 display-6">$750.000</h3>
              <small className="text-secondary">Vencimiento: 15 de Octubre</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card-producto text-center border-start border-top border-end border-bottom border-4 border-warning p-3 bg-white">
              <small className="text-muted fw-bold d-block">Pedidos en Proceso</small>
              <h3 className="text-warning fw-bold my-2 display-6">
                {2 + historialPedidos.length} Pedidos
              </h3>
              <small className="text-secondary">En preparación para despacho</small>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: HISTORIAL DE PEDIDOS Y COMPRAS */}
        <h2 className="fw-bold fs-2 text-dark">
          <i className="bi bi-clock-history me-2"></i>Historial de Pedidos y Compras
        </h2>
        <p className="text-secondary small mb-4">
          Revisa el estado de tus compras a crédito o con pago contado.
        </p>

        <div className="card p-0 shadow-sm border-0 mb-5 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '15%' }}>N° Pedido</th>
                  <th style={{ width: '15%' }}>Fecha</th>
                  <th style={{ width: '35%' }}>Productos / Detalle</th>
                  <th style={{ width: '15%' }}>Tipo Pago</th>
                  <th style={{ width: '10%' }}>Total</th>
                  <th style={{ width: '10%' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {historialPedidos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 bg-white border-0">
                      <div className="border border-secondary rounded p-2 d-inline-block mb-3 text-secondary">
                        <i className="bi bi-bag-x fs-3 d-block"></i>
                      </div>
                      <p className="text-muted fw-bold small m-0">
                        No registra historial de compras o pedidos en esta cuenta.
                      </p>
                    </td>
                  </tr>
                ) : (
                  historialPedidos.map((ped) => (
                    <tr key={ped.id}>
                      <td className="fw-bold">{ped.id}</td>
                      <td>{ped.fecha}</td>
                      <td className="small">{ped.detalle}</td>
                      <td className="small">{ped.tipoPago}</td>
                      <td className="fw-bold">${ped.total.toLocaleString('es-CL')} CLP</td>
                      <td>
                        <span className="badge bg-info text-dark p-2" style={{ backgroundColor: '#0dcaf0' }}>
                          {ped.estado}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pedidos;