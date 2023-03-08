import React,{useEffect,useState} from "react";
import { useParams } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
const StoreSingle = ({onAdd,cart,onRemove,handleSize,cartLength}) => {
    const [list,setList] = useState([]);
    const baseUrl = process.env.REACT_APP_API_URL;
    const { id } = useParams();
    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                const res = await axios.get(`${baseUrl}/api/product/${id}`);
                setList(res.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getProducts();
    },[id,baseUrl]);
    
    console.log(list);
    const {title,price,desc,size} = list;
    const item = cart.find((query)=> query._id === list._id);

    return (
        <React.Fragment>
            <Header onAdd={onAdd} cart={cart} onRemove={onRemove} handleSize={handleSize} cartLength={cartLength}/>
            <main className="main">
                <section className="section single-store">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                
                                {list.length !== 0 ? (
                                    <>
                                        <img src={`../assets/${list.image[0].originalname}`} alt="shirt" />
                                        <div className="shirt-images">
                                            <div className="shirt">
                                                <img src={`../assets/${list.image[0].originalname}`} alt="shirt" />
                                            </div>
                                            <div className="shirt">
                                                <img src={`../assets/${list.image[1].originalname}`} alt="shirt" />
                                            </div>
                                            <div className="shirt">
                                                <img src={`../assets/${list.image[2].originalname}`} alt="shirt" />
                                            </div>
                                            
                                            <div className="shirt">
                                                <img src={`../assets/${list.image[3].originalname}`} alt="shirt" />
                                            </div>
                                        </div>
                                    </>

                                ) : ("")}
                                  
                            </div>

                            <div className="box">
                                <div className="title">
                                    <h3 className="heading">{title}</h3>
                                    <h3 className="heading">---</h3>
                                    <h3 className="heading">{`$ ${price}`}</h3>
                                </div>

                                <p className="paragraph desc">{desc}</p>

                                <div className="size">
                                    <p className="paragraph">Size:</p>
                                    <div className="size-box">
                                        {size ? (
                                            size.map((item,i)=>{
                                                return (
                                                    <div className="sizes" key={i}>
                                                        <h3 className="heading" onClick={()=> handleSize(item)}>{item}</h3>
                                                    </div>
                                                )
                                            })
                                        ):('')}
                                    </div>
                                </div>
                                
                                {item ? (
                                    <div className="qty-toggle">
                                        <span className="minus" onClick={()=> onRemove(item)}>-</span>
                                        <span className="qty">{item.quantity}</span>
                                        <span className="add" onClick={()=>onAdd(item)}>+</span>
                                    </div>
                                )
                                :(<button onClick={()=>onAdd(list)}>Add To Cart</button>)
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    );
}
 
export default StoreSingle;