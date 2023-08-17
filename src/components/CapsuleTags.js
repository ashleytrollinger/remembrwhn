import React, { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import CapsuleTag from './CapsuleTag'; // Make sure the import path is correct
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

                setCapsules(capsules);
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

