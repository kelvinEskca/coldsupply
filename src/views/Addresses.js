import React,{useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
const Addresses = ({onAdd,cart,onRemove,handleSize,cartLength}) => {
    axios.defaults.withCredentials = true;
    const [formactive,setformactive] = useState(false);
    const [editform,setEditForm] = useState(false);
    const [checkBox,setCheckBox] = useState(false);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const useraddress = JSON.parse(localStorage.getItem('address'));
    const navigate = useNavigate();
    
    const handleForm = () =>{
        setformactive(formactive => !formactive);
    }

    const handleToggle = ()=>{
        setCheckBox(checkBox => !checkBox);
        console.log(checkBox);
    }

    const edit = () =>{
        setEditForm(editform => !editform);
    }

    //add address;
    const [address,setAddress] = useState({fname:"",lname:"",email:"", company:"",address1:"",address2:"",city:"",country:"", province:"",phone:"",postcode:""});
    const handleChange = (e) =>{
        e.preventDefault();
        setAddress({...address,[e.target.name]: e.target.value})
    }
    const addAddress = async (e) =>{
        e.preventDefault();
        if(address !== ''){
            try{
                const result = await axios.post('https://api-production-ecae.up.railway.app/api/address',{
                    fname:address.fname,
                    lname:address.lname,
                    email:user.email,
                    company:address.company,
                    address1:address.address1,
                    address2:address.address2,
                    city:address.city,
                    country:address.country,
                    province:address.province,
                    phone:address.phone,
                    postcode:address.postcode,
                    checkStatus:checkBox,
                    userId:user._id
                },{ headers:{token:token} });
                if(result.status === 200){
                    alert("Address updated successfuly");
                    navigate('/account')
                    localStorage.setItem('address',JSON.stringify(result.data.address));
                }
                else{
                    alert("Address failed to upload successfuly")
                }
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            alert('Ensure All inputs are filled!');
        }
    }

    //edit address;
    const [editaddress,setEditAddress] = useState({fnameEdit:"",lnameEdit:"",emailEdit:"",companyEdit:"",address1Edit:"",address2Edit:"",cityEdit:"",countryEdit:"", provinceEdit:"",phoneEdit:"",postcodeEdit:""});
    const handleChangeEdit = (e) =>{
        e.preventDefault();
        setEditAddress({...editaddress,[e.target.name]: e.target.value})
    }
    const editAddress = async (e) =>{
        e.preventDefault();
        const id = user._id;
        if(editaddress !== ''){
            try{
                const addressEdit = await axios.post(`https://api-production-ecae.up.railway.app/api/address/update/${id}`,{
                    fnameEdit:editaddress.fnameEdit,
                    lnameEdit:editaddress.lnameEdit,
                    emailEdit:user.email,
                    companyEdit:editaddress.companyEdit,
                    address1Edit:editaddress.address1Edit,
                    address2Edit:editaddress.address2Edit,
                    cityEdit:editaddress.cityEdit,
                    countryEdit:editaddress.countryEdit,
                    provinceEdit:editaddress.provinceEdit,
                    phoneEdit:editaddress.phoneEdit,
                    postcodeEdit:editaddress.postcodeEdit
                },{ headers:{token:token} });
                if(addressEdit.status === 200){

                }
                else{

                }
            }
            catch(err){
                console.log(err.message);
            }
        }
        else{
            alert('Ensure All inputs are filled!');
        }
    }
    
    return (
        <React.Fragment>
            <Header onAdd={onAdd} cart={cart} onRemove={onRemove} handleSize={handleSize} cartLength={cartLength}/>
            <main className="main">
                <section className="section account">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <h3 className="heading">My Account</h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section order-history address-dets">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                <button className="button" onClick={handleForm}>Add a New Address</button>
                                <Link to="/account">Return to Account Details</Link>
                            </div>

                            <div className={`column-holder ${formactive ? "formshow" : ""}`}>
                                <div className="box">
                                    <h3 className="heading">Add a New Address</h3>
                                    <form action="#" className="form" onSubmit={addAddress}>
                                        <div className="row-label">
                                            <label htmlFor="#">First Name 
                                                <input type="text" id="fname" name="fname" placeholder={useraddress.fname} onChange={handleChange}/>
                                            </label>

                                            <label htmlFor="#">Last Name 
                                                <input type="text" id="lname" name="lname" placeholder={useraddress.lname} onChange={handleChange}/>
                                            </label>
                                        </div>
                                        <label htmlFor="#" style={{display:'none'}}> 
                                            <input type="email" id="email" name="email" placeholder={useraddress.email} onChange={handleChange}/>
                                        </label>

                                        <label htmlFor="#">Company 
                                            <input type="text" id="company" name="company" onChange={handleChange}/>
                                        </label>

                                        <label htmlFor="#">Address1 
                                            <input type="text" id="address1" name="address1" onChange={handleChange}/>
                                        </label>

                                        <label htmlFor="#">Address2 
                                            <input type="text" id="address2" name="address2" onChange={handleChange}/>
                                        </label>

                                        <div className="row-label">
                                            <label htmlFor="#">City 
                                                <input type="text" id="city" name="city" onChange={handleChange}/>
                                            </label>

                                            <label htmlFor="#">Country 
                                                <input type="text" id="country" name="country" onChange={handleChange}/>
                                            </label>
                                        </div>

                                        <div className="row-label">
                                            <label htmlFor="#">Province 
                                                <input type="text" id="province" name="province" onChange={handleChange}/>
                                            </label>

                                            <label htmlFor="#">Postal/Zip Code 
                                                <input type="text" id="postcode" name="postcode" onChange={handleChange}/>
                                            </label>
                                        </div>

                                        <label htmlFor="#">Phone 
                                            <input type="phone" id="phone" name="phone" onChange={handleChange}/>
                                        </label>

                                        <label htmlFor="#" className="checklabel">
                                            <input type="checkbox" className="check" name="checkStatus" id="checkStatus" value={checkBox ? "true" : "false"} onChange={handleToggle}/>
                                            <p className="paragraph">Set as default address</p>
                                        </label>

                                        <label htmlFor="#">
                                            <button className="button">Add Address</button>
                                        </label>
                                    </form>
                                </div>

                                <div className="box">
                                    <h3 className="heading">Your Addresses</h3>
                                    <div className="details-wrapper">
                                        <p className="paragraph">Default</p>
                                        {useraddress.checkStatus ? (
                                            <>
                                            <p className="paragraph">{useraddress.fname}</p>
                                            <p className="paragraph">{useraddress.country}</p>
                                            </>
                                        ) : ("")}
                                        

                                        <span className="details-row">
                                            <Link to="/addresses#" onClick={edit}>Edit</Link>
                                            <p className="paragraph">|</p>
                                            <Link to="/addresses#">Delete</Link>
                                        </span>
                                    </div>
                                </div>

                                <div className={`box editform ${editform ? "editactive" : ''}`}>
                                    <h3 className="heading">Edit Address</h3>
                                    <form action="#" className="form" onSubmit={editAddress}>
                                        <div className="row-label">
                                            <label htmlFor="#">First Name 
                                                <input type="text" id="fname" name="fnameEdit" placeholder={user.fname} onChange={handleChangeEdit}/>
                                            </label>

                                            <label htmlFor="#">Last Name 
                                                <input type="text" id="lname" name="lnameEdit" placeholder={user.lname} onChange={handleChangeEdit}/>
                                            </label>
                                        </div>

                                        <label htmlFor="#" style={{display:'none'}}> 
                                            <input type="email" id="email" name="emailEdit" placeholder={user.email} onChange={handleChange}/>
                                        </label>

                                        <label htmlFor="#">Company 
                                            <input type="text" id="company" name="companyEdit" onChange={handleChangeEdit}/>
                                        </label>

                                        <label htmlFor="#">Address1 
                                            <input type="text" id="address1" name="address1Edit" onChange={handleChangeEdit}/>
                                        </label>

                                        <label htmlFor="#">Address2 
                                            <input type="text" id="address2" name="address2Edit" onChange={handleChangeEdit}/>
                                        </label>

                                        <div className="row-label">
                                            <label htmlFor="#">City 
                                                <input type="text" id="city" name="cityEdit" onChange={handleChangeEdit}/>
                                            </label>

                                            <label htmlFor="#">Country 
                                                <input type="text" id="country" name="countryEdit" onChange={handleChangeEdit}/>
                                            </label>
                                        </div>

                                        <div className="row-label">
                                            <label htmlFor="#">Province 
                                                <input type="text" id="province" name="provinceEdit" onChange={handleChangeEdit}/>
                                            </label>

                                            <label htmlFor="#">Postal/Zip Code 
                                                <input type="text" id="postcode" name="postcodeEdit" onChange={handleChangeEdit}/>
                                            </label>
                                        </div>

                                        <label htmlFor="#">Phone 
                                            <input type="phone" id="phone" name="phoneEdit" onChange={handleChangeEdit}/>
                                        </label>

                                        <label htmlFor="#" className="checklabel">
                                            <input type="checkbox" className="check" />
                                            <p className="paragraph">Set as default address</p>
                                        </label>

                                        <label htmlFor="#">
                                            <button className="button">Add Address</button>
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    );
}
 
export default Addresses;