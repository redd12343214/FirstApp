import {useEffect, useState} from 'react';
const backendURL = import.meta.env.VITE_BACKEND_URL

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetch(`${backendURL}/notes`)
    .then(response => response.json())
    .then(data => setNotes(data))
    .catch(error => console.error('Error fetching notes:', error));
  }, []);

  const handleAddNote = () => {
    fetch(`${backendURL}/notes?content=${encodeURIComponent(newNote)}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .then(addedNote => {
        setNotes(prev => [...prev, addedNote]);
        setNewNote('');
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newNote}
        onChange={e => setNewNote(e.target.value)}
        placeholder="New note"
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
}

export default App