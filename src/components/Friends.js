import React, { useState, useEffect } from 'react';
import supabase from '../../utils/supabase';
import styles from '../styles/friends.module.css';

export default function Friends() {
    const [searchTerm, setSearchTerm] = useState('');
    const [friends, setFriends] = useState([]); // Store the list of friends here
    const [searchResults, setSearchResults] = useState([]); // Store search results here

    useEffect(() => {
        // Fetch the list of friends from your database
        // Replace 'friends' with the actual table name if different
        async function fetchFriends() {
            const { data, error } = await supabase
                .from('friends')
                .select('user_id_2, username_2')
                .eq('user_id_1', supabase.auth.user().id);

            if (error) {
                console.error('Error fetching friends:', error.message);
            } else {
                setFriends(data);
            }
        }

        fetchFriends();
    }, []);

    // Function to handle the search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Function to add a friend
    const addFriend = async (friend) => {
        // Implement your logic to add a friend to the database
        // For example, you can insert a new row into the 'friends' table
        // Make sure to use the IDs of the users for the 'user_id_1' and 'user_id_2' fields
        const { error } = await supabase.from('friends').upsert([
            {
                user_id_1: supabase.auth.user().id,
                username_1: supabase.auth.user().user_metadata.username,
                user_id_2: friend.id, // Replace with the actual user ID of the friend
                username_2: friend.username, // Replace with the actual username of the friend
            },
        ]);

        if (error) {
            console.error('Error adding friend:', error.message);
        } else {
            // Update the friends list with the newly added friend
            setFriends([...friends, friend]);
        }
    };

    // Function to search for users
    const searchUsers = async () => {
        // Implement your logic to search for users in the database
        // For example, you can query the 'users' table for matching usernames
        const { data, error } = await supabase
            .from('users')
            .select('id, username')
            .ilike('username', `%${searchTerm}%`);

        if (error) {
            console.error('Error searching users:', error.message);
        } else {
            setSearchResults(data);
        }
    };

    return (
        <div className={styles.friendsContainer}>
            <div className={styles.friendsListContainer}>
                <h2>Your Friends</h2>
                <ul className={styles.friendsList}>
                    {friends.map((friend) => (
                        <li key={friend.user_id_2} className={styles.friendItem}>
                            {friend.username_2}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.searchContainer}>
                <h2>Search for Friends</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Search by username"
                        value={searchTerm}
                        onChange={handleSearch}
                        className={styles.searchContainer}
                    />
                    <button className={styles.searchButton} onClick={searchUsers}>
                        Search
                    </button>
                </div>
                <ul className={styles.searchResultsList}>
                    {searchResults.map((result) => (
                        <li key={result.id} className={styles.searchResultItem}>
                            {result.username}{' '}
                            <button className={styles.addButton} onClick={() => addFriend(result)}>
                               +
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
