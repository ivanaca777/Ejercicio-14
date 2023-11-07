import './App.css';

import React, { useState } from "react";

function App() {
  const [notas, setNotas] = useState([]);
  const [nuevaNota, setNuevaNota] = useState({ titulo: "", contenido: "" });
  const [indiceEditado, setIndiceEditado] = useState(null);
  const [edicionNota, setEdicionNota] = useState({ titulo: "", contenido: "" });

  const guardarNota = () => {
    if (nuevaNota.titulo && nuevaNota.contenido) {
      setNotas([...notas, { ...nuevaNota, favorita: false }]);
      setNuevaNota({ titulo: "", contenido: "" });
    }
  };

  const editarNota = (indice) => {
    setIndiceEditado(indice);
    setEdicionNota({ ...notas[indice] });
  };

  const guardarNotaEditada = () => {
    if (indiceEditado !== null) {
      const notasActualizadas = [...notas];
      notasActualizadas[indiceEditado] = { ...edicionNota };
      setNotas(notasActualizadas);
      setIndiceEditado(null);
      setEdicionNota({ titulo: "", contenido: "" });
    }
  };

  const eliminarNota = (indice) => {
    const notasActualizadas = [...notas];
    notasActualizadas.splice(indice, 1);
    setNotas(notasActualizadas);
  };

  const alternarFavorita = (indice) => {
    const notasActualizadas = [...notas];
    notasActualizadas[indice].favorita = !notasActualizadas[indice].favorita;
    setNotas(notasActualizadas);
  };

  const cancelarEdicion = () => {
    setIndiceEditado(null);
    setEdicionNota({ titulo: "", contenido: "" });
  };

  return (
    <body>
      <header>
        <h1>Mis Notas</h1>

        <div>
          <input
            type="text"
            placeholder="Título de la nota"
            value={nuevaNota.titulo}
            onChange={(e) => setNuevaNota({ ...nuevaNota, titulo: e.target.value })}
          />
          <textarea
            placeholder="Escribe la Nota"
            value={nuevaNota.contenido}
            onChange={(e) =>
              setNuevaNota({ ...nuevaNota, contenido: e.target.value })
            }
          />
          <button onClick={guardarNota}>Guardar</button>
        </div>

      </header>

      <main>
        {notas.map((nota, indice) => (
          <div key={indice} className={nota.favorita ? "nota-favorita" : "nota"}>
            {indice === indiceEditado ? (
              <div className='editar'>

                <input type="text" value={edicionNota.titulo} onChange={(e) =>
                    setEdicionNota({ ...edicionNota, titulo: e.target.value })
                  }
                />

                <textarea value={edicionNota.contenido} onChange={(e) =>
                    setEdicionNota({ ...edicionNota, contenido: e.target.value })
                  }
                />
                
                <div>
                  <button onClick={guardarNotaEditada}>Guardar</button>
                  <button onClick={cancelarEdicion}>Cancelar</button>
                </div>

              </div>
            ) : (
              <div>
                <h2 className='h2'>{nota.titulo}</h2>
                <p>{nota.contenido}</p>
                <div className='botones'>
                  <button onClick={() => editarNota(indice)}>Editar</button>
                  <button onClick={() => eliminarNota(indice)}>Eliminar</button>
                  <button onClick={() => alternarFavorita(indice)}>
                    {nota.favorita ? "Quitar Favorita" : "¡Favorita!"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </main>
    </body>
  );
}

export default App;
