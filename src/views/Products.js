import React,{useState} from "react";
import AdminFooter from "../components/AdminFooter";
import AdminHeader from "../components/AdminHeader";
import { useNavigate } from "react-router-dom";
import { Multiselect } from 'multiselect-react-dropdown';
import baseUrl  from "../config/config";
import axios from "axios";
import Loading from "../components/Loading";
const Products = () => {
    const [size,setSize] = useState([]);
    const [price,setPrice] = useState('');
    const [details,setDetails] = useState('');
    const [title,setTitle] = useState('');
    const [quantity,setQuantity] = useState('');
    const [stock,setStock] = useState('');
    const [image,setImage] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [isLoading,setIsLoading] = useState(false);

    const formData = new FormData();
    if (Array.isArray(size)) {
        const sizeValues = size.map((item) => item.size);
        formData.append("size", sizeValues);
    } else {
        formData.append("size", size);
    }
    formData.append("price", price);
    formData.append("title", title);
    formData.append("details", details);
    formData.append("quantity", quantity);
    formData.append("stock", stock);
    Array.from(image).forEach(item =>{
        formData.append("photos", item);
    })

    const handleForm = async (e) =>{
        e.preventDefault();
        setIsLoading(true);
        if(size.length === 0 || details === '' || price === '' || title === '' || quantity === '' || stock === '' || image === ''){
            alert('Please Ensure All fields are filled');
            setIsLoading(false);
        }
        else{
            try{
                const productSubmit = await axios.post(`${baseUrl.baseUrl}/api/product`,
                formData,{headers:{token:token}});
                console.log(productSubmit);
                if(productSubmit.status === 200){
                    setIsLoading(false);
                    alert(productSubmit.data.message);
                    navigate('/productslisting');
                }
                else{
                    setIsLoading(false);
                    alert(productSubmit.data.message);
                }
            }
            catch(err){
                console.log(err);
            }
        }
        console.log(formData);
    }

    const data = [
        {size:"S",id:1},
        {size:"L",id:2},
        {size:"XL",id:3},
        {size:"XXL",id:4},
    ]
    
    const [options] = useState(data);

    const cancel = (e) =>{
        e.preventDefault();
        setSize([]);
        setPrice("");
        setDetails("");
        setTitle("");
        setQuantity("");
        setStock("");
        setImage([]);
        setIsLoading(false);
    }

    console.log(size);
    return (
        <React.Fragment>
            <AdminHeader/>
            <main className="main">
                <section className="section register shippinginfo productInfo">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <form action="#" className="form" onSubmit={handleForm} encType="multipart/form-data">
                                    <h3 className="heading">Add New Products</h3>
                                    <div className="row">
                                        <label htmlFor="#">Product Name
                                            <input type="text" placeholder="Product Name" onChange={(e)=>{
                                                setTitle(e.target.value);
                                            }} />
                                        </label>

                                        <label htmlFor="#">Product Price
                                            <input type="text" placeholder="Product Price" onChange={(e)=>{
                                                setPrice(e.target.value)
                                            }}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">Product Details
                                        <textarea name="details" id="details" cols="30" rows="10" onChange={(e)=>{
                                                setDetails(e.target.value)
                                            }} placeholder="Product Details"></textarea>
                                    </label>
                    
                                   
                                    <label htmlFor="#">Sizes Available
                                        <Multiselect options={options} displayValue="size" onSelect={(e)=>{
                                            setSize([...e])
                                        }}onRemove={(size) => setSize(size)}/>
                                    </label>
                                 
                                    
                                    <div className="row">
                                        <label htmlFor="#">Quantity
                                            <input type="text" placeholder="Quantity" onChange={(e)=>{
                                                setQuantity(e.target.value)
                                            }}/>
                                        </label>

                                        <label htmlFor="#">In Stock
                                        <select name="stock" id="stock" onChange={(e)=>{
                                                setStock(e.target.value)
                                            }}>
                                            <option defaultValue={'select'} selected>Select Option</option>
                                            <option defaultValue={'true'}>True</option>
                                            <option defaultValue={'false'}>False</option>
                                        </select>
                                        </label>
                                    </div>

                                    <label htmlFor="#" className="uploadLabel">Product Images
                                        <div className="uploadRow">
                                            {Array.from(image).map((item,i)=>
                                                (
                                                    <div className="uploadBtn" key={i}>
                                                        <div className="circle">+</div>
                                                        Choose a file
                                                        <input type="file" filename="photos" multiple onChange={(e)=>{
                                                        setImage(e.target.files)
                                                        }}/>
                                                        <img alt={image.name} src={URL.createObjectURL(item)} />
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
                                        {isLoading ? (<button className="loadBtn"><Loading/></button>) : (<button type="submit">Save</button>)}
                                        </label>

                                        <label htmlFor="#">
                                            <button type="button" style={{'backgroundColor':'#fafafa','color':'#222','border':'1px solid #111'}} onClick={(e)=>cancel(e)}>Cancel</button>
                                        </label>
                                    </div>
                                    
                                </form>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
            <AdminFooter />
        </React.Fragment>
    );
}
 
export default Products;