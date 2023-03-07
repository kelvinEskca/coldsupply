import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-box">
                <li><Link to="/admindashboard">Admin</Link></li>
                <li><Link to="/order">Order Management</Link></li>
                <li><Link to="/productslisting">Product Management</Link></li>
            </div>
        </footer>
    );
}
 
export default Footer;