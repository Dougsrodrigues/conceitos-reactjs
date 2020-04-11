import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositories();
  }, []);

  const getRepositories = async () => {
    const res = await api.get("repositories");
    setRepositories(res.data);
  };
  async function handleAddRepository() {
    const body = {
      title: "Desafio conceitos React Js",
      url: "http://github...",
      techs: ["React Js, Javascript"]
    };
    const res = await api.post("repositories", body);
    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, i) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
