import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../../utils/supabase';
import RootLayout from '../app/layout';
import styles from '../styles/profile.module.css';
import CapsuleCreation from '../components/CapsuleCreation';
import CapsuleTags from '../components/CapsuleTags';

export default function Profile() {
  const router = useRouter();
  const [showCapsuleTags, setShowCapsuleTags] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data) {
          setUser(data);
          console.log(data);
          console.log("the user id is: " + data.user.id);
          // Fetch additional user data from the 'users' table
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (userError) {
            console.error('Error fetching user data:', userError.message);
            return;
          }

          // Merge the user data with the existing user object
          setUser({ ...data, ...userData });
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        router.push('/login');
      }
    };

    fetchUserData();
  }, [router]);


  if (!user) {
    // Handle case when user data is still loading or user is not logged in
    return <div>Loading...</div>;
  }

  return (
    <RootLayout>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <h2>Welcome back, {user.username || user.email}!</h2>
          <a href="/edit-profile" className={styles.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={styles.contentContainer}>
          <div
            className={`${styles.content} ${showCapsuleTags ? '' : styles.hidden}`}
          >
            <CapsuleTags />
          </div>
          <div
            className={`${styles.content} ${showCapsuleTags ? styles.hidden : ''}`}
          >
            <CapsuleCreation />
          </div>
        </div>
        <button
          onClick={() => setShowCapsuleTags(!showCapsuleTags)}
          className={styles.toggleButton}
        >
          {showCapsuleTags ? '+' : 'Back to Capsules'}
        </button>
      </div>
    </RootLayout>
  );
}
