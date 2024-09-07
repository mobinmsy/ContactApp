import React, { useState, useEffect } from 'react';

const ContactForm = ({ addOrUpdateContact, selectedContact }) => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (selectedContact) {
            setName(selectedContact.name);
            setLastName(selectedContact.lastName);
            setEmail(selectedContact.email);
            setPhone(selectedContact.phone);
        } else {
            setName('');
            setLastName('');
            setEmail('');
            setPhone('');
        }
    }, [selectedContact]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            addOrUpdateContact({ id: selectedContact ? selectedContact.id : Date.now(), name, lastName, email, phone });
            clearForm();
        }
    };

    const validateForm = () => {
        if (name === '' || lastName === '' || !validateEmail(email) || phone === '') {
            alert('لطفاً تمامی فیلدها را به درستی وارد کنید.');
            return false;
        }
        return true;
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const clearForm = () => {
        setName('');
        setLastName('');
        setEmail('');
        setPhone('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="نام" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="نام خانوادگی" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <input type="email" placeholder="ایمیل" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="شماره تماس" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <button type="submit">{selectedContact ? 'ویرایش مخاطب' : 'افزودن مخاطب'}</button>
        </form>
    );
};

export default ContactForm;