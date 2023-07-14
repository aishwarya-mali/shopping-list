import { useState } from "react";

export default function App() {
  // Initialize the state of the list of items to an empty array using the useState hook
  const [items, setItems] = useState([])

  // Add a new item to the list when the user submits the form
  function handleAddItem(item) {
    setItems(items => [...items, item])
  }

  // Remove an item from the list when the user clicks the delete button
  function handleDeleteItem(id) {
    setItems(items => [...items.filter(i => i.id !== id)])
  }

  // Clear the entire list when the user clicks the "Clear All" button
  function handleClearAll() {
    const deleteItems = window.confirm('Are you sure you wish to delete all items?')
    if (deleteItems) setItems([])
  }

  // Render and fetch the different components of the application
  return (
    <div className="app">
      <Header />
      <AddItem onAddItem={handleAddItem} />
      <Items items={items} onDeleteItem={handleDeleteItem} />
      {items.length > 0 && <button onClick={handleClearAll} className="btn mt-20">Clear All</button>}
    </div>
  );
}

//Fetch the header of the application
function Header() {
  return (
    <h1 className="border-bottom">🛍️ Shopping List</h1>
  )
}

// Render the form for adding items to the list
function AddItem({ onAddItem }) {
  const [item, setItem] = useState("")

  // Add a new item to the list when the user submits the form
  function handleSubmit(e) {
    e.preventDefault()
    if (!item) return
    const newItem = {
      item,
      id: Date.now()
    }
    onAddItem(newItem)
    setItem("")
  }

  // Render the form for adding items to the list
  return (
    <div className="border-bottom">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Item" value={item} onChange={e => setItem(e.target.value)} />
        <button className="btn">Add Item</button>
      </form>
    </div>
  )
}

// Render the list of items and provide a button to delete each item
function Items({ items, onDeleteItem }) {
  return (
    <ul className="items">
      {items.map(i => (
        <li key={i.id}>{i.item} <button onClick={() => onDeleteItem(i.id)}>❌</button></li>
      ))}
    </ul>
  )
}