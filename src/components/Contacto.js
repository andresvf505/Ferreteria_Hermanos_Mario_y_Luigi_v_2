import React, { useState } from 'react';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !email || !telefono || !asunto || !mensaje) {
      setResultado({
        tipo: 'danger',
        texto: 'Por favor complete todos los campos obligatorios (*).'
      });
      return;
    }

    setResultado({
      tipo: 'success',
      texto: '¡Consulta enviada con éxito! Nos pondremos en contacto contigo a la brevedad.'
    });

    handleLimpiar();
  };

  const handleLimpiar = () => {
    setNombre('');
    setEmail('');
    setTelefono('');
    setAsunto('');
    setMensaje('');
  };

  return (
    <section className="mt-4 mb-5">
      <div className="container" style={{ maxWidth: '1140px' }}>
        {/* SECCIÓN 1: ATENCIÓN Y COBERTURA */}
        <h2 className="fw-bold fs-2 text-dark">
          <i className="bi bi-truck me-2"></i>Atención al Cliente y Cobertura de Despacho
        </h2>
        <p className="text-secondary small mb-3">
          Conoce nuestros canales directos de atención y la ubicación de nuestra sucursal en La Serena.
        </p>

        {/* TARJETAS SUPERIORES DE CONTACTO */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card-producto text-center border-start border-top border-end border-bottom border-4 border-danger p-3 bg-white">
              <i className="bi bi-geo-alt text-danger fs-2 mb-1"></i>
              <h5 className="fw-bold my-1 fs-6">Sucursal Principal</h5>
              <p className="text-secondary mb-0 small">Av. Francisco de Aguirre #450, La Serena</p>
              <small className="text-muted" style={{ fontSize: '0.75rem' }}>Atención: Lun-Vie 08:00 a 18:30 hrs</small>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card-producto text-center border-start border-top border-end border-bottom border-4 border-success p-3 bg-white">
              <i className="bi bi-whatsapp text-success fs-2 mb-1"></i>
              <h5 className="fw-bold my-1 fs-6">Ventas y Pedidos</h5>
              <p className="text-secondary mb-0 small">+56 9 8765 4321 / +56 51 223456</p>
              <small className="text-muted" style={{ fontSize: '0.75rem' }}>Respuesta rápida vía WhatsApp</small>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card-producto text-center border-start border-top border-end border-bottom border-4 border-warning p-3 bg-white">
              <i className="bi bi-box-seam text-warning fs-2 mb-1"></i>
              <h5 className="fw-bold my-1 fs-6">Despacho a Terreno</h5>
              <p className="text-secondary mb-0 small">Entregas en 24h para contratistas y obras</p>
              <small className="text-muted" style={{ fontSize: '0.75rem' }}>Radio de 15 km en La Serena y Coquimbo</small>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: MAPA SATELITAL GOOGLE MAPS */}
        <div className="card p-4 shadow-sm border-0 mb-4 bg-white">
          <h3 className="h6 fw-bold text-danger mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-pin-map-fill"></i> Ubicación Satelital Directa
          </h3>
          <div className="mapa-contenedor" style={{ width: '100%', height: '380px' }}>
            <iframe
              title="Ubicación Sucursal La Serena"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.985223012111!2d-71.25418192358826!3d-29.907921974989674!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9691ca6367373f05%3A0x6b2b5f7e71dbbc82!2sAv.%20Francisco%20de%20Aguirre%20450%2C%20La%20Serena%2C%20Coquimbo!5e0!3m2!1ses!2scl!4v1700000000000!5m2!1ses!2scl"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* SECCIÓN 3: FORMULARIO DE CONSULTA */}
        <h2 className="fw-bold fs-2 text-dark">
          <i className="bi bi-chat-left-dots me-2"></i>Envíanos un Mensaje o Consulta
        </h2>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0 bg-white mt-3">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-muted small fw-bold">
                <i className="bi bi-person me-1"></i> Nombre Completo (*)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: Mario Bros"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-muted small fw-bold">
                <i className="bi bi-envelope-at me-1"></i> Correo Electrónico (*)
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-muted small fw-bold">
                <i className="bi bi-telephone me-1"></i> Teléfono de Contacto (*)
              </label>
              <input
                type="tel"
                className="form-control"
                placeholder="+56 9 1234 5678"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-muted small fw-bold">
                <i className="bi bi-question-circle me-1"></i> Motivo (*)
              </label>
              <select
                className="form-select"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                <option value="cotizacion">Cotización de Materiales</option>
                <option value="despacho">Consulta sobre Despacho</option>
              </select>
            </div>

            <div className="col-12">
              <label className="form-label text-muted small fw-bold">
                <i className="bi bi-card-text me-1"></i> Mensaje (*)
              </label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Escribe tu mensaje..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              ></textarea>
            </div>
          </div>

          {resultado && (
            <div className={`alert alert-${resultado.tipo} mt-3 mb-0 py-2 small fw-bold`}>
              {resultado.texto}
            </div>
          )}

          <div className="d-flex gap-3 mt-4">
            <button type="submit" className="btn-enviar">
              <i className="bi bi-send me-1"></i> ENVIAR CONSULTA
            </button>
            <button type="button" className="btn-limpiar" onClick={handleLimpiar}>
              <i className="bi bi-eraser me-1"></i> LIMPIAR
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contacto;