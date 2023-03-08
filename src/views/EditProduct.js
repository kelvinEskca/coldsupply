import React,{useState,useEffect} from "react";
import AdminFooter from "../components/AdminFooter";
import AdminHeader from "../components/AdminHeader";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import baseUrl  from "../config/config";

const EditProduct = () => {
    axios.defaults.withCredentials = true;
    const [sizeUpdate,setSize] = useState([]);
    const [priceUpdate,setPrice] = useState('');
    const [detailsUpdate,setDetails] = useState('');
    const [titleUpdate,setTitle] = useState('');
    const [quantityUpdate,setQuantity] = useState('');
    const [stockUpdate,setStock] = useState('');
    const [imageUpdate,setImage] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    sizeUpdate.map((item)=>{
        return formData.append("sizeUpdate", item.size);
    })
    formData.append("priceUpdate", priceUpdate);
    formData.append("titleUpdate", titleUpdate);
    formData.append("detailsUpdate", detailsUpdate);
    formData.append("quantityUpdate", quantityUpdate);
    formData.append("stockUpdate", stockUpdate);
    Array.from(imageUpdate).forEach(item =>{
        formData.append("photos", item);
    })

    const [list,setList] = useState([]);
    const { id } = useParams();
    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                const res = await axios.get(`${baseUrl.baseUrl}/api/product/${id}`);
                setList(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[id])
    
    const {title,price,desc,qty} = list;

    const handleForm = async (e) =>{
        e.preventDefault();
        if(sizeUpdate === '' || detailsUpdate === '' || priceUpdate === '' || titleUpdate === '' || quantityUpdate === '' || stockUpdate === '' || imageUpdate === ''){
            alert('Please Ensure All fields are filled');
        }
        else{
            try{
                const productSubmit = await axios.post(`${baseUrl.baseUrl}/api/product/update/${id}`,
                formData,{headers:{token:token}});
                if(productSubmit.data.status === 200){
                    alert(productSubmit.data.message);
                    navigate('/productslisting');
                }
                else{
                    alert(productSubmit.data.message);
                }
            }
            catch(err){
                console.log(err);
            }
        }
    }

    const cancel = (e) =>{
        e.preventDefault();
        setSize("");
        setPrice("");
        setDetails("");
        setTitle("");
        setQuantity("");
        setStock("");
        setImage("");
    }

    const data = [
        {size:"S",id:1},
        {size:"L",id:2},
        {size:"XL",id:3},
        {size:"XXL",id:4},
    ]
    
    const [options] = useState(data);

    return (
        <React.Fragment>
            <AdminHeader/>
            <main className="main">
                <section className="section register shippinginfo productInfo">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <div className="inner-box">
                                <form action="#" className="form" onSubmit={handleForm} encType="multipart/form-data">
                                    <h3 className="heading">Edit Product</h3>
                                    <div className="row">
                                        <label htmlFor="#">Product Name
                                            <input type="text" placeholder={title} onChange={(e)=>{
                                                setTitle(e.target.value);
                                            }} />
                                        </label>

                                        <label htmlFor="#">Product Price
                                            <input type="text" placeholder={price}  onChange={(e)=>{
                                                setPrice(e.target.value)
                                            }}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">Product Details
                                        <textarea name="details" id="details" cols="30" rows="10" onChange={(e)=>{
                                                setDetails(e.target.value)
                                            }} placeholder={desc}></textarea>
                                    </label>
                    
                                   
                                    <label htmlFor="#">Sizes Available
                                        <Multiselect options={options} displayValue="size" onSelect={(e)=>{
                                            setSize(e)
                                        }}/>
                                    </label>
                                 
                                    
                                    <div className="row">
                                        <label htmlFor="#">Quantity
                                            <input type="text" placeholder={qty} onChange={(e)=>{
                                                setQuantity(e.target.value)
                                            }}/>
                                        </label>

                                        <label htmlFor="#">In Stock
                                        <select name="stock" id="stock" onChange={(e)=>{
                                                setStock(e.target.value)
                                            }}>
                                            <option defaultValue={'true'}>True</option>
                                            <option defaultValue={'false'}>False</option>
                                        </select>
                                        </label>
                                    </div>

                                    <label htmlFor="#" className="uploadLabel">Product Images
                                        <div className="uploadRow">
                                            {Array.from(imageUpdate).map((item,i)=>
                                                (
                                                    <div className="uploadBtn" key={i}>
                                                        <div className="circle">+</div>
                                                        Choose a file
                                                        <input type="file" filename="photos" multiple onChange={(e)=>{
                                                        setImage(e.target.files)
                                                        }}/>
                                                        <img alt={imageUpdate.name} src={URL.createObjectURL(item)} />
                                                    </div>
                                                )
                                            )}

                                            <div className="uploadBtn">
                                                <div className="circle">+</div>
                                                Choose a file
                                                <input type="file" filename="photos" multiple onChange={(e)=>{
                                                setImage(e.target.files)}}/>
                                            </div>
                                            
                                        </div>
                                    </label>

                                    <div className="row">
                                        <label htmlFor="#">
                                            <button>Save</button>
                                        </label>

                                        <label htmlFor="#">
                                            <button style={{'backgroundColor':'#fafafa','color':'#222','border':'1px solid #111'}} onClick={cancel}>Cancel</button>
                                        </label>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <AdminFooter />
        </React.Fragment>
    );
}
 
export default EditProduct;