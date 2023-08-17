import { useState } from 'react';
import Link from 'next/link';
import supabase from '../../utils/supabase';
import RootLayout from '../app/layout';
import styles from '../styles/signup.module.css';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Create authentication credentials
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.error('Error signing up:', error.message);
        return;
      }

      console.log('Signup successful:', user);

      // Store authentication data in the user's profile
      const authData = {
        auth_id: user.id, // Store the auth_id as a string
      };

      // Insert user data into the 'users' table
      const { data: userData, error: dataError } = await supabase
        .from('users')
        .upsert(
          [
            {
              email: email,
              password: password,
              name: name,
              username: username,
              phone_number: phone,
              auth_data: authData, // Store the auth_id JSON object
            },
          ],
          { onConflict: ['email'] }
        );

      if (dataError) {
        console.error('Error storing user data:', dataError.message);
        return;
      }

      console.log('User data stored:', userData);

      // Redirect to a new page or perform other actions after successful signup
      router.push('/profile'); // Example: Redirect to the profile page
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <RootLayout>
      <div>
        <main>
          <div className={styles.textCenter}>
            <form className={styles['signup-form']} onSubmit={handleSignup}>
              <h2>Sign Up</h2>
              <div className={styles['input-group']}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className={styles['input-group']}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className={styles['input-group']}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className={styles['input-group']}>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className={styles['input-group']}>
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <button type="submit" className={styles['signup-button']}>Sign Up</button>
            </form>
            <div className={styles['login-link']}>
              <p>Already have an account? <Link href="/login">Log In</Link></p>
            </div>
          </div>
        </main>
      </div>
    </RootLayout>
  );
}
