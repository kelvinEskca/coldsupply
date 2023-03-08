import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import AdminFooter from "../components/AdminFooter";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";

const OrderDetail = () => {
    axios.defaults.withCredentials = true;
    const [list,setList] = useState([]);
    const [listDetail,setListDetail] = useState('');
    const baseUrl = process.env.REACT_APP_API_URL;
    const { id } = useParams();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const getorders = async ()=>{
            try{
                const res = await axios.get(`${baseUrl}/api/order/${id}`,{ headers:{token:token} });
                setList(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getorders();
    },[id,baseUrl]);

    const showDetail = (i) =>{
        setListDetail(i);
    }

    const shipping = 100;
    return (
        <React.Fragment>
            <AdminHeader/>
            <main className="main">
                <section className="section orderDetail">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">Customer History</h3>
                                <div className="row">
                                    <h3 className="heading">Order Id</h3>
                                    <h3 className="heading">Status</h3>
                                </div>

                                {list.map((item,i)=>{
                                    return(
                                        <div className={`column ${listDetail ? "high" : ""}`} key={i} onClick={()=>showDetail(item)}>
                                            <p className="paragraph">{item._id}</p>
                                            <p className="paragraph">{item.status}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="column-box">
                                <div className="box">
                                    <h3 className="heading">Order Details</h3>
                                    <form action="#">
                                        <label htmlFor="#">Order ID
                                            <input type="text" value={listDetail._id} readOnly />
                                        </label>

                                        <label htmlFor="#">Customer
                                            <input type="text" value={listDetail.userId} readOnly />
                                        </label>

                                        {/* <label htmlFor="#">Note
                                            <textarea name="name" id="name" cols="30" rows="10" value={'Hala'} readOnly></textarea>
                                        </label> */}

                                        <label htmlFor="#">Order Date
                                            <input type="text" value={listDetail.createdAt} readOnly />
                                        </label>
                                    </form>
                                </div>

                                <div className="box">
                                    <h3 className="heading">Cart Details</h3>
                                    <div className="table-detail">
                                        <div className="table-head">
                                            <div className="table"><h3 className="heading">Product</h3></div>
                                            <div className="table"><h3 className="heading">Quantity</h3></div>
                                            <div className="table"><h3 className="heading">Unit Price</h3></div>
                                        </div>

                                        
                                        {listDetail ? (
                                            listDetail.products.map((item,i)=>{
                                                return(
                                                    <div className="table-body" key={i}>
                                                        <div className="table"><p className="paragraph">{item.productid}</p></div>
                                                        <div className="table"><p className="paragraph">{item.quantity}</p></div>
                                                        <div className="table"><p className="paragraph">{item.price}</p></div>
                                                    </div>
                                                );
                                            })
                                        ) : ("")}
                                       
                                    </div>

                                    <div className="total-box">
                                        <span><h3 className="heading">Sub Total:</h3><p className="paragraph"></p></span>
                                        <span><h3 className="heading">Shipping:</h3><p className="paragraph">NGN {shipping}</p></span>
                                        <span><h3 className="heading">Total:</h3><p className="paragraph">NGN 200,00</p></span>
                                    </div>
                                </div>

                                {/* <div className="box">
                                    <h3 className="heading">History</h3>
                                    <form action="#">
                                        <label htmlFor="#">Order Completed on
                                            <input type="text" value={'1200'} readOnly />
                                        </label>

                                        <label htmlFor="#">Shipping Detail
                                            <textarea name="name" id="name" cols="30" rows="10" value={'Hala'} readOnly></textarea>
                                        </label>

                                        <label htmlFor="#">Billing Detail
                                            <input type="text" value={'12/12/2022'} readOnly />
                                        </label>
                                    </form>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <AdminFooter />
        </React.Fragment>
    );
}
 
export default OrderDetail;