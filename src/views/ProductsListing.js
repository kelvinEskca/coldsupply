import React,{useState,useEffect} from "react";
import {Link,useNavigate} from "react-router-dom";
import AdminFooter from "../components/AdminFooter";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";

const ProductsListing = () => {
    const [products,setproducts] = useState([]);
    const token = localStorage.getItem('token');
    const baseUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const handleDelete = async (i) =>{
        const id = i._id;
        try{
            const res = await axios.post(`${baseUrl}/api/product/delete/${id}`,{
                id:id
            },{ headers:{token:token} });
            if(res.status === 200){
                alert(res.data.message);
                navigate('/productslisting');
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
        const getProducts = async ()=>{
            try{
                const res = await axios.get(`${baseUrl}/api/product`);
                setproducts(res.data.products);
            }
            catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[baseUrl]);

    return (
        <React.Fragment>
            <AdminHeader/>
            <main className="main">
                <section className="section management">
                    <div className="wrapper">
                        <div className="head-row">
                            <p className="paragraph">Products</p>
                            <Link to='/products'><button>Add Products</button></Link>
                        </div>
                        <div className="boxes">
                            <div className="table-header">
                                <div className="table"><h3 className="heading">ID</h3></div>
                                <div className="table"><h3 className="heading">Product</h3></div>
                                <div className="table"><h3 className="heading">Price</h3></div>
                                <div className="table"><h3 className="heading">Quantity</h3></div>
                                <div className="table action-table"><h3 className="heading">Action</h3></div>
                            </div>

                            {products.map((item,i)=>{
                                return (
                                    <div className="table-body" key={i}>
                                        <div className="table"><p className="paragraph">{item._id}</p></div>
                                        <div className="table row-img"><div className="image-box"><img src={`../assets/${item.image[0].originalname}`} alt={item.title} /></div><p className="paragraph">{`${item.title}`} </p></div>
                                        <div className="table"><p className="paragraph">NGN {item.price}</p></div>
                                        <div className="table"><p className="paragraph">X{item.qty}</p></div>
                                        <div className="table action"><Link to={`/products/${item._id}`}><button>View</button></Link><Link to="/productslisting"><button onClick={()=>handleDelete(item)}>Delete</button></Link></div>
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
 
export default ProductsListing;