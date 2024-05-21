import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Definir el estado para almacenar los datos de la API
  const [usuarios, setUsuarios] = useState([]);

  // Función para hacer la solicitud a la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Iniciando solicitud a la API');
        
        // Realizar la solicitud a la API
        const response = await fetch('http://localhost:3000/users');
        
        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
          throw new Error('No se pudo obtener los datos');
        }

        // Convertir la respuesta a formato JSON
        const data = await response.json();

        // Mostrar en consola los datos recibidos
        console.log('Datos recibidos de la API:', data);

        // Verificar si los datos recibidos son un array
        if (Array.isArray(data)) {
          // Actualizar el estado con los datos de la API
          setUsuarios(data);
        } else {
          throw new Error('Los datos recibidos no son un array');
        }

      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    // Llamar a la función fetchData
    fetchData();
  }, []); // El segundo argumento del useEffect indica que se debe ejecutar solo una vez al cargar el componente

  useEffect(() => {
    // Este useEffect solo se usa para fines de depuración y se ejecutará cada vez que 'usuarios' cambie
    console.log('Estado usuarios actualizado:', usuarios);
  }, [usuarios]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Usuarios de la API</h1>
        {/* Mostrar los datos de la API */}
        <ul>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <li key={usuario.idUsuarios}>
                {usuario.nombre_vendedor} - {usuario.apellido_materno}
              </li>
            ))
          ) : (
            <p>No se encontraron usuarios</p>
          )}
        </ul>
      </header>
    </div>
  );
}

export default App;










