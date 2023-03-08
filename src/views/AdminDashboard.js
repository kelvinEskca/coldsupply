import React,{useState,useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import AdminFooter from "../components/AdminFooter";
import AdminHeader from "../components/AdminHeader";
import baseUrl  from "../config/config";
import axios from "axios";

const AdminDashboard = () => {
    axios.defaults.withCredentials = true;
    const [users,setusers] = useState([]);
    const [totalUsers,settotalUsers] = useState('');
    const [totalOrders,settotalOrders] = useState('');
    const [totalProducts,settotalProducts] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        const getUsers = async ()=>{
            try{
                const res = await axios.get(`${baseUrl.baseUrl}/api/users`,{ headers:{token:token} });
                settotalUsers(res.data.total);
                setusers(res.data.users);
            }
            catch(err){
                console.log(err);
            }
        }
        getUsers();
    },[]);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const getOrders = async ()=>{
            try{
                const res = await axios.get(`${baseUrl.baseUrl}/api/order`,{ headers:{token:token} });
                settotalOrders(res.data.total);
            }
            catch(err){
                console.log(err);
            }
        }
        getOrders();
    },[]);

    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                const res = await axios.get('https://api-production-ecae.up.railway.app/api/product');
                settotalProducts(res.data.total);
            }
            catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[]);

    const handleDelete = async (i) =>{
        const id = i._id;
        try{
            const res = await axios.post(`${baseUrl.baseUrl}/api/users/delete/${id}`,{
                id:id
            },{ headers:{token:token} });
            if(res.status === 200){
                alert(res.data.message);
                navigate('/admindashboard');
            }
            else{
                alert(res.message);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <React.Fragment>
            <AdminHeader/>
            <main className="main">
                <section className="section overview">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">{totalUsers}</h3>
                                <p className="paragraph">Users</p>
                            </div>
                            <div className="box">
                                <h3 className="heading">{totalOrders}</h3>
                                <p className="paragraph">Orders</p>
                            </div>
                            <div className="box">
                                <h3 className="heading">{totalProducts}</h3>
                                <p className="paragraph">Products</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section management">
                    <div className="wrapper">
                        <p className="paragraph">Users Management</p>
                        <div className="boxes">
                            <div className="table-header">
                                <div className="table"><h3 className="heading">ID</h3></div>
                                <div className="table"><h3 className="heading">Name</h3></div>
                                <div className="table"><h3 className="heading">Email Address</h3></div>
                                <div className="table"><h3 className="heading">Country</h3></div>
                                <div className="table action-table"><h3 className="heading">Action</h3></div>
                            </div>

                            {users.map((item,i)=>{
                                return (
                                    <div className="table-body" key={i}>
                                        <div className="table"><p className="paragraph">{item._id}</p></div>
                                        <div className="table"><p className="paragraph">{`${item.fname}  ${item.lname}`} </p></div>
                                        <div className="table"><p className="paragraph">{item.email}</p></div>
                                        <div className="table"><p className="paragraph">{item.country}</p></div>
                                        <div className="table action"><Link to="/admindashboard"><button style={{backgroundColor:"#fff", border:"1px solid #222", color:"#111"}} onClick={()=>handleDelete(item)}>Delete</button></Link></div>
                                    </div>
                                );
                            })}
                            
                        </div>
                    </div>
                </section>
            </main>
            <AdminFooter />
        </React.Fragment>
    );
}
 
export default AdminDashboard;