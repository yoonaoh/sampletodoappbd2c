import { useEffect, useState } from 'react';
import './App.css';
import { getItems, addItem, deleteItem } from './client';
import { TodoItem } from './models';
import Profile from './profile';

function App() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [newItem, setNewItem] = useState('');

  const isAuthenticated = true;

  useEffect(() => {
    const initialize = async () =>{
      const items = await getItems();
      setItems(items);
    }

    initialize();
  }, [])

  const addNewItem = async (description: string) => {
      const newItem = await addItem(description);
      if(newItem){
        const newItemsList = [...items];
        newItemsList.push(newItem);
        setItems(newItemsList);
        setNewItem('');  
      }
  }

  const callDeleteItem = async (id: number) => {
      const success = await deleteItem(id);
      if(success){
        let updatedItemsList = [...items];
        const indexToDelete = items.findIndex(i => i.id === id);
        updatedItemsList.splice(indexToDelete, 1);
        setItems(updatedItemsList);  
      }
  }

  const listItems = items.map((i) => {
    return <li className='list-group-item' key={i.id}>
      <button className='btn btn-light' onClick={() => callDeleteItem(i.id)}>X</button>
      <div>{i.description} </div>
    </li>
  });

  return (
    <div className="App">
      <Profile />

      <header>
        <h1>TODO List</h1>
      </header>
      <section className="list-section">
        <ul className='list-group'>
          {listItems}
        </ul>
        <div className='form-section'>
          <input className='form-control' 
            type="text" value={newItem} 
            onChange={e => setNewItem(e.target.value)}
            disabled={!isAuthenticated}></input>
          <button onClick={() => addNewItem(newItem)} className='btn btn-primary' disabled={!isAuthenticated}>Add</button>
        </div>

      </section>

    </div>
  );
}

export default App;
