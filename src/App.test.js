import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('Pruebas en Componente App', () => {
  test('1. Renderiza el título principal de la ferretería', () => {
    render(<App />);
    const elementosTitulo = screen.getAllByText(/Ferretería Hermanos Mario y Luigi/i);
    expect(elementosTitulo.length).toBeGreaterThan(0);
    expect(elementosTitulo[0]).toBeInTheDocument();
  });

  test('2. Renderiza el botón de Iniciar Sesión / Mi Cuenta', () => {
    render(<App />);
    const botonLogin = screen.getByText(/INICIAR SESIÓN \/ MI CUENTA/i);
    expect(botonLogin).toBeInTheDocument();
  });

  test('3. Inicia con el contador del carrito en 0', () => {
    render(<App />);
    const contadorCarrito = screen.getByText('0');
    expect(contadorCarrito).toBeInTheDocument();
  });

  afterAll(() => {
    console.log('\n======================================================');
    console.log('Módulo 1: Componente Principal (src/App.test.js)');
    console.log('1. Prueba 1 (Renderizado de Título): Verifica que el nombre "Ferretería Hermanos Mario y Luigi" esté visible en el encabezado.');
    console.log('2. Prueba 2 (Acceso de Usuario): Comprueba que el botón "INICIAR SESIÓN / MI CUENTA" esté presente en la interfaz.');
    console.log('3. Prueba 3 (Estado Inicial del Carrito): Valida que el contador del carrito comience en 0 al cargar la aplicación por primera vez.');
    console.log('======================================================\n');
  });
});