import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState('');
    const [hoveredItem, setHoveredItem] = useState('');

    useEffect(() => {
        if (location.pathname === '/') {
            setActiveItem('');
        } else if (location.pathname.includes('/research')) {
            setActiveItem('Research');
        } else if (location.pathname.includes('/company')) {
            setActiveItem('Company');
        } else {
            setActiveItem('');
        }
    }, [location]);

    const handleMouseEnter = (item) => {
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        setHoveredItem('');
    };

    const getClassName = (item) => {
        if (item === activeItem || item === hoveredItem) {
            return 'active';
        } else if (hoveredItem || activeItem) {
            return 'inactive';
        } else {
            return 'ready';
        }
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li 
                    className={`nav-item ${getClassName('Home')}`} 
                    onMouseEnter={() => handleMouseEnter('Home')} 
                    onMouseLeave={handleMouseLeave}
                >
                    <Link to="/">Home</Link>
                </li>
                <li 
                    className={`nav-item ${getClassName('Research')}`} 
                    onMouseEnter={() => handleMouseEnter('Research')} 
                    onMouseLeave={handleMouseLeave}
                >
                    Research
                    {hoveredItem === 'Research' && (
                        <div className="dropdown-menu">
                            <div className="dropdown-column">
                                <h3>Our Research</h3>
                                <Link to="/overview">Overview</Link>
                                <Link to="/publications">Publications</Link>
                                <Link to="/datasets">Datasets</Link>
                            </div>
                            <div className="dropdown-column">
                                <h3>Latest Advancements</h3>
                                <Link to="/lumen-1">Lumen-1</Link>
                                <Link to="/lumen-2">Lumen-2</Link>
                            </div>
                        </div>
                    )}
                </li>
                <li 
                    className={`nav-item ${getClassName('Company')}`} 
                    onMouseEnter={() => handleMouseEnter('Company')} 
                    onMouseLeave={handleMouseLeave}
                >
                    Company
                    {hoveredItem === 'Company' && (
                        <div className="dropdown-menu">
                            <div className="dropdown-column">
                                <Link to="/about-us">About Us</Link>
                                <Link to="/news">News</Link>
                                <Link to="/security-privacy">Security & Privacy</Link>
                            </div>
                            <div className="dropdown-column">
                                <Link to="/contact">Contact Us</Link>
                            </div>
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;