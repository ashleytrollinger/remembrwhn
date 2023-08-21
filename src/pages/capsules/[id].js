import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import supabase from '../../../utils/supabase';
import RootLayout from '../../app/layout';
import styles from '../../styles/capsule-page.module.css';

export default function CapsulePage() {
    const router = useRouter();
    const { id } = router.query; // Get the capsule ID from the URL
    const [capsule, setCapsule] = useState(null);
    const [newExpirationDate, setNewExpirationDate] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isReburyFormVisible, setIsReburyFormVisible] = useState(false);

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

    const handleExpirationDateChange = (event) => {
        setNewExpirationDate(event.target.value);
    };

    const handleReburyClick = () => {
        setIsReburyFormVisible(!isReburyFormVisible);
    };

    const handleReburySubmit = async (event) => {
        event.preventDefault();

        if (!newExpirationDate) {
            return;
        }

        setIsUpdating(true);

        try {
            const { error } = await supabase
                .from('capsules')
                .update({ expiration_date: newExpirationDate })
                .eq('id', id);

            if (error) {
                console.error('Error updating expiration date:', error.message);
                return;
            }

            // Successfully updated, navigate back to profile page
            router.push('/profile');
        } catch (error) {
            console.error('Error updating expiration date:', error.message);
        } finally {
            setIsUpdating(false);
        }
    };
    const handleDeleteCapsule = async () => {
        try {
            const { error } = await supabase
                .from('capsules')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting capsule:', error.message);
                return;
            }

            // Successfully deleted, navigate back to profile page
            router.push('/profile');
        } catch (error) {
            console.error('Error deleting capsule:', error.message);
        }
    };
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
                    <button
                        className={styles.reburyButton}
                        onClick={handleReburyClick}
                    >
                        {isReburyFormVisible ? '✕ Close' : 'Rebury Capsule'}
                    </button>
                    <button className={styles.deleteButton} onClick={handleDeleteCapsule}>
                        Delete Capsule
                    </button>
                    {isReburyFormVisible && (
                        <form className={styles.reburyForm} onSubmit={handleReburySubmit}>
                            <label htmlFor="newExpirationDate">This will relock your capsule as soon as you hit "Rebury". </label>
                            <input
                                type="date"
                                id="newExpirationDate"
                                name="newExpirationDate"
                                value={newExpirationDate}
                                onChange={handleExpirationDateChange}
                                required
                            />
                            <button type="submit" className={styles.reburyButton} disabled={isUpdating}>
                                {isUpdating ? 'Updating...' : 'Rebury'}
                            </button>
                        </form>
                    )}
                </div>
                {/* Rest of your content */}
                <div className={styles.profileButtonContainer}>
                    <Link href="/profile">⇐Back to Profile</Link>
                </div>
            </div>
        </RootLayout>
    );
}
