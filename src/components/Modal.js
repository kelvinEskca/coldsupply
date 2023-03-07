import React from "react";
import { useNavigate } from "react-router-dom";
const Modal = ({cart, modaltoggle,onRemove,onAdd}) => {
    const itemsPrice = cart.reduce((a,c)=> a + c.quantity * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    const subTotal = itemsPrice;
    const navigate = useNavigate();
    const move = () =>{
        navigate('/shipPingInfo');
    }
    return (
        <div className={`modal ${modaltoggle ? "open" : " "}`}>
            <div className="head">
                <h3 className="heading">CART</h3>
            </div>

            {   cart.length === 0 && 
                <div className="cart-items">
                    <div className="items">
                        <div className="desc">
                            
                            <h3 className="heading">Cart Is Empty</h3>
                           
                        </div>
                    </div>
                </div>
            }
            {
                cart.map((item,i)=>{
                   return (
                        <>
                            <div className="cart-items" key={i}>
                                <div className="items">
                                    <div className="box">
                                        <img src={`../assets/${item.image[0].originalname}`} alt={item.title} />
                                    </div>
                                    <div className="desc">
                                        <div className="desc-row">
                                            <h3 className="heading">{item.title}</h3>
                                        </div>
                                        <div className="qty-toggle">
                                            <span className="minus" onClick={()=> onRemove(item)}>-</span>
                                            <span className="qty">{item.quantity}</span>
                                            <span className="add" onClick={()=> onAdd(item)}>+</span>
                                        </div>
                                    </div>
                                    <h3 className="heading">{item.quantity} * ${item.price.toFixed(2)}</h3>
                                    <h3 className="heading delete" onClick={()=> onRemove(item)}>X</h3>
                                </div>
                            </div>
                        </>
                    )
                })
            }
            {cart.length !== 0 && (
                <>
                    <div className="calculation">
                        <div className="row">
                            <h3 className="heading">Total</h3>
                            <p className="paragraph">${totalPrice.toFixed(2)}</p>
                        </div>

                        <div className="row">
                            <h3 className="heading">Subtotal</h3>
                            <p className="paragraph">${subTotal.toFixed(2)}</p>
                        </div>

                        <div className="row">
                            <h3 className="heading">Shipping Price</h3>
                            <p className="paragraph">${shippingPrice.toFixed(2)}</p>
                        </div>

                        <div className="row">
                            <h3 className="heading">Tax Price</h3>
                            <p className="paragraph">${taxPrice.toFixed(2)}</p>
                        </div>
                    </div>

                    <button onClick={()=> move()}>Proceed to Checkout</button>
                </>
            )}
        </div>
    );
}
 
export default Modal;