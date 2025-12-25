import { FaFilePdf, FaBars, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
    onLogoClick?: () => void;
}

export const Header = ({ onLogoClick }: HeaderProps) => {
    const { user, signInWithGoogle, logout } = useAuth();

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
                    <div className="logo-icon">
                        <FaFilePdf />
                    </div>
                    <span>Jeevan Kishore</span>
                </div>

                <nav className="nav-menu">
                    <a href="#tools" className="nav-link">All PDF Tools</a>
                    <a href="#features" className="nav-link">Features</a>
                </nav>

                <div className="header-actions">
                    {user ? (
                        <div className="user-profile">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName || 'User'} className="user-avatar" />
                            ) : (
                                <FaUserCircle size={32} />
                            )}
                            <span className="user-name">{user.displayName}</span>
                            <button className="btn btn-outline" onClick={logout} title="Logout">
                                <FaSignOutAlt />
                            </button>
                        </div>
                    ) : (
                        <>
                            <button className="btn btn-outline" onClick={signInWithGoogle}>Log In</button>
                            <button className="btn btn-primary" onClick={signInWithGoogle}>Sign Up</button>
                        </>
                    )}
                </div>

                <button className="mobile-menu-toggle">
                    <FaBars size={24} />
                </button>
            </div>
        </header>
    );
};
