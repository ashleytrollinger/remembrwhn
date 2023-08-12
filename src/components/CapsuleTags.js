import React from 'react';
import styles from '../styles/capsule-tags.module.css';

export default function CapsuleTagsComponent({ capsules }) {
    return (
        <div className={styles.capsuleTagsContainer}>
            <h3>Your Capsules</h3>
            <ul className={styles.capsuleTagsList}>
                {/* Comment out the map functionality for now */}
                {/* {capsules.map((capsule) => (
          <li key={capsule.id} className={styles.capsuleTag}>
            {capsule.tag}
          </li>
        ))} */}
            </ul>
        </div>
    );
}

