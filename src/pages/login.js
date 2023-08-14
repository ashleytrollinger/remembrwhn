import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import supabase from '../../utils/supabase';
import RootLayout from '../app/layout';
import styles from '../styles/login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      console.log('Login response:', { user, error }); // Debugging line

      if (error) {
        console.error('Error logging in:', error.message);
        return;
      }

      console.log('Login successful:', user);

      // Store the access token in local storage
      if (user?.session?.access_token) {
        localStorage.setItem('access_token', user.session.access_token);
      }


      // Redirect to a new page or perform other actions after successful login
      router.push('/profile'); // Example: Redirect to the profile page
    } catch (error) {
      console.error('Error:', error.message, error);
    }
  };

  return (
    <RootLayout>
      <div>
        <main>
          <div className={styles['text-center']}>
            <form className={styles['login-form']} onSubmit={handleLogin}>
              <h2>Login</h2>
              <div className={styles['input-group']}>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className={styles['input-group']}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.button}>Login</button>
            </form>
            <div>
              <p>Don't have an account? <Link href="/signup" className={styles['login-link']}>Sign Up</Link></p>
            </div>
          </div>
        </main>
      </div>
    </RootLayout>
  );
}
