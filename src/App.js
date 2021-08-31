import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"
import ReadOnlyRow from "./components/ReadOnlyRow"
import EditableRow from "./components/EditableRow"

const App = () => {
  const [contacts, setContacts] = useState([])
  const [editContactId, setEditContactId] = useState(null)
  const [addFormData, setAddFormData] = useState({})
  const [editFormData, setEditFormData] = useState({})

  useEffect(() => {
    getContacts()
  }, [])

  const getContacts = async () => {
    const response = await axios.get("http://192.168.86.30:8000/contacts")
    setContacts(response.data)
    console.log(response.data)
  }

  const createContact = (e) => {
    e.preventDefault()
    e.target.reset()
    axios
      .post("http://192.168.86.30:8000/contact", addFormData)
      .then(() => {
        getContacts()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const deleteContact = (id) => {
    axios
      .delete(`http://192.168.86.30:8000/contact/${id}`)
      .then(() => {
        getContacts()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const updateContact = (id) => {
    axios
      .put(`http://192.168.86.30:8000/contact/${id}`, editFormData)
      .then(() => {
        getContacts()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleAddFormChange = (event) => {
    event.preventDefault()
    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value
    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue
    setAddFormData(newFormData)
  }

  const handleEditFormChange = (event) => {
    event.preventDefault()
    const fieldName = event.target.getAttribute("name")
    const fieldValue = event.target.value
    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue
    setEditFormData(newFormData)
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault()
    const editedContact = {
      id: editContactId,
      fullname: editFormData.fullname,
      address: editFormData.address,
      phonenumber: editFormData.phonenumber,
      email: editFormData.email,
    }
    const newContacts = [...contacts]
    const index = contacts.findIndex((contact) => contact.id === editContactId)
    newContacts[index] = editedContact
    setContacts(newContacts)
    setEditContactId(null)
    updateContact(editedContact.id)
  }

  const handleEditClick = (contact) => {
    setEditContactId(contact.id)
    const formValues = {
      fullname: contact.fullname,
      address: contact.address,
      phonenumber: contact.phonenumber,
      email: contact.email,
    }
    setEditFormData(formValues)
    // return formValues
  }

  const handleCancelClick = () => {
    setEditContactId(null)
  }

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <React.Fragment key={index}>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    deleteContact={deleteContact}
                  />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add a Contact</h2>
      <form onSubmit={createContact} className="create">
        <input
          type="text"
          name="fullname"
          required="required"
          placeholder="name"
          autoFocus="autofocus"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="address"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phonenumber"
          required="required"
          placeholder="phone"
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="email"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default App
