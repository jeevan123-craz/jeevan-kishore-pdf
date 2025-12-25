import { FaFilePdf, FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="logo">
                            <div className="logo-icon">
                                <FaFilePdf />
                            </div>
                            <span>Jeevan Kishore</span>
                        </div>
                        <p>
                            The world's favorite PDF tools. All the tools you need to work with PDFs,
                            free and easy to use.
                        </p>
                    </div>

                    <div className="footer-column">
                        <h4>PDF Tools</h4>
                        <ul>
                            <li><a href="#merge">Merge PDF</a></li>
                            <li><a href="#split">Split PDF</a></li>
                            <li><a href="#compress">Compress PDF</a></li>
                            <li><a href="#convert">Convert PDF</a></li>
                            <li><a href="#rotate">Rotate PDF</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#pricing">Pricing</a></li>
                            <li><a href="#blog">Blog</a></li>
                            <li><a href="#press">Press Kit</a></li>
                            <li><a href="#careers">Careers</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Product</h4>
                        <ul>
                            <li><a href="#desktop">Desktop App</a></li>
                            <li><a href="#mobile">Mobile App</a></li>
                            <li><a href="#api">API</a></li>
                            <li><a href="#features">Features</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#help">Help Center</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#terms">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2024 Jeevan Kishore. All rights reserved.</p>
                    <div className="social-links">
                        <a href="#twitter" className="social-link">
                            <FaTwitter />
                        </a>
                        <a href="#facebook" className="social-link">
                            <FaFacebook />
                        </a>
                        <a href="#linkedin" className="social-link">
                            <FaLinkedin />
                        </a>
                        <a href="#instagram" className="social-link">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
