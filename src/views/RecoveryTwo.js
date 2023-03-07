import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
const RecoveryTwo = ({onAdd,cart,onRemove,handleSize,cartLength}) => {
    return (
        <React.Fragment>
            <Header onAdd={onAdd} cart={cart} onRemove={onRemove} handleSize={handleSize} cartLength={cartLength}/>
            <main className="main">
                <section className="section register">
                    <div className="wrapper">
                        <h3 className="heading">Account Recovery</h3>
                        <p className="paragraph">Set your new password</p>
                        <div className="boxes">
                            <div className="box">
                                <form action="#" className="form">
                                    <label htmlFor="#">Password
                                        <input type="password" placeholder="Password"/>
                                    </label>

                                    <label htmlFor="#">
                                        <button>Set Password</button>
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    );
}
 
export default RecoveryTwo;