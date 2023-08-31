import { Router } from 'next/router';
import React from 'react';
import supabase from '../../utils/supabase';
import styles from '../styles/capsule-creation.module.css';

export default function CapsuleCreation(props) {
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
    const uploadedPhotos = Array.from(event.target.files);
    setPhotos(uploadedPhotos);
  };

  const handleDateChange = (event) => {
    setOpenDate(event.target.value);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
    
      // // Upload photos to the shared bucket
      // const photoUrls = await Promise.all(photos.map(async (photo) => {
      //   const { data, error } = await supabase.storage
      //     .from('capsule-images') // Use the shared bucket name
      //     .upload(photo.name, photo);
    
      //   if (error) {
      //     console.error('Error uploading photo:', error.message);
      //     return null;
      //   }
      //   return data.Key;
      // }));
    
      // // Filter out any failed photo uploads
      // const validPhotoUrls = photoUrls.filter((url) => url !== null);
    
      // Construct the capsule data to be inserted
      const capsuleData = {
        user_id: props.user[0].id,
        title,
        message,

        expiration_date: new Date(openDate).toISOString(),
      };
    
      // Insert the capsule data into the Supabase database
      try {
        const { data, error } = await supabase.from('capsules').insert([capsuleData]);
        if (error) {
          console.error('Error inserting capsule data:', error.message);
          return;
        }
        console.log('Capsule data inserted successfully:', data);
    
        // Reset the form
        setTitle('');
        setMessage('');
        setPhotos([]);
        setOpenDate('');
    
        Router.push('/profile');
      } catch (error) {
        console.error('Error inserting capsule data:', error.message);
      }
    };
    

  return (
    <div className={styles.capsuleCreationFormContainer}>
      <h3 className={styles.formHeading}>Create a New Capsule</h3>
      <form className={styles.capsuleCreationForm} onSubmit={handleSubmit}>
        <label htmlFor="title">Capsule Title:</label>
        <p className={styles.inputDescription}>
          Titles will be displayed on your profile, but contents of the capsule will be locked.
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
        {/* <label htmlFor="photos">Upload Photos:</label>
        <input
          type="file"
          id="photos"
          name="photos"
          accept="image/*"
          multiple
          onChange={handlePhotosChange}
        /> */}
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
