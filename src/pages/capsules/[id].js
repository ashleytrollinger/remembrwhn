import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../../../utils/supabase';
import RootLayout from '../../app/layout';
import styles from '../../styles/capsule-page.module.css';

export default function CapsulePage() {
    const router = useRouter();
    const { id } = router.query; // Get the capsule ID from the URL
    const [capsule, setCapsule] = useState(null);

    useEffect(() => {
        if (id) {
            // Fetch the capsule data based on the ID
            const fetchCapsuleData = async () => {
                try {
                    const { data: capsules, error } = await supabase
                        .from('capsules')
                        .select('*')
                        .eq('id', id);

                    if (error) {
                        console.error('Error fetching capsule data:', error.message);
                        return;
                    }

                    if (capsules && capsules.length > 0) {
                        setCapsule(capsules[0]);
                    }
                } catch (error) {
                    console.error('Error fetching capsule data:', error.message);
                }
            };

            fetchCapsuleData();
        }
    }, [id]);

    if (!capsule) {
        return <div>Loading...</div>;
    }

    // Calculate the number of days since the capsule was created
    const creationDate = new Date(capsule.created_at);
    const currentDate = new Date();
    const daysSinceCreation = Math.floor((currentDate - creationDate) / (1000 * 60 * 60 * 24));

    return (
        <RootLayout>
            <div className={styles.capsuleContainer}>
                <div className={styles.capsuleHeader}>
                    <p className={styles.daysAgo}>{daysSinceCreation} days ago</p>
                    <h2 className={styles.capsuleTitle}>{capsule.title}</h2>
                </div>
                <p className={styles.capsuleMessage}>{capsule.message}</p>
                <div className={styles.reburySection}>
                    {/* ... (same as before) */}
                </div>
                {capsule.photos && (
                    <div className={styles.photosContainer}>
                        {capsule.photos.map((photoUrl, index) => (
                            <img key={index} src={photoUrl} alt={`Photo ${index}`} className={styles.capsulePhoto} />
                        ))}
                    </div>
                )}
            </div>
        </RootLayout>
    );
}
