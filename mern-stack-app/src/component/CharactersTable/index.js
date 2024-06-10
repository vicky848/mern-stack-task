import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharactersTable = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    
    axios.get('/api/characters')
      .then(response => {
        setCharacters(response.data.characters);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });
  }, []);

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Birth Year</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character => (
            <tr key={character.url}>
              <td>{character.name}</td>
              <td>{character.gender}</td>
              <td>{character.birth_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharactersTable;
