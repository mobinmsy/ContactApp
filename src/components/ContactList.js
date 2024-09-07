import React from 'react';

const ContactList = ({ contacts, deleteContact, editContact, toggleSelect, deleteSelectedContacts }) => {
    return (
        <div>
            <button onClick={deleteSelectedContacts}>حذف گروهی</button>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>
                        <input type="checkbox" checked={contact.isSelected} onChange={() => toggleSelect(contact.id)} />
                        {contact.name} {contact.lastName} - {contact.email} - {contact.phone}
                        <button onClick={() => editContact(contact)}>ویرایش</button>
                        <button onClick={() => deleteContact(contact.id)}>حذف</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;