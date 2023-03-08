import axios from "axios";
import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
const Register = ({onAdd,cart,onRemove,handleSize,cartLength}) => {
    const [fname,setFname] = useState('');
    const [lname,setLname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setcPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const baseUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsLoading(true);
        if(email === ''  || fname === '' || lname === '' || password === '' || cpassword === ''){
            alert('Please ensure all fields are filled');
        }
        else if(password !== cpassword){
            alert('Please make sure passwords match');
        }
        else{
            try{
                const userSubmit = await axios.post(`${baseUrl}/api/auth/register`,{
                    email:email,
                    fname:fname,
                    lname:lname,
                    password:password,
                    cpassword:cpassword
                });
                console.log(userSubmit);
                setIsLoading(false);
                navigate('/login');
            }
            catch(err){
                setIsLoading(false);
                console.log(err);
            }
        }
    }
    return (
        <React.Fragment>
            <Header onAdd={onAdd} cart={cart} onRemove={onRemove} handleSize={handleSize} cartLength={cartLength}/>
            <main className="main">
                <section className="section register">
                    <div className="wrapper">
                        <h3 className="heading">Sign Up</h3>
                        <div className="boxes">
                            <div className="box">
                                <form action="#" className="form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <label htmlFor="#">First Name
                                            <input type="text" placeholder="First Name" onChange={(e)=>{
                                                setFname(e.target.value);
                                            }}/>
                                        </label>

                                        <label htmlFor="#">Last Name
                                            <input type="text" placeholder="Last Name" onChange={(e)=>{
                                                setLname(e.target.value);
                                            }}/>
                                        </label>
                                    </div>

                                    <label htmlFor="#">Email Address
                                        <input type="email" placeholder="Email" onChange={(e)=>{
                                                setEmail(e.target.value);
                                            }}/>
                                    </label>

                                    <label htmlFor="#">Password
                                        <input type="password" placeholder="Password" onChange={(e)=>{
                                                setPassword(e.target.value);
                                            }}/>
                                    </label>

                                    <label htmlFor="#">Confirm Password
                                        <input type="password" placeholder="Confirm Password" onChange={(e)=>{
                                                setcPassword(e.target.value);
                                            }}/>
                                    </label>

                                    <label htmlFor="#">
                                        {isLoading ? (<Loading/>) : (<button type="submit">Create Account</button>)}
                                    </label>
                                </form>
                                <Link to='/store' className="grey">Go back to store</Link>
                                <Link to='/login' className="black">Already have an account? Sign In</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    );
}
 
export default Register;