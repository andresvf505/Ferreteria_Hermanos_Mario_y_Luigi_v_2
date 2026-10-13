import React, { useState } from 'react';

const Inicio = ({ productos, agregarAlCarrito }) => {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');

  const productosFiltrados = productos.filter((p) => {
    const coincideTexto = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
                          p.codigo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCat = categoria === '' || p.categoria === categoria;
    return coincideTexto && coincideCat;
  });

  return (
    <section className="mt-4">
      <div className="container" style={{ maxWidth: '1140px' }}>
        <h2 className="fw-bold fs-2 text-dark">
          <i className="bi bi-search me-2"></i>Consulta de Stock en Tiempo Real
        </h2>
        <p className="text-secondary small">
          Filtra por nombre o categoría para verificar disponibilidad. Haz clic en la imagen o título para ver la ficha completa.
        </p>

        {/* Buscador y Filtros */}
        <div className="mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-muted small"><i className="bi bi-search me-1"></i> Buscar Producto / Código</label>
              <input 
                type="text" 
                className="form-control form-control-sm" 
                placeholder="Ej: Cemento, Taladro, MC001..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted small"><i className="bi bi-filter me-1"></i> Categoría</label>
              <select 
                className="form-select form-select-sm"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                <option value="construccion">Materiales de Construcción</option>
                <option value="pinturas">Pinturas y Recubrimientos</option>
                <option value="herramientas">Herramientas (Manuales y Eléctricas)</option>
                <option value="gasfiteria">Gasfitería</option>
                <option value="electricidad">Electricidad</option>
                <option value="tornilleria">Tornillería y Fijaciones</option>
                <option value="madera">Madera y Tableros</option>
                <option value="seguridad">Seguridad y EPP</option>
                <option value="jardin">Jardinería</option>
              </select>
            </div>
          </div>

          <div className="d-flex gap-2 mt-3">
            <button type="button" className="btn-enviar">
              <i className="bi bi-funnel"></i> Filtrar
            </button>
            <button 
              type="button" 
              className="btn-limpiar" 
              onClick={() => { setBusqueda(''); setCategoria(''); }}
            >
              <i className="bi bi-eraser"></i> Limpiar
            </button>
          </div>
        </div>

        {/* Catálogo completo de 20 productos */}
        <div className="row g-4 mb-5">
          {productosFiltrados.map((prod) => (
            <div key={prod.id} className="col-md-4">
              <div className="card-producto text-start">
                <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>
                  {prod.codigo} | {prod.categoriaNombre || prod.categoria}
                </small>
                
                <div className="text-center my-2">
                  <img 
                    src={prod.imagen} 
                    alt={prod.nombre} 
                    style={{ height: '130px', objectFit: 'contain' }}
                  />
                </div>

                <h5 className="mb-1 fw-bold fs-6">{prod.nombre}</h5>
                <p className="fw-bold text-danger my-1">${prod.precio.toLocaleString('es-CL')} CLP</p>
                
                <div className="mb-2">
                  <span className={prod.stock <= prod.stockMinimo ? "badge-stock-low" : "badge-stock-ok"}>
                    Stock: {prod.stock} un.
                  </span>
                </div>

                <button 
                  type="button"
                  className="btn-mint-carrito" 
                  onClick={() => agregarAlCarrito(prod)}
                >
                  <i className="bi bi-cart-plus me-1"></i> AGREGAR AL CARRITO
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Inicio;