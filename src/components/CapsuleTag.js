import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/capsule-tag.module.css';

export default function CapsuleTag({ capsule }) {
    const router = useRouter();
    const currentDate = new Date();
    const expirationDate = new Date(capsule.expiration_date);
    const isExpired = currentDate >= expirationDate;
    const isReadyToView = currentDate.getDate() === expirationDate.getDate();

    const handleTagClick = () => {
        if (isExpired) {
            // Redirect to the capsule page
            router.push(`/capsules/${capsule.id}`);
        }
    };

    return (
        <li
            className={`${styles.capsuleTag} ${isExpired ? styles.expired : ''}`}
            onClick={handleTagClick}
        >
            <div className={styles.tagContent}>
                <span className={styles.capsuleTitle}>{capsule.title}</span>
                <span className={styles.capsuleExpiration}>
                    {isExpired ? (
                        <>
                            <a href="#" className={styles.viewNowLink}>View Now</a>
                        </>
                    ) : isReadyToView ? (
                        <span className={styles.readyToView}>Ready to view</span>
                    ) : (
                        <>
                            <span className={styles.expirationDate}>
                                {expirationDate.toLocaleDateString()}
                            </span>
                        </>
                    )}
                </span>
            </div>
        </li>
    );
}
