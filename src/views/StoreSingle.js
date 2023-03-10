import React,{useEffect,useState} from "react";
import { useParams } from 'react-router-dom';
import Footer from "../components/Footer";
import Header from "../components/Header";
import baseUrl  from "../config/config";
import axios from "axios";
const StoreSingle = ({onAdd,cart,onRemove,cartLength,onSizeSelect,sizeOption }) => {
    const [list,setList] = useState([]);
    const [sizeSelected,setSizeSelected] = useState('');
    const [previewImage,setPreviewImage] = useState([]);
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
    },[id]);

    const preview = (pi)=>{
        setPreviewImage(pi);
    }
    const handleSize = (sizes)=>{
        setSizeSelected(sizes);
        onSizeSelect(sizes);
    }

    useEffect(() => {
        console.log(sizeSelected);
    }, [sizeSelected]);
    
    const {title,price,details,size} = list;
    const item = cart.find((query)=> query._id === list._id);

    return (
        <React.Fragment>
            <Header onAdd={onAdd} cart={cart} onRemove={onRemove} cartLength={cartLength} sizeOption={sizeOption}/>
            <main className="main">
                <section className="section single-store">
                    <div className="wrapper">
                        <div className="boxes">
                            <div className="box">
                                
                                {list.length !== 0 ? (
                                    <>  
                                        {previewImage.length !== 0 ? (<img src={`${previewImage}`} alt="shirt" />) : (<img src={`${list.image[0].url}`} alt="shirt" />)}
                                        <div className="shirt-images">
                                            {list.image.map((item,i)=>{
                                                return (
                                                    <div className="shirt">
                                                        <img src={`${item.url}`} alt="shirt" key={i} onClick={()=>preview(item.url)} />
                                                    </div>
                                                )
                                            })}                                    
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

                                <p className="paragraph desc">{details}</p>

                                <div className="size">
                                    <p className="paragraph">Size:</p>
                                    <div className="size-box">
                                    {size ? (
                                        size.map((item,i)=>{
                                            return (
                                                <div className={`sizes ${sizeSelected === item  ? ("active") : ("")}`} key={i} onClick={()=>handleSize(item)}>
                                                    <h3 className="heading" >{item}</h3>
                                                </div>
                                            )
                                        })
                                    ):('')}

                                    </div>
                                </div>
                                
                                {item ? (
                                    <div className="qty-toggle">
                                        <span className="minus" onClick={()=> onRemove(item)}>-</span>
                                        <span className="qty">{item.qty}</span>
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