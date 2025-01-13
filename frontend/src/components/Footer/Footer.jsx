import React from 'react';
import styles from './Footer.module.css'; // Import the corresponding CSS module
import githubLogo from "../../assets/github.png";
import instaImage from "../../assets/instagram.png";
import gmailImage from "../../assets/gmail.png";

function Footer({className}) {
    return (
        <div className={`${styles.footer} ${className}`}>
            <div className={styles['footer-container']}>
                <div className={styles['website-summary']}>
                    <h5>&copy; 2025 ShopIt. All rights reserved.</h5>
                    <p>Your one-stop shop for everything you love! Discover great deals, shop smarter, and experience effortless shopping with fast delivery. We bring quality, value, and convenience right to your doorstep. Let’s make shopping fun and easy!</p>
                </div>
                <div className={styles['contact-grid']}>
                    <div className={styles['contact-item']}>
                        <a href="https://www.instagram.com/khanabdulbaseerkhanyousafzai/" target="_blank" rel="noopener noreferrer">
                            <img src={instaImage} alt="instagram" />
                            <p>Instagram</p>
                        </a>
                    </div>
                    <div className={styles['contact-item']}>
                        <a href="https://github.com/abdulbaseer-1" target="_blank" rel="noopener noreferrer">
                            <img src={githubLogo} alt="github" />
                            <p>GitHub</p>
                        </a>
                    </div>
                    <div className={styles['contact-item']}>
                        <a href="mailto:abdulbaseer.s130@gmail.com" target="_blank" rel="noopener noreferrer">
                            <img src={gmailImage} alt="email" />
                            <p>Email</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
