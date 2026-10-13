import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalLogin from './ModalLogin';

describe('Pruebas en Componente ModalLogin', () => {
  const mockSetMostrar = jest.fn();
  const mockSetUsuarioLogueado = jest.fn();
  const mockSetVistaActual = jest.fn();

  test('8. Renderiza las pestañas de acceso Cliente, Vendedor y Administrador', () => {
    render(
      <ModalLogin 
        mostrar={true} 
        setMostrar={mockSetMostrar} 
        setUsuarioLogueado={mockSetUsuarioLogueado}
        setVistaActual={mockSetVistaActual}
      />
    );

    expect(screen.getByRole('button', { name: /^Cliente$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Vendedor$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Administrador$/i })).toBeInTheDocument();
  });

  test('9. Muestra el botón de Entrar como Vendedor al hacer clic en la pestaña Vendedor', () => {
    render(
      <ModalLogin 
        mostrar={true} 
        setMostrar={mockSetMostrar} 
        setUsuarioLogueado={mockSetUsuarioLogueado}
        setVistaActual={mockSetVistaActual}
      />
    );

    const tabVendedor = screen.getByRole('button', { name: /^Vendedor$/i });
    fireEvent.click(tabVendedor);

    expect(screen.getByRole('button', { name: /Entrar como Vendedor/i })).toBeInTheDocument();
  });

  test('10. Muestra el botón de REGISTRARSE E INICIAR SESIÓN en la pestaña de Cliente', () => {
    render(
      <ModalLogin 
        mostrar={true} 
        setMostrar={mockSetMostrar} 
        setUsuarioLogueado={mockSetUsuarioLogueado}
        setVistaActual={mockSetVistaActual}
      />
    );

    const botonRegistro = screen.getByRole('button', { name: /REGISTRARSE E INICIAR SESIÓN/i });
    expect(botonRegistro).toBeInTheDocument();
  });

  afterAll(() => {
    console.log('\n======================================================');
    console.log('Módulo 3: Autenticación y Modal (src/components/ModalLogin.test.js)');
    console.log('1. Prueba 8 (Pestañas de Roles): Revisa que el modal muestre exactamente las 3 pestañas de acceso (Cliente, Vendedor y Administrador).');
    console.log('2. Prueba 9 (Cambio a Vendedor): Comprueba que al presionar la pestaña Vendedor cambie el formulario y aparezca el botón "Entrar como Vendedor".');
    console.log('3. Prueba 10 (Registro de Cliente): Verifica que en la pestaña Cliente se encuentre disponible el botón "REGISTRARSE E INICIAR SESIÓN" para nuevos usuarios.');
    console.log('======================================================\n');
  });
});