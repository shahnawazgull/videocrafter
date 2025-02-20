import React from 'react';
import styles from '/styles/login.module.css'; // Import the CSS module
import Link from 'next/link';

const Page = () => {
    return (
        <div className={styles.container}>
            <img src="https://vlsmlsaker.s3.amazonaws.com/assets/background/Ellipse%202.svg" alt="" className={styles.backgroundImage}/>
            <div className={styles.formContainer}>
                <form action="." method="post" className={styles.form}>
                    <div className={styles.logo}>
                        <div>
                            <img src="/images/logo.svg" alt="Logo" />
                        </div>
                        <span className={styles.span}>Sign In</span>
                    </div>
                    <div className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.label}>Email address:</label>
                            <input className={styles.input}
                                type="email"
                                id="email"
                                required
                                name="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className={`${styles.formGroup} ${styles.formGroupPassword}`}>
                            <label htmlFor="password" className={styles.label}>Password:</label>
                            <input className={styles.input}
                                type="password"
                                id="password"
                                required
                                name="password"
                                placeholder="Password"
                            />
                            <div className={styles.toggleIcon}>
                                <img
                                    src="https://vlsmlsaker.s3.amazonaws.com/assets/icons/eye-open.svg"
                                    alt="eye-off"
                                    className="eye"
                                    id="eye"
                                />
                            </div>
                        </div>
                        <Link href="/auth/password_reset" className={styles.forgotPassword}>
                            Forgot Password?
                        </Link>
                        <button type="submit" className={styles.button}>
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;