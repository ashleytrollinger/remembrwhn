import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../../utils/supabase';
import RootLayout from '../app/layout';
import styles from '../styles/profile.module.scss';
import CapsuleCreation from '../components/CapsuleCreation';
import CapsuleTags from '../components/CapsuleTags';
import Friends from '../components/Friends';

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('capsules'); // Default to "Your Capsules" tab
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data) {
          setUser(data);

          const userEmail = data.user.email;

          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', userEmail)



          if (userError) {
            console.error('Error fetching user data:', userError.message);
            return;
          }

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
    return <div>Loading...</div>;
  }
  console.log("Active tab:", activeTab);
  return (
    <RootLayout>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <h2 className={styles.welcomeHeading}>
            Welcome back, <em>{userData[0].username || userData[0].email}</em> !
          </h2>
        </div>
        <div className={styles.userDetailsContainer}>
          <div className={styles.userDetails}>
            <div>{userData[0].email}</div>
            <div>{userData[0].phone_number}</div>
          </div>
        </div>

        <div className={styles.toggleButtonGroup}>
          <button
            onClick={() => handleTabClick('capsules')}
            className={`${styles.capsulesButton} ${activeTab === 'capsules' ? styles.active : ''}`}
          >
            Your Capsules
          </button>
          <button
            onClick={() => {
              console.log("Clicked + button"); // Add this line
              handleTabClick('addCapsules');
            }}
            className={`${styles.addButton} ${activeTab === 'addCapsules' ? styles.active : ''}`}
          >
            +
          </button>
          {/* <button
            onClick={() => handleTabClick('friends')}
            className={`${styles.friendsButton} ${activeTab === 'friends' ? styles.active : ''}`}
          >
            Friends
          </button> */}
        </div>

        <div className={styles.contentContainer}>
          <div className={`${styles.content} ${activeTab === 'capsules' ? '' : styles.hidden}`}>
            {activeTab === 'capsules' && <CapsuleTags user={userData} />}
          </div>
          <div className={`${styles.content} ${activeTab === 'addCapsules' ? '' : styles.hidden}`}>
            {activeTab === 'addCapsules' && <CapsuleCreation user={userData} />}
          </div>
          {/* <div className={`${styles.content} ${activeTab === 'friends' ? '' : styles.hidden}`}>
            {activeTab === 'friends' && <Friends />}
          </div> */}
        </div>
      </div>
    </RootLayout >
  );
}
