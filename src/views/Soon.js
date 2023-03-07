import React,{useEffect,useState} from "react";
import Loader from "../components/Loader";
//import axios from "axios";
const Soon = () => {
    //const [email,setEmail] = useState('');
    // const handleSubmit = async (e)=>{
    //     e.preventDefault();
    //     if(email !== ""){
    //         try{
    //             const submit = await axios.post('http://localhost:5000/api/subscribe',{
    //                 email:email
    //             });
    //             if(submit.status === 200){
    //                 alert('Your Subscription is successful');
    //             }
    //         }
    //         catch(err){
    //             console.log(err);
    //         }
    //     }
    //     else{
    //         alert('Please Enter Your Email')
    //     }
    // }

    const [showComponent, setShowComponent] = useState(true);
    useEffect(() => {
        if (showComponent) {
          const timeoutId = setTimeout(() => {
            setShowComponent(false);
          }, 5000);
          return () => clearTimeout(timeoutId);
        }
    }, [showComponent]);
    return (
        <>
            {showComponent && <Loader />}
            <section className="section hero soon">
                <video autoPlay muted loop>
                    <source src="../assets/logo.mp4" type="video/mp4"/>
                </video>
                <div className="wrapper">
                    <div className="boxes">
                        <div className="box">
                            <h3 className="heading">Sign up for updates</h3>
                            <p className="paragraph"><b>COLDSUPPLY</b> isn't just another brand. We are the voice of the youths who strive for greatness and thrive on individuality not bound by self imposed limitations.</p>

                            <form className="form" action="https://formsubmit.co/support@cold-supply.com" method="POST" >
                                {/* <label htmlFor="#"><input type="email" name="email" placeholder="Enter Email Address" onChange={(e)=>setEmail(e.target.value)}/></label> */}
                                <label htmlFor="#"><input type="email" name="email" placeholder="Enter Email Address"/></label>
                                <label htmlFor="#"><button>Register</button></label>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
 
export default Soon;