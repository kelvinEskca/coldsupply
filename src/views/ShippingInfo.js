import React from "react";
import Circle from "../components/Circle";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ShippingInfo = ({onAdd,cart,onRemove,handleSize,cartLength}) => {
    const itemsPrice = cart.reduce((a,c)=> a + c.quantity * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    return (
        <React.Fragment>
            <Header onAdd={onAdd} cart={cart} onRemove={onRemove} handleSize={handleSize} cartLength={cartLength}/>
            <main className="main">
                <Circle  number={"1"} classNames={"half"}/>
                <section className="section register shippinginfo">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <form action="#" className="form">
                                    <h3 className="heading">Contact Information</h3>
                                    <div className="row">
                                        <label htmlFor="#">Email
                                            <input type="email" placeholder="Email" />
                                        </label>

                                        <label htmlFor="#">Phone Number
                                            <input type="text" placeholder="Phone Number" />
                                        </label>
                                    </div>

                                    <h3 className="heading">Shipping Information</h3>
                                    <div className="row">
                                        <label htmlFor="#">First Name
                                            <input type="text" placeholder="First Name" />
                                        </label>

                                        <label htmlFor="#">Last Name
                                            <input type="text" placeholder="Last Name" />
                                        </label>
                                    </div>

                                   <label htmlFor="#">Country/Region
                                        <input type="text" placeholder="Country/Region" />
                                   </label>

                                   <label htmlFor="#">Address
                                        <input type="text" placeholder="Address" />
                                   </label>

                                   <div className="row">
                                        <label htmlFor="#">State
                                            <input type="text" placeholder="State" />
                                        </label>

                                        <label htmlFor="#">City
                                            <input type="text" placeholder="City" />
                                        </label>
                                    </div>

                                    <label htmlFor="#">
                                        <button>Proceed to Payment</button>
                                    </label>
                                </form>
                            </div>

                            <div className="box wider-box">
                                <div className="head">
                                    <h3 className="heading">Summary</h3>
                                </div>
                                {
                                    cart.map((item,i)=>{
                                    return (
                                           
                                            <div className="cart-items" key={i}>
                                                <div className="items">
                                                    <div className="box">
                                                        <img src={`../assets/${item.image[0].originalname}`} alt={item.title} />
                                                    </div>
                                                    <div className="desc">
                                                        <div className="desc-row">
                                                            <h3 className="heading">{item.title}</h3>
                                                            <h3 className="heading">{item.quantity} * ${item.price.toFixed(2)}</h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                        )
                                    })
                                }
                                {cart.length !== 0 && (
                                <div className="total-wrapper">
                                    <h3 className="heading">Total</h3>
                                    <h3 className="heading total">${totalPrice}</h3>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    );
}
 
export default ShippingInfo;