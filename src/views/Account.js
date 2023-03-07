import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
const Account = ({onAdd,cart,onRemove,handleSize,cartLength}) => {
    axios.defaults.withCredentials = true;
    const auth = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const useraddress = JSON.parse(localStorage.getItem('address'));
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
            <Header onAdd={onAdd} cart={cart} onRemove={onRemove} handleSize={handleSize} cartLength={cartLength}/>
            <main className="main">
                <section className="section account">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">My Account</h3>
                                <Link to="/login" onClick={logout}>Log Out</Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section order-history">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Order History</h3>
                                <p className="paragraph">You haven't placed any orders yet.</p>
                            </div>

                            <div className="box">
                                <h3 className="heading">Account Details</h3>
                                <div className="details-wrapper">
                                    <p className="paragraph">{user.fname}</p>
                                    <p className="paragraph">{user.fname}</p>
                                    {useraddress ? (<p className="paragraph">{useraddress.country}</p>) : (<p className="paragraph">{user.country}</p>)}
                                    

                                    <span className="details-row">
                                        <Link to="/addresses">View Addresses(1)</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    );
}
 
export default Account;