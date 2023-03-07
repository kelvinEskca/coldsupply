import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
const Recovery = ({onAdd,cart,onRemove,handleSize,cartLength}) => {
    return (
        <React.Fragment>
            <Header onAdd={onAdd} cart={cart} onRemove={onRemove} handleSize={handleSize} cartLength={cartLength}/>
            <main className="main">
                <section className="section register">
                    <div className="wrapper">
                        <h3 className="heading">Account Recovery</h3>
                        <p className="paragraph">Please enter the 6 digit code sent to your email</p>
                        <div className="boxes">
                            <div className="box">
                                <form action="#" className="form">
                                    <label htmlFor="#" className="rowInput">
                                        <input type="text" name="num01" id="num01"/>
                                        <input type="text" name="num02" id="num02"/>
                                        <input type="text" name="num03" id="num03"/>
                                        <input type="text" name="num04" id="num04"/>
                                        <input type="text" name="num05" id="num05"/>
                                        <input type="text" name="num06" id="num06"/>
                                    </label>

                                    <label htmlFor="#">
                                        <button>Continue</button>
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
 
export default Recovery;