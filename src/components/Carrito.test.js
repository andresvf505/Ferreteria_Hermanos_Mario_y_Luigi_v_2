import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Carrito from './Carrito';

describe('Pruebas en Componente Carrito', () => {
  const mockSetVistaActual = jest.fn();
  const mockAgregarPedido = jest.fn();
  const mockVaciarCarrito = jest.fn();

  const carritoEjemplo = [
    {
      id: 'MC003',
      nombre: 'Mortero cola cerámica 25 kg',
      precio: 5200,
      cantidad: 1,
      imagen: 'imagenes/morteroCola.png'
    }
  ];

  test('4. Muestra el mensaje de carrito vacío cuando no hay ítems', () => {
    render(
      <Carrito 
        carrito={[]} 
        totalCarrito={0} 
        setVistaActual={mockSetVistaActual} 
      />
    );
    expect(screen.getByText(/Tu carrito de compras está vacío/i)).toBeInTheDocument();
  });

  test('5. Renderiza los productos del carrito correctamente en la tabla', () => {
    render(
      <Carrito 
        carrito={carritoEjemplo} 
        totalCarrito={5200} 
        setVistaActual={mockSetVistaActual} 
      />
    );
    expect(screen.getByText('Mortero cola cerámica 25 kg')).toBeInTheDocument();
  });

  test('6. Despliega el formulario de despacho al hacer clic en PAGAR PEDIDO', () => {
    render(
      <Carrito 
        carrito={carritoEjemplo} 
        totalCarrito={5200} 
        setVistaActual={mockSetVistaActual}
        vaciarCarrito={mockVaciarCarrito}
        agregarPedido={mockAgregarPedido}
      />
    );

    const botonPagar = screen.getByRole('button', { name: /PAGAR PEDIDO/i });
    fireEvent.click(botonPagar);

    expect(screen.getByText(/Datos para la Orden de Compra y Despacho/i)).toBeInTheDocument();
  });

  test('7. Ejecuta la función vaciarCarrito al pulsar el botón VACIAR CARRITO', () => {
    render(
      <Carrito 
        carrito={carritoEjemplo} 
        totalCarrito={5200} 
        vaciarCarrito={mockVaciarCarrito}
        setVistaActual={mockSetVistaActual} 
      />
    );

    const botonVaciar = screen.getByRole('button', { name: /VACIAR CARRITO/i });
    fireEvent.click(botonVaciar);

    expect(mockVaciarCarrito).toHaveBeenCalledTimes(1);
  });

  afterAll(() => {
    console.log('\n======================================================');
    console.log('Módulo 2: Carrito de Compras (src/components/Carrito.test.js)');
    console.log('1. Prueba 4 (Estado Vacío): Muestra correctamente el mensaje "Tu carrito de compras está vacío" cuando no hay ítems agregados.');
    console.log('2. Prueba 5 (Visualización de Productos): Confirma que los productos agregados (como el "Mortero cola cerámica 25 kg") se rendericen correctamente en la tabla.');
    console.log('3. Prueba 6 (Despliegue de Checkout): Verifica que al hacer clic en "PAGAR PEDIDO" se despliegue en pantalla el formulario "Datos para la Orden de Compra y Despacho".');
    console.log('4. Prueba 7 (Función Vaciar Carrito): Valida que al presionar "VACIAR CARRITO" se llame a la función correspondiente para limpiar la lista.');
    console.log('======================================================\n');
  });
});