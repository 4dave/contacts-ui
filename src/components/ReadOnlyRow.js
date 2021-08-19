import React from "react"

const ReadOnlyRow = ({ contact, handleEditClick, deleteContact }) => {
  return (
    <tr key={contact.ID}>
      <td>{contact.fullname}</td>
      <td>{contact.address}</td>
      <td>{contact.phonenumber}</td>
      <td>{contact.email}</td>
      <td>
        <button type="button" onClick={() => handleEditClick(contact)}>
          Edit
        </button>
        <button type="button" onClick={() => deleteContact(contact.ID)}>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default ReadOnlyRow
