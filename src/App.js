import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';
import './App.css';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [modalData, setModalData] = useState(null);

    const addOrUpdateContact = (contact) => {
        if (selectedContact) {
            setContacts(contacts.map(c => (c.id === contact.id ? contact : c)));
        } else {
            setContacts([...contacts, { ...contact, isSelected: false }]);
        }
        setSelectedContact(null);
    };

    const deleteContact = (id) => {
        setModalAction(() => () => {
            setContacts(contacts.filter(contact => contact.id !== id));
            setIsModalVisible(false);
        });
        setIsModalVisible(true);
    };

    const editContact = (contact) => {
        setSelectedContact(contact);
    };

    const toggleSelect = (id) => {
        setContacts(contacts.map(contact => contact.id === id ? { ...contact, isSelected: !contact.isSelected } : contact));
    };

    const deleteSelectedContacts = () => {
        setModalAction(() => () => {
            setContacts(contacts.filter(contact => !contact.isSelected));
            setIsModalVisible(false);
        });
        setModalData(contacts.filter(contact => contact.isSelected));
        setIsModalVisible(true);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="app">
            <h1>مدیریت مخاطبین</h1>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <ContactForm addOrUpdateContact={addOrUpdateContact} selectedContact={selectedContact} />
            <ContactList
                contacts={filteredContacts}
                deleteContact={deleteContact}
                editContact={editContact}
                toggleSelect={toggleSelect}
                deleteSelectedContacts={deleteSelectedContacts}
            />
            <Modal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onConfirm={modalAction}
                message={modalData ? `آیا مطمئن هستید که می‌خواهید ${modalData.length} مخاطب را حذف کنید؟` : 'آیا مطمئن هستید؟'}
            />
        </div>
    );
};

export default App;