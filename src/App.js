import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ type: '', show: false, msg: '' });




  // for submiting
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, 'danger', 'please add items')
    } else if (name && isEditing) {

    } else {
      showAlert(true, 'success', ' item added to the lest')
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([newItem]);
      setName('')
    }
  }

  // for showing alrt
  const showAlert = (show = false, type = '', msg = "") => {
    setAlert({ show, type, msg })
  }

  // for clearing list
  const clearList = () => {
    showAlert(true, 'danger', 'Empty  List');
    setList([])
  }

  // const clear individual item
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id))
  }
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} showAlert={showAlert} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input type="text"
            onChange={(e) => { setName(e.target.value) }}
            placeholder='e.g. eegs'
            className=' grocery'
            value={name} />
          <button type="submit" className='submit-btn'>{isEditing ? "Edit" : 'submit'}</button>
        </div>
      </form>
      {list.length > 0 &&
        (< div className="grocery-container">
          <List items={list} removeItem={removeItem} />
          <button className='clear-btn' onClick={clearList}>Clear Items</button>
        </div>)
      }
    </section >

  )
}

export default App