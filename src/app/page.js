import Image from 'next/image';
import Link from 'next/link';
import Capsule from '../images/Capsule.png';
import styles from '../styles/page.module.css';

export default function Home() {
  return (
    
    <div className={styles.container}>
      <main>
        <div className={`${styles['main-content']}`}>
          <div className={`${styles['image-container']}`}>
            <Image
              src={Capsule}
              alt="RemembrWhn Logo"
              className={`${styles.logo}`}
            />
          </div>
          <div className={styles['text-container']}>
            <p className={`${styles['welcome-text']}`}>
             Time Capsules without the dirt. 
            </p>
            <div className={`${styles['button-container']}`}>
              <Link href="/signup" className={`${styles.button} ${styles['getStartedButton']}`}>
                Get Started
              </Link>
              <Link href="/login" className={`${styles.button} ${styles['loginButton']}`}>
                Log In
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
