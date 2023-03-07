import React from "react";
import Circle from "../components/Circle";
import Footer from "../components/Footer";
import Header from "../components/Header";
const Payment = ({onAdd,cart,onRemove,handleSize,cartLength}) => {
    return (
        <React.Fragment>
            <Header onAdd={onAdd} cart={cart} onRemove={onRemove} handleSize={handleSize} cartLength={cartLength}/>
            <main className="main">
                <Circle  number={"2"} classNames={"full"}/>
                <section className="section register">
                    <div className="wrapper">
                        <h3 className="heading">Payment</h3>
                        <div className="boxes">
                            <div className="box">
                                <form action="#" className="form">  
                                    <label htmlFor="#">Card Number
                                        <input type="text" placeholder="Card Number" />
                                    </label>

                                    <div className="row">
                                        <label htmlFor="#">CVV
                                            <input type="text" placeholder="CVV" />
                                        </label>

                                        <label htmlFor="#">Expiry Date
                                            <input type="date" placeholder="Expiry Date" />
                                        </label>
                                    </div>

                                    <label htmlFor="#">
                                        <button>Purchase</button>
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
 
export default Payment;