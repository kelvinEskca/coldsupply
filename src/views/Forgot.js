import { Link,useNavigate } from "react-router-dom";
import React,{useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import baseUrl  from "../config/config";
const Forgot = ({onAdd,cart,onRemove,handleSize,cartLength,sizeOption}) => {
    const [email,setEmail] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(email === '' ){
            alert('Please ensure all fields are filled');
        }
        else{
            try{
                const userSubmit = await axios.post(`${baseUrl.baseUrl}/api/auth/forget`,{
                    email:email
                });
                console.log(userSubmit);
                navigate('/recovery');
            }
            catch(err){
                console.log(err);
            }
        }
        
    }
    return (
        <React.Fragment>
            <Header onAdd={onAdd} cart={cart} onRemove={onRemove} handleSize={handleSize} cartLength={cartLength} sizeOption={sizeOption}/>
            <main className="main">
                <section className="section register">
                    <div className="wrapper">
                        <h3 className="heading">Account Recovery</h3>
                        <p className="paragraph">Please enter the account's email address and we would send you an OTP</p>
                        <div className="boxes">
                            <div className="box">
                                <form action="#" className="form" onSubmit={handleSubmit}>
                                    <label htmlFor="#">Email Address
                                        <input type="email" placeholder="Email" onChange={(e)=>{
                                                setEmail(e.target.value);
                                            }}/>
                                    </label>

                                    <label htmlFor="#">
                                        <button type="submit">Reset</button>
                                    </label>
                                </form>
                                <Link to='/store' className="grey">Go back to store</Link>
                                <Link to='/register' className="black">Don't have an account? Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    );
}
 
export default Forgot;