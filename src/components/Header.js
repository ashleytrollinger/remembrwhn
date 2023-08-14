import React from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles['header-content']}>
                <Link href="/" className={styles['header-title']}>
                    Remembr<span>Whn</span>
                </Link>
            </div>
        </header>
    );
}

