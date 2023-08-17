import React, { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import CapsuleTag from './CapsuleTag';
import styles from '../styles/capsule-tags.module.css';

export default function CapsuleTags(props) {
    const [capsules, setCapsules] = useState([]);

    useEffect(() => {
        const userId = props.user[0].id;
        const fetchCapsules = async () => {
            try {
                const { data: capsules, error } = await supabase
                    .from('capsules')
                    .select('*')
                    .eq('user_id', userId);

                if (error) {
                    console.error('Error fetching capsules:', error.message);
                    return;
                }

                // Sort capsules: ready ones at the top, then by expiration date
                const sortedCapsules = capsules.sort((a, b) => {
                    if (a.ready && !b.ready) return -1;
                    if (!a.ready && b.ready) return 1;
                    return new Date(a.expiration_date) - new Date(b.expiration_date);
                });

                setCapsules(sortedCapsules);
            } catch (error) {
                console.error('Error fetching capsules:', error.message);
            }
        };

        fetchCapsules();
    }, [props.user[0].id]);

    return (
        <div className={styles.capsuleTagsContainer}>
            <ul className={styles.capsuleTagsList}>
                {capsules.map((capsule) => (
                    <CapsuleTag key={capsule.id} capsule={capsule} />
                ))}
            </ul>
        </div>
    );
}
