import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Carrito from './components/Carrito';
import Contacto from './components/Contacto';
import Pedidos from './components/Pedidos';
import PanelVendedor from './components/PanelVendedor';
import PanelAdmin from './components/PanelAdmin';

const productosCatalogoBase = [
  { id: "MC001", codigo: "MC001", nombre: "Cemento Polpaico gris 25 kg", categoria: "construccion", categoriaNombre: "Materiales de Construcción", precio: 5990, stock: 80, stockMinimo: 20, imagen: "imagenes/CementoPolpaico.png" },
  { id: "MC003", codigo: "MC003", nombre: "Mortero cola cerámica 25 kg", categoria: "construccion", categoriaNombre: "Materiales de Construcción", precio: 5200, stock: 50, stockMinimo: 15, imagen: "imagenes/morteroCola.png" },
  { id: "MC007", codigo: "MC007", nombre: "Ladrillo fiscal N°5", categoria: "construccion", categoriaNombre: "Materiales de Construcción", precio: 380, stock: 500, stockMinimo: 100, imagen: "imagenes/ladrillosiscales.png" },
  
  { id: "PT001", codigo: "PT001", nombre: "Pintura látex interior 1 galón blanco", categoria: "pinturas", categoriaNombre: "Pinturas y Recubrimientos", precio: 9990, stock: 40, stockMinimo: 10, imagen: "imagenes/pinturaLatex.png" },
  { id: "PT005", codigo: "PT005", nombre: "Esmalte sintético 1 litro (varios col.)", categoria: "pinturas", categoriaNombre: "Pinturas y Recubrimientos", precio: 9490, stock: 30, stockMinimo: 10, imagen: "imagenes/esmalteSinetico.png" },
  { id: "PT006", codigo: "PT006", nombre: "Pintura antihumedad 1 galón blanco", categoria: "pinturas", categoriaNombre: "Pinturas y Recubrimientos", precio: 17990, stock: 15, stockMinimo: 5, imagen: "imagenes/Esmalte.png" },
  
  { id: "HM001", codigo: "HM001", nombre: "Martillo carpintero 500g", categoria: "herramientas", categoriaNombre: "Herramientas (Manuales y Eléctricas)", precio: 7990, stock: 20, stockMinimo: 5, imagen: "imagenes/martilloCCarpintero.png" },
  { id: "HE001", codigo: "HE001", nombre: "Taladro percutor 650W 13mm", categoria: "herramientas", categoriaNombre: "Herramientas (Manuales y Eléctricas)", precio: 79990, stock: 8, stockMinimo: 2, imagen: "imagenes/Taladro.png" },
  { id: "HE003", codigo: "HE003", nombre: "Amoladora angular 4.5\" 800W", categoria: "herramientas", categoriaNombre: "Herramientas (Manuales y Eléctricas)", precio: 54990, stock: 8, stockMinimo: 2, imagen: "imagenes/esmeril.png" },
  
  { id: "GS001", codigo: "GS001", nombre: "Cañería PVC 1/2\" x 6m", categoria: "gasfiteria", categoriaNombre: "Gasfitería", precio: 5490, stock: 30, stockMinimo: 10, imagen: "imagenes/Tubo.png" },
  { id: "GS009", codigo: "GS009", nombre: "Grifería lavamanos monocomando cromo", categoria: "gasfiteria", categoriaNombre: "Gasfitería", precio: 22990, stock: 10, stockMinimo: 3, imagen: "imagenes/llaveDeMano.png" },
  { id: "GS010", codigo: "GS010", nombre: "Grifería cocina monocomando cuello alto", categoria: "gasfiteria", categoriaNombre: "Gasfitería", precio: 28990, stock: 8, stockMinimo: 2, imagen: "imagenes/llave.png" },
  
  { id: "EL001", codigo: "EL001", nombre: "Cable unipolar 1.5mm² (por metro)", categoria: "electricidad", categoriaNombre: "Electricidad", precio: 590, stock: 100, stockMinimo: 30, imagen: "imagenes/cableUnipolar.png" },
  { id: "EL003", codigo: "EL003", nombre: "Cable dúplex paralelo 2x1.5mm² (por metro)", categoria: "electricidad", categoriaNombre: "Electricidad", precio: 990, stock: 80, stockMinimo: 25, imagen: "imagenes/cable.png" },
  { id: "EL011", codigo: "EL011", nombre: "Ampolleta LED 9W E27 luz fría", categoria: "electricidad", categoriaNombre: "Electricidad", precio: 3990, stock: 60, stockMinimo: 20, imagen: "imagenes/ampolletaLed.png" },
  
  { id: "TR001", codigo: "TR001", nombre: "Tornillo autoperf. 8x1\" caja 100 unid.", categoria: "tornilleria", categoriaNombre: "Tornillería y Fijaciones", precio: 2990, stock: 40, stockMinimo: 12, imagen: "imagenes/cajaTornillo.png" },
  { id: "TR008", codigo: "TR008", nombre: "Anclaje químico epoxi 300ml", categoria: "tornilleria", categoriaNombre: "Tornillería y Fijaciones", precio: 15990, stock: 8, stockMinimo: 2, imagen: "imagenes/anclajeQuimico.png" },
  
  { id: "MD002", codigo: "MD002", nombre: "Pino cepillado 2x4\" x 3m", categoria: "madera", categoriaNombre: "Madera y Tableros", precio: 7490, stock: 30, stockMinimo: 10, imagen: "imagenes/pinoCepillado.png" },
  { id: "MD005", codigo: "MD005", nombre: "OSB 9mm 1.22x2.44m", categoria: "madera", categoriaNombre: "Madera y Tableros", precio: 18990, stock: 18, stockMinimo: 5, imagen: "imagenes/OSB.png" },
  
  { id: "SE001", codigo: "SE001", nombre: "Casco seguridad blanco", categoria: "seguridad", categoriaNombre: "Seguridad y EPP", precio: 6990, stock: 15, stockMinimo: 5, imagen: "imagenes/cascoBlanco.png" },
  { id: "SE005", codigo: "SE005", nombre: "Arnés de seguridad 1 punto", categoria: "seguridad", categoriaNombre: "Seguridad y EPP", precio: 34990, stock: 4, stockMinimo: 1, imagen: "imagenes/arnesDeSeguridad.png" },
  
  { id: "JA001", codigo: "JA001", nombre: "Manguera riego 3/4\" x 25m", categoria: "jardin", categoriaNombre: "Jardinería", precio: 22990, stock: 6, stockMinimo: 2, imagen: "imagenes/manegeraDeRiego.png" },
  { id: "JA004", codigo: "JA004", nombre: "Pala punta redonda #2 con mango", categoria: "jardin", categoriaNombre: "Jardinería", precio: 10990, stock: 8, stockMinimo: 2, imagen: "imagenes/palaPuntaRedonda.png" }
];

function App() {
  const [productos, setProductos] = useState(productosCatalogoBase);
  const [vistaActual, setVistaActual] = useState('inicio');
  const [carrito, setCarrito] = useState([]);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [historialPedidos, setHistorialPedidos] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setCarrito((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad: nuevaCantidad } : item))
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const agregarPedido = (nuevoPedido) => {
    setHistorialPedidos([nuevoPedido, ...historialPedidos]);
  };

  const cerrarSesion = () => {
    setUsuarioLogueado(null);
    setVistaActual('inicio');
  };

  const cantidadTotalCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecioCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar 
        vistaActual={vistaActual}
        setVistaActual={setVistaActual}
        cantidadCarrito={cantidadTotalCarrito}
        usuarioLogueado={usuarioLogueado}
        setUsuarioLogueado={setUsuarioLogueado}
        cerrarSesion={cerrarSesion}
      />

      <main className="flex-grow-1">
        {vistaActual === 'inicio' && (
          <Inicio productos={productos} agregarAlCarrito={agregarAlCarrito} />
        )}

        {vistaActual === 'carrito' && (
          <Carrito 
            carrito={carrito}
            actualizarCantidad={actualizarCantidad}
            eliminarDelCarrito={eliminarDelCarrito}
            totalCarrito={totalPrecioCarrito}
            vaciarCarrito={vaciarCarrito}
            setVistaActual={setVistaActual}
            agregarPedido={agregarPedido}
          />
        )}

        {vistaActual === 'contacto' && <Contacto />}

        {vistaActual === 'pedidos' && <Pedidos historialPedidos={historialPedidos} />}

        {vistaActual === 'vendedor' && (
          <PanelVendedor productos={productos} />
        )}

        {vistaActual === 'admin' && (
          <PanelAdmin productos={productos} setProductos={setProductos} />
        )}
      </main>

      <footer className="mt-4 py-3 text-center border-top bg-white">
        <div className="container">
          <small>© 2026 - Ferretería Hermanos Mario y Luigi - Todos los derechos reservados</small>
        </div>
      </footer>
    </div>
  );
}

export default App;