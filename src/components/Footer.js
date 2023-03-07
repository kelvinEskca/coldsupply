import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-box">
                <Link to='/info'>Info</Link>
                <Link to='/privacy'>Profile Policy</Link>
                <Link to='/terms'>Terms and Conditions</Link>
            </div>
        </footer>
    );
}
 
export default Footer;