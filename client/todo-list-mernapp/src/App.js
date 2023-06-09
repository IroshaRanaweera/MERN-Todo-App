import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [itemText, setItemText] = useState('');
  const [listItems,setListItems] = useState([]);

  //add new Todo item to database
  const addItem = async (e) => {
    console.log(1);
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5500/api/item', {item: itemText})
      console.log(res);
      setItemText('');
    }catch(err){
      console.log(err);
    }

  }

//create function to fetch all todo items from database -- we will use useEffect hook 
useEffect(()=>{
  const getItemList = async () =>{
    try{
      const res = await axios.get('http://localhost:5500/api/items')
      setListItems(res.data);
    }catch(err){
      console.log(err);
    }
  }
  getItemList()
},[listItems])
  
//delete item when click delete
const deleteItem = async (id)=>{
  console.log("Enter to code")
  console.log(id);
  try{
    const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
    const newListItems = listItems.filter(item=>item._id !== id);
    setListItems(newListItems)
    console.log(res.data);
  }catch(err){
    console.log(err);
  }
}

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form" onSubmit= {e=>addItem(e)}>
        <input type = "text" placeholder='Add Todo Item' onChange={e=>{setItemText(e.target.value)}} value={itemText}/>
        <button type = "submit">Add</button>
      </form>
      <div className ="todo-listItems">
        {
          listItems.map(item =>(
          <div className = "todo-item">
            <p className="item-content">{item.item}</p>
            <button className="Update-item">Update</button>
            <button className="Delete-item" onClick ={()=>{deleteItem(item._id)}}>Delete</button>
          </div>
          ))
        }
          
      </div>  
    </div>
  );
}

export default App;




{/* <div className = "todo-item">
            <p className="item-content">this is the item 1</p>
            <button className="Update-item">Update</button>
            <button className="Delete-item">Delete</button>
          </div> */}
          {/* <div className = "todo-item">
            <p className="item-content">this is the item 2</p>
            <button className="Update-item">Update</button>
            <button className="Delete-item">Delete</button>
          </div> */}
          {/* <div className = "todo-item">
            <p className="item-content">this is the item 3</p>
            <button className="Update-item">Update</button>
            <button className="Delete-item">Delete</button>
          </div> */}