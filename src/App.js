import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          throw new Error('Los datos recibidos no son un array');
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleCreateUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_vendedor: nombre, apellido_materno: apellido }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newUser = await response.json();
      setUsuarios([...usuarios, newUser]);
      setNombre('');
      setApellido('');
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${editUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_vendedor: nombre, apellido_materno: apellido }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedUser = await response.json();
      setUsuarios(usuarios.map(user => (user.idUsuarios === editUserId ? updatedUser : user)));
      setNombre('');
      setApellido('');
      setEditUserId(null);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setUsuarios(usuarios.filter(user => user.idUsuarios !== id));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUserId) {
      handleUpdateUser();
    } else {
      handleCreateUser();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Usuarios de la API</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
          <button type="submit">{editUserId ? 'Actualizar' : 'Crear'}</button>
          {editUserId && (
            <button onClick={() => { setEditUserId(null); setNombre(''); setApellido(''); }}>
              Cancelar
            </button>
          )}
        </form>
        <ul>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <li key={usuario.idUsuarios}>
                <p>{usuario.nombre_vendedor} - {usuario.apellido_materno}</p>
                <div>
                  <button className="edit" onClick={() => { setEditUserId(usuario.idUsuarios); setNombre(usuario.nombre_vendedor); setApellido(usuario.apellido_materno); }}>Editar</button>
                  <button className="delete" onClick={() => handleDeleteUser(usuario.idUsuarios)}>Eliminar</button>
                </div>
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












