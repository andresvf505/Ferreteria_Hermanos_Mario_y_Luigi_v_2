import React, { useState, useEffect } from 'react';

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/noticias.json')
      .then((res) => res.json())
      .then((data) => {
        setNoticias(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar noticias:", err);
        setCargando(false);
      });
  }, []);

  return (
    <div className="bg-light py-4 border-top">
      <div className="container">
        <h4 className="fw-bold mb-3"><i className="bi bi-newspaper"></i> Novedades y Ofertas</h4>
        {cargando ? (
          <p className="text-muted">Cargando noticias...</p>
        ) : (
          <div className="row g-3">
            {noticias.map((item) => (
              <div key={item.id} className="col-md-6">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <small className="text-muted">{item.fecha}</small>
                    <h5 className="card-title fw-bold text-danger mt-1">{item.titulo}</h5>
                    <p className="card-text text-secondary small">{item.resumen}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Noticias;