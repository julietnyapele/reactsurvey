import React, { useState } from 'react';
import Navigation from './Navbar';

const EditProfile = ({ user, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleUpdate = () => {
    onUpdate({ name, email, phone });
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    
    <div className="profile">
        <Navigation/>
      {editing ? (
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
      <div className="user-details">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <button onClick={handleDelete}>Delete Profile</button>
      </div>
    </div>
  );
};

export default EditProfile;
