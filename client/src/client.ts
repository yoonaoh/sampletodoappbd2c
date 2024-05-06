import { Identity, TodoItem } from "./models";

let baseHostUrl = '/api';

// eslint-disable-next-line no-restricted-globals
if(location.hostname === 'localhost'){
    baseHostUrl = 'http://localhost:3001/api';
}

export const getItems = async () => {
    let items: TodoItem[] = [];
    try{
        const r = await fetch(`${baseHostUrl}/items`);
        items = await r.json() as TodoItem[]; 
    }catch(e){
        console.log(e);
    }

    return items;
}

export const addItem = async (description: string) =>{
    try {
        const r = await fetch(`${baseHostUrl}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ description: description })
        });
  
        return await r.json();
    }catch(e){
        console.log(e);
    }
}

export const deleteItem = async (id: number) =>{
    try {
        await fetch(`${baseHostUrl}/items/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: id })
        });
    } catch(e){
        console.log(e);
        return false;
    }

    return true;
}

export const getUserInfo = async () =>{
    try{
        const response = await fetch(`/.auth/me`);
        return await response.json() as Identity;
    }catch(e){
        console.log(e);
    }
}