"use client"

// pages/login.js

import styles from '/styles/login.module.css';
import { useState } from 'react';

export default function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className={styles.container}>
            <img 
                src="/assets/background/Ellipse 2.svg" 
                alt="background" 
                className={styles.backgroundImage} 
            />
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <div className={styles.logo}>
                        <div className={styles.logoSvg}>
                            <svg 
                                onClick={() => window.location.href = '/'} 
                                style={{ cursor: 'pointer' }} 
                                width="252" 
                                height="42" 
                                viewBox="0 0 252 42" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* SVG Paths here */}
                            </svg>
                        </div>
                        <span className={styles.logoText}>Sign In</span>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email address:</label>
                        <input 
                            type="email" 
                            id="email" 
                            required 
                            name="email" 
                            placeholder="Email" 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password:</label>
                        <div className={styles.passwordInput}>
                            <input 
                                type={passwordVisible ? "text" : "password"} 
                                name="password" 
                                id="password" 
                                required 
                                placeholder="Password" 
                            />
                            <div 
                                className={styles.toggleIcon} 
                                onClick={togglePasswordVisibility}
                            >
                                <img 
                                    src={passwordVisible ? "/assets/icons/eye-off.svg" : "/assets/icons/eye-open.svg"} 
                                    alt="eye" 
                                />
                            </div>
                        </div>
                    </div>
                    <a href="/auth/password_reset" className={styles.forgotPassword}>
                        Forgot Password?
                    </a>
                    <button type="submit" className={styles.button}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}