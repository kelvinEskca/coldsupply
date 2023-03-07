import React from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
const Header = () => {
    axios.defaults.withCredentials = true;
    const auth = localStorage.getItem('token');
    const navigate = useNavigate();
    const logout = () => {
        if(auth){
            localStorage.clear();
            navigate('/login');
        }
        else{
            alert('User not logged in!!');
        }
    } 
    return (
        <React.Fragment>
            
            <header className="header">
                <nav className="mobile">
                    <img src="../assets/menu.svg" alt="menu" />
                </nav>
                <nav className="desktop">
                    <Link to='/store'><img src="../assets/logo.png" alt="logo" className="logo" /></Link>
                    <ul className="list">
                        <li><Link to="/admindashboard">Admin</Link></li>
                        <li><Link to="/order">Order Management</Link></li>
                        <li><Link to="/productslisting">Product Listing</Link></li>
                        <li><Link to="/login" onClick={logout}>Logout</Link></li>
                    </ul>
                </nav>
            </header>
           
        </React.Fragment>
    );
}
 
export default Header;