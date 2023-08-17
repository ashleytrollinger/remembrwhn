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
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data) {
          setUser(data);
          console.log(data);
          console.log("the user id is: " + data.user.email);
          const userEmail = data.user.email;
          // Fetch additional user data from the 'users' table
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', userEmail)

          console.log("userdata", userData[0]);

          if (userError) {
            console.error('Error fetching user data:', userError.message);
            return;
          }

          // Merge the user data with the existing user object
          setUserData(userData);
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


  if (!user || !userData) {
    // Handle case when user data is still loading or user is not logged in
    return <div>Loading...</div>;
  }

  return (
    <RootLayout>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <h2 className={styles.welcomeHeading}>
            Welcome back, {userData[0].username || userData[0].email}!
          </h2>
          <a href="/edit-profile" className={styles.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={styles.userDetailsContainer}>
          <div className={styles.userDetails}>
            <div>{userData[0].email}</div>
            <div>{userData[0].phone_number}</div>
          </div>
        </div>

        <div className={styles.toggleButtonGroup}>
          <button
            onClick={() => setShowCapsuleTags(true)}
            className={`${styles.capsulesButton} ${showCapsuleTags ? styles.active : ''}`}
          >
            Your Capsules
          </button>
          <button
            onClick={() => setShowCapsuleTags(false)}
            className={`${styles.addButton} ${!showCapsuleTags ? styles.active : ''}`}
          >
            +
          </button>
        </div>

        <div className={styles.contentContainer}>
          <div
            className={`${styles.content} ${showCapsuleTags ? '' : styles.hidden}`}
          >
            {showCapsuleTags && <CapsuleTags />}
          </div>
          <div
            className={`${styles.content} ${showCapsuleTags ? styles.hidden : ''}`}
          >
            {!showCapsuleTags && <CapsuleCreation user={userData} />}
          </div>
        </div>
      </div>
    </RootLayout>
  );
}

