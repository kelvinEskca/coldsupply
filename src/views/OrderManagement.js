import React,{useState,useEffect} from "react";
import {Link,useNavigate} from "react-router-dom";
import AdminFooter from "../components/AdminFooter";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";

const OrderListing = () => {
    axios.defaults.withCredentials = true;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [orders,setorders] = useState([]);
    const baseUrl = process.env.REACT_APP_API_URL;

    const handleDelete = async (i) =>{
        const id = i._id;
        try{
            const res = await axios.post(`${baseUrl}/api/order/delete/${id}`,{
                id:id
            },{ headers:{token:token} });
            if(res.status === 200){
                alert(res.data.message);
                navigate('/order');
            }
            else{
                alert(res.data.message);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        const getorders = async ()=>{
            try{
                const res = await axios.get(`${baseUrl}/api/order`,{ headers:{token:token} });
                setorders(res.data.orders);
            }
            catch(err){
                console.log(err);
            }
        }
        getorders();
    },[token,baseUrl]);
    return (
        <React.Fragment>
            <AdminHeader/>
            <main className="main">
                <section className="section management">
                    <div className="wrapper">
                        <div className="head-row">
                            <p className="paragraph">Orders</p>
                        </div>
                        <div className="boxes">
                            <div className="table-header">
                                <div className="table"><h3 className="heading">ID</h3></div>
                                <div className="table"><h3 className="heading">UserId</h3></div>
                                <div className="table"><h3 className="heading">Address</h3></div>
                                <div className="table"><h3 className="heading">Status</h3></div>
                                <div className="table action-table"><h3 className="heading">Action</h3></div>
                            </div>

                            {orders.length > 0 ? (
                                orders.map((item,i)=>{
                                    return (
                                        <div className="table-body" key={i}>
                                            <div className="table"><p className="paragraph">{item._id}</p></div>
                                            <div className="table"><p className="paragraph">{item.userId}</p></div>
                                            <div className="table"><p className="paragraph">{item.address}</p></div>
                                            <div className="table"><p className="paragraph">{item.status}</p></div>
                                            <div className="table action"><Link to={`/order/${item.userId}`}><button>View</button></Link><Link to="/order"><button onClick={()=>handleDelete(item)}>Delete</button></Link></div>
                                        </div>
                                    );
                                })
                            ) : ("")}
                            
                            
                        </div>
                    </div>
                </section>
            </main>
            <AdminFooter />
        </React.Fragment>
    );
}
 
export default OrderListing;