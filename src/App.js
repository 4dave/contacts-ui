import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import axios from "axios"
import "./App.css"
import ReadOnlyRow from "./components/ReadOnlyRow"
import EditableRow from "./components/EditableRow"

const App = () => {
  const [contacts, setContacts] = useState([])
  const [editContactId, setEditContactId] = useState(null)
  // const [addFormData, setAddFormData] = useState({
  //   fullname: "",
  //   address: "",
  //   phonenumber: "",
  //   email: "",
  // })
  const [addFormData, setAddFormData] = useState({})

  const [editFormData, setEditFormData] = useState({
    fullname: "",
    address: "",
    phonenumber: "",
    email: "",
  })

  const getContacts = async () => {
    const response = await axios.get("http://localhost:8000/api/v1/contacts")
    setContacts(response.data)
  }

  useEffect(() => {
    getContacts()
  }, [])

  function onAddContact(e) {
    e.preventDefault()
    axios
      .post("http://localhost:8000/api/v1/contact", addFormData)
      .then(() => {
        getContacts()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Delete contact
  const deleteContact = async (id) => {
    try {
      const response = await axios.delete(`/api/contacts/${id}`)
      setContacts(contacts.filter((contact) => contact.id !== id))
    } catch (error) {
      console.log(error)
    }
  }
  // Update contact
  const updateContact = async (id, contact) => {
    try {
      const response = await axios.put(`/api/contacts/${id}`, contact)
      setContacts(
        contacts.map((contact) => {
          if (contact.id === id) {
            return response.data
          }
          return contact
        })
      )
    } catch (error) {
      console.log(error)
    }
  }

  // function onEditContact(contact) {
  //   axios
  //     .put(`http://localhost:8000/api/v1/contacts/${contact.id}`, contact)
  //     .then((response) => {
  //       setContacts(contacts.map((c) => {
  //         if (c.id === contact.id) {
  //           return contact
  //         }
  //         return c
  //       }))
  //     })
  // }

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

  const handleAddFormSubmit = (event) => {
    event.preventDefault()

    const newContact = {
      fullname: addFormData.fullname,
      address: addFormData.address,
      phonenumber: addFormData.phonenumber,
      email: addFormData.email,
    }

    const newContacts = [...contacts, newContact]
    setContacts(newContacts)
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
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault()
    setEditContactId(contact.id)

    const formValues = {
      fullname: contact.fullname,
      address: contact.address,
      phonenumber: contact.phonenumber,
      email: contact.email,
    }

    setEditFormData(formValues)
  }

  const handleCancelClick = () => {
    setEditContactId(null)
  }

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts]

    const index = contacts.findIndex((contact) => contact.id === contactId)

    newContacts.splice(index, 1)

    setContacts(newContacts)
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
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Contact</h2>
      {/* handleAddFormSubmit => onAddContact */}
      <form onSubmit={onAddContact}>
        <input
          type="text"
          name="fullname"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phonenumber"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default App
