import React, { useState } from 'react';

const PanelAdmin = ({ productos, setProductos }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Construcción');
  const [precio, setPrecio] = useState('15990');

  const handleGuardarProducto = (e) => {
    e.preventDefault();
    if (!nombre || !precio) {
      alert('Por favor complete todos los campos del producto.');
      return;
    }

    const nuevo = {
      id: `PROD-${Date.now()}`,
      codigo: `P${Math.floor(100 + Math.random() * 900)}`,
      nombre: nombre,
      categoria: categoria.toLowerCase(),
      categoriaNombre: categoria,
      precio: parseInt(precio, 10),
      stock: 50,
      stockMinimo: 10,
      imagen: 'imagenes/CementoPolpaico.png'
    };

    setProductos([nuevo, ...productos]);
    alert('¡Producto guardado exitosamente en el catálogo!');
    setNombre('');
    setPrecio('');
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Desea eliminar este producto del inventario?')) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  return (
    <section className="mt-4 mb-5">
      <div className="container" style={{ maxWidth: '1140px' }}>
        
        {/* SECCIÓN 1: GESTIÓN DEL CATÁLOGO DE PRODUCTOS */}
        <h2 className="fw-bold fs-2 text-dark mb-4">
          <i className="bi bi-box-seam me-2"></i>Gestión del Catálogo de Productos
        </h2>

        <div className="row g-4 mb-5">
          {/* Formulario Añadir Nuevo Producto */}
          <div className="col-md-4">
            <div className="card p-3 shadow-sm border-0 bg-white">
              <h6 className="fw-bold text-danger mb-3">
                <i className="bi bi-plus-circle me-1"></i> Añadir Nuevo Producto
              </h6>

              <form onSubmit={handleGuardarProducto}>
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold">Nombre del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Esmeril Angular 4.5"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold">Categoría</label>
                  <select
                    className="form-select"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    <option value="Construcción">Construcción</option>
                    <option value="Pinturas">Pinturas</option>
                    <option value="Herramientas">Herramientas</option>
                    <option value="Gasfitería">Gasfitería</option>
                    <option value="Electricidad">Electricidad</option>
                    <option value="Tornillería">Tornillería</option>
                    <option value="Madera">Madera</option>
                    <option value="Seguridad">Seguridad</option>
                    <option value="Jardinería">Jardinería</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold">Precio ($ CLP)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="15990"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-danger w-100 fw-bold py-2 mt-2">
                  <i className="bi bi-check-lg me-1"></i> Guardar Producto
                </button>
              </form>
            </div>
          </div>

          {/* Tabla Productos en Inventario */}
          <div className="col-md-8">
            <div className="card p-3 shadow-sm border-0 bg-white">
              <h6 className="fw-bold text-dark mb-3">
                <i className="bi bi-list-task me-1"></i> Productos en Inventario
              </h6>

              <div className="table-responsive">
                <table className="table align-middle small mb-0">
                  <thead className="table-light border-bottom">
                    <tr>
                      <th style={{ width: '40%' }}>Producto</th>
                      <th style={{ width: '25%' }}>Categoría</th>
                      <th style={{ width: '20%' }}>Precio</th>
                      <th className="text-center" style={{ width: '15%' }}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-3 text-muted">
                          No hay productos registrados en el inventario.
                        </td>
                      </tr>
                    ) : (
                      productos.map((p) => (
                        <tr key={p.id}>
                          <td className="fw-bold text-dark">{p.nombre}</td>
                          <td className="text-secondary">{p.categoriaNombre || p.categoria}</td>
                          <td className="fw-bold">${p.precio.toLocaleString('es-CL')} CLP</td>
                          <td className="text-center">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleEliminar(p.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: MENSAJES DE CONTACTO RECIBIDOS */}
        <h2 className="fw-bold fs-2 text-dark mb-3">
          <i className="bi bi-inbox-fill me-2"></i>Mensajes de Contacto Recibidos
        </h2>

        <div className="card p-0 shadow-sm border-0 mb-5 overflow-hidden">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '15%' }}>Fecha</th>
                  <th style={{ width: '25%' }}>Cliente / Email</th>
                  <th style={{ width: '15%' }}>Teléfono</th>
                  <th style={{ width: '20%' }}>Motivo</th>
                  <th style={{ width: '25%' }}>Mensaje</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted small bg-white border-0">
                    No se han recibido mensajes de contacto por el momento.
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

export default PanelAdmin;