import React from 'react';
import RootLayout from '../app/layout';
import styles from '../styles/profile.module.css';
import CapsuleCreation from '../components/CapsuleCreation';
import CapsuleTags from '../components/CapsuleTags';

export default function Profile() {
  const userName = "Ashley"; // Replace with the user's name
  const [showCapsuleTags, setShowCapsuleTags] = React.useState(true);

  return (
    <RootLayout>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <h2>Welcome back, {userName}!</h2>
          <a href="/edit-profile" className={styles.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={styles.contentContainer}>
          <div
            className={`${styles.content} ${
              showCapsuleTags ? '' : styles.hidden
            }`}
          >
            <CapsuleTags />
          </div>
          <div
            className={`${styles.content} ${
              showCapsuleTags ? styles.hidden : ''
            }`}
          >
            <CapsuleCreation />
          </div>
        </div>
        <button
          onClick={() => setShowCapsuleTags(!showCapsuleTags)}
          className={styles.toggleButton}
        >
          {showCapsuleTags ? 'Create Capsule' : 'Back to Capsules'}
        </button>
      </div>
    </RootLayout>
  );
}
