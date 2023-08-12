import Link from 'next/link';
import RootLayout from '../app/layout';
import styles from '../styles/signup.module.css';

export default function SignUp() {
    return (
        <RootLayout>
            <div>
                <main>
                    <div className={styles.textCenter}>

                        <form className={styles['signup-form']}>
                            <h2>Sign Up</h2>
                            <div className={styles['input-group']}>
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" required />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" required />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="phone">Phone Number:</label>
                                <input type="tel" id="phone" name="phone" required />
                            </div>
                            <button type="submit" className={styles['signup-button']}>Sign Up</button>
                        </form>
                        <div className={styles['login-link']}>
                            <p>Already have an account? <Link href="/login">Log In</Link></p>
                        </div>

                    </div>
                </main>

                {/* Footer or other sections */}
            </div>
        </RootLayout>
    );
}
