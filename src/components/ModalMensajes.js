import React from 'react';

const ModalMensajes = ({ mostrar, setMostrar }) => {
  if (!mostrar) return null;

  return (
    <>
      {/* Fondo oscuro traslúcido */}
      <div 
        className="modal-backdrop fade show" 
        style={{ zIndex: 1040 }}
        onClick={() => setMostrar(false)}
      ></div>

      {/* Ventana Modal */}
      <div className="modal d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content shadow-lg border-0 overflow-hidden">
            
            {/* Encabezado Rojo con ícono de mensaje */}
            <div className="modal-header bg-danger text-white py-3">
              <h5 className="modal-title fw-bold fs-5 d-flex align-items-center gap-2 m-0">
                <i className="bi bi-chat-left-dots-fill"></i> Mis Mensajes y Consultas
              </h5>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={() => setMostrar(false)}
              ></button>
            </div>

            {/* Cuerpo del Modal */}
            <div className="modal-body p-4 bg-white">
              <p className="text-secondary small mb-3">
                Respuestas de nuestros vendedores a sus consultas de contacto.
              </p>

              {/* Tabla con Encabezado Oscuro */}
              <div className="table-responsive rounded border-0">
                <table className="table align-middle mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th style={{ width: '15%' }}>Fecha</th>
                      <th style={{ width: '20%' }}>Motivo</th>
                      <th style={{ width: '30%' }}>Su Consulta</th>
                      <th style={{ width: '35%' }}>Respuesta del Vendedor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted small border-0">
                        No registra mensajes o respuestas aún.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ModalMensajes;