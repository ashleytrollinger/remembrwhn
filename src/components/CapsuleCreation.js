import React from 'react';
import styles from '../styles/capsule-creation.module.css';

export default function CapsuleCreationForm() {
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [photos, setPhotos] = React.useState([]);
  const [openDate, setOpenDate] = React.useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handlePhotosChange = (event) => {
    // Assuming you have a function to handle photo uploads and update the `photos` state
    const uploadedPhotos = Array.from(event.target.files);
    setPhotos(uploadedPhotos);
  };

  const handleDateChange = (event) => {
    setOpenDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle capsule creation logic here, e.g., sending API request
    // Reset the form
    setTitle('');
    setMessage('');
    setPhotos([]);
    setOpenDate('');
  };

  return (
    <div className={styles.capsuleCreationFormContainer}>
      <h3 className={styles.formHeading}>Create a New Capsule</h3>
      <form className={styles.capsuleCreationForm} onSubmit={handleSubmit}>
        <label htmlFor="title">Capsule Title:</label>
        <p className={styles.inputDescription}>
          Titles will be displayed on your profile but contents of capsule will be locked
        </p>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <label htmlFor="message">Capsule Message:</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={handleMessageChange}
          required
        />
        <label htmlFor="photos">Upload Photos:</label>
        <input
          type="file"
          id="photos"
          name="photos"
          accept="image/*"
          multiple
          onChange={handlePhotosChange}
        />
        <label htmlFor="openDate">Open Date:</label>
        <p className={styles.inputDescription}>
          This is when your capsule will be visible again. Choose wisely as this cannot be changed.
        </p>
        <input
          type="date"
          id="openDate"
          name="openDate"
          value={openDate}
          onChange={handleDateChange}
          required
        />
        <button type="submit" className={styles.createButton}>
          Create Capsule
        </button>
      </form>
    </div>
  );
}
