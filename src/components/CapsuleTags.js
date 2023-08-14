import React from 'react';
import styles from '../styles/capsule-tags.module.css';
import CapsuleTag from './CapsuleTag'; // Make sure the import path is correct

export default function CapsuleTags({ capsules }) {
    return (
        <div className={styles.capsuleTagsContainer}>
            <h3>Your Capsules</h3>
            {/* <ul className={styles.capsuleTagsList}>
                {capsules.map((capsule) => (
                    <CapsuleTag key={capsule.id} capsule={capsule} />
                ))}
            </ul> */}
        </div>
    );
}
