import React,{useState} from "react";
import { Link } from "react-router-dom";
import Modal from './Modal';
import axios from "axios";
const Header = ({cartLength,cart,onAdd,onRemove}) => {
    axios.defaults.withCredentials = true;
    const [modalOpen, setModalOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const handleToggle = () =>{
        setModalOpen(modalOpen => !modalOpen);
    }
    return (
        <React.Fragment>
            {user ? (
                <header className="header">
                    <nav className="mobile">
                        <img src="../assets/menu.svg" alt="menu" />
                        <Link to='/store'><img src="../assets/logo.png" alt="logo" className="logo" /></Link>
                        <img src="../assets/shopping-cart.svg" alt="cart" className="cart" onClick={handleToggle}/>
                        <h3 className="heading size">{cartLength}</h3>
                    </nav>
                    <nav className="desktop">
                        <Link to='/store'><img src="../assets/logo.png" alt="logo" className="logo" /></Link>
                        <ul className="list">
                            <li><Link to="/info">Info</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms and Condtions</Link></li>
                            <li><Link to="/account"><img src="../assets/radix-icons_avatar.svg" alt="avatar" /></Link></li>
                            <li onClick={handleToggle} className="cart"><img src="../assets/shopping-cart.svg" alt="cart" /><h3 className="heading size">{cartLength}</h3></li>
                        </ul>
                    </nav>
                </header>
            ) : 
            (
                <header className="header">
                    <nav className="mobile">
                        <img src="../assets/menu.svg" alt="menu" />
                        <Link to='/store'><img src="../assets/logo.png" alt="logo" className="logo" /></Link>
                        <img src="../assets/shopping-cart.svg" alt="cart" className="cart" onClick={handleToggle}/>
                        <h3 className="heading size">{cartLength}</h3>
                    </nav>
                    <nav className="desktop">
                        <Link to='/store'><img src="../assets/logo.png" alt="logo" className="logo" /></Link>
                        <ul className="list">
                            <li><Link to="/info">Info</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms and Condtions</Link></li>
                            <li><Link to="/login"><img src="../assets/radix-icons_avatar.svg" alt="avatar" /></Link></li>
                            <li onClick={handleToggle} className="cart"><img src="../assets/shopping-cart.svg" alt="cart" /><h3 className="heading size">{cartLength}</h3></li>
                        </ul>
                    </nav>
                </header>
            )}
            <Modal  modaltoggle={modalOpen} cart={cart} onAdd={onAdd}  onRemove={onRemove}/>
        </React.Fragment>
    );
}
 
export default Header;