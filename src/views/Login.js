import { Link,useNavigate } from "react-router-dom";
import React,{useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import baseUrl  from "../config/config";
import axios from "axios";
const Login = ({onAdd,cart,onRemove,handleSize,cartLength,sizeOption}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        try{
            const loginUser = await axios.post(`${baseUrl.baseUrl}/api/auth/login`,{
                email:email,
                password:password
            });
            if(loginUser.status === 200){
                setLoggedIn(true);
                console.log(loginUser);
                localStorage.setItem("token", loginUser.data.accessToken);
                localStorage.setItem('user',JSON.stringify(loginUser.data));
                if(loginUser.data.isAdmin === false){
                    setIsLoading(false);
                    navigate('/account');
                }
                else{
                    setIsLoading(false);
                    navigate('/admindashboard');
                }
            }
            else{
                setIsLoading(false);
                setLoggedIn(false);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <React.Fragment>
            <Header onAdd={onAdd} cart={cart} onRemove={onRemove} handleSize={handleSize} cartLength={cartLength} sizeOption={sizeOption}/>
            <main className="main">
                <section className="section register">
                    <div className="wrapper">
                        <h3 className="heading">Sign In</h3>
                        <div className="boxes">
                            <div className="box">
                                <form action="#" className="form" onSubmit={handleSubmit}>
                                    <label htmlFor="#">Email Address
                                        <input type="email" placeholder="Email" onChange={(e)=>{
                                            setEmail(e.target.value);
                                        }}/>
                                    </label>

                                    <label htmlFor="#">Password
                                        <input type="password" placeholder="Password" onChange={(e)=>{
                                            setPassword(e.target.value);
                                        }}/>
                                        <Link to='/forgot' className="black">Forgot Password?</Link>
                                    </label>

                                    <label htmlFor="#">
                                        {isLoading ? (<button className="loadBtn"><Loading/></button>) : (<button type="submit">Login</button>)}
                                    </label>
                                </form>

                                <h3 className="heading">{loggedIn}</h3>
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
 
export default Login;