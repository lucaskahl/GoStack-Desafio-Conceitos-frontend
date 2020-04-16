import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  const handleAddRepository = async () => {
    const response = await api.post('/repositories', {
      url: 'https://github.com/Rocketseat/unform',
      title: 'Unform',
      techs: ['Node', 'Express', 'TypeScript'],
    });

    setRepositories([...repositories, response.data]);
  };

  const handleRemoveRepository = async (id) => {
    if (id) {
      await api.delete(`/repositories/${id}`);
      const filteredRepositories = repositories.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      });

      return setRepositories(filteredRepositories);
    }
  };

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
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
