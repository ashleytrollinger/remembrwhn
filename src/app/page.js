import Image from 'next/image';
import Link from 'next/link';
import Logo from '../images/logo.png';
import styles from '../styles/page.module.css';

export default function Home() {
  return (
    <div>
      <main>
        <div className={`${styles['text-center']} ${styles['main-content']}`}>
          <div className={`${styles['image-container']}`}>
            <Image
              src={Logo}
              alt="RemembrWhn Logo"
              className={`${styles.logo}`}
              width={200}
              height={200}
            />
          </div>
          <p className={`${styles['welcome-text']}`}>
            Preserve your cherished memories in time capsules with RemembrWhn. Create capsules with notes, photos, and more, set to unlock at the perfect moment. Collaborate with friends, share the joy, and unlock memories together. Welcome to RemembrWhn – where moments matter.
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
      </main>
    </div>
  );
}
