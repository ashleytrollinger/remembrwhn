import React from 'react';


export default function CapsuleTag({ capsule }) {
    return (
        <li className={styles.capsuleTag}>
            <span className={styles.capsuleTitle}>{capsule.title}</span>
            <span className={styles.capsuleExpiration}>
                Expires on: {new Date(capsule.expiration_date).toLocaleDateString()}
            </span>
        </li>
    );
}
