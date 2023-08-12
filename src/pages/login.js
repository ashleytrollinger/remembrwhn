import Link from 'next/link';
import RootLayout from '../app/layout';
import styles from '../styles/login.module.css';

export default function Login() {
    return (
        <RootLayout>
            <div>
                <main>
                    <div className={styles['text-center']}>
                        <form className={styles['login-form']}>
                            <h2>Login</h2>
                            <div className={styles['input-group']}>
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" required />
                            </div>
                            <div className={styles['input-group']}>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" required />
                            </div>
                            <button type="submit" className={styles.button}>Login</button>
                        </form>
                        <div>
                            <p>Don't have an account? <Link href="/signup" className={styles['login-link']}>Sign Up</Link></p>
                        </div>
                    </div>
                </main>

                {/* Footer or other sections */}
            </div>
        </RootLayout>
    );
}
