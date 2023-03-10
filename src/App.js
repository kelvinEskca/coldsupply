import './index.css';
import React,{useDeferredValue, useEffect, useState, useTransition} from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Login from './views/Login';
import Register from './views/Register';
import Store from './views/Store';
import Privacy from './views/Privacy';
import Info from './views/Info';
import Terms from './views/Terms';
import Forgot from './views/Forgot';
import Recovery from './views/Recovery';
import RecoveryTwo from './views/RecoveryTwo';
import ShippingInfo from './views/ShippingInfo';
import Payment from './views/Payment';
import StoreSingle from './views/StoreSingle';
import Account from './views/Account';
import PrivateRoute from './views/PrvateRoute';
import AdminRoute from './views/AdminRoute';
import Addresses from './views/Addresses';
import Products from './views/Products';
import AdminDashboard from './views/AdminDashboard';
import ProductsListing from './views/ProductsListing';
import EditProduct from './views/EditProduct';
import OrderListing from './views/OrderManagement';
import OrderDetail from './views/OrderDetail';

const App = () => {
  const [isPending, startTransition] = useTransition();
  const [cart,setCart] = useState([]);
  const [size, setSize] = useState('');

  const handleSizeSelect = (selectedSize) => {
    setSize(selectedSize);
  };
  const onAdd = (list) => {
    if (size.length === 0) {
      alert('Please select a size');
    } else {
      // find if the product exists;
      const exist = cart.find((item) => item._id === list._id && item.size === size);
      if (exist) {
        // increase the qty by 1;
        const newCartItems = cart.map((newitem) =>
          newitem._id === list._id && newitem.size === size
            ? { ...exist, qty: exist.qty + 1 }
            : newitem
        );
        setCart(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      } else {
        const newCartItems = [...cart, { ...list, size }];
        setCart(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      }
    }
  };
  

  const onRemove = (list)=>{
    const exist = cart.find((item)=> item._id === list._id);
    if(exist.qty === 1){
      const newCartItems = cart.filter((item)=> item._id !== list._id);
      setCart(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
    else{
      const newCartItems = cart.map((item)=>item._id === list._id ? {...exist,qty:exist.qty - 1} : item);
      setCart(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
  }

  useEffect(()=>{
    startTransition(()=>{
      setCart(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);
    })
  },[]);

  const cartItems = useDeferredValue(cart.length);

  return  isPending ? (<div>Loading.....</div>) :  (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/index" element={<Store onAdd={onAdd} onRemove={onRemove} cart={cart} cartLength={cartItems} sizeOption={size}/>}/>
        <Route path="/about" element={<About onAdd={onAdd} onRemove={onRemove} cart={cart} cartLength={cartItems} sizeOption={size} />}/>
        <Route path="/login" element={<Login onAdd={onAdd} onRemove={onRemove} cart={cart} cartLength={cartItems} sizeOption={size} />}/>
        <Route path="/register" element={<Register onAdd={onAdd} onRemove={onRemove} cart={cart} cartLength={cartItems} sizeOption={size} />}/>
        <Route path="/privacy" element={<Privacy onAdd={onAdd} onRemove={onRemove} cart={cart} cartLength={cartItems} sizeOption={size}/>}/>
        <Route path="/info" element={<Info onAdd={onAdd} onRemove={onRemove} cart={cart} cartLength={cartItems} sizeOption={size}/>}/>
        <Route path="/terms" element={<Terms onAdd={onAdd} onRemove={onRemove} cart={cart} cartLength={cartItems} sizeOption={size}/>}/>
        <Route path="/forgot" element={<Forgot onAdd={onAdd} onRemove={onRemove} cart={cart} cartLength={cartItems} sizeOption={size}/>}/>
        <Route path="/recovery" element={<Recovery onAdd={onAdd} onRemove={onRemove} cart={cart} cartLength={cartItems} sizeOption={size}/>}/>
        <Route path="/recoverytwo" element={<RecoveryTwo onAdd={onAdd} onRemove={onRemove} cart={cart} cartLength={cartItems} sizeOption={size}/>}/>
        <Route path="/shippinginfo" element={<ShippingInfo  cart={cart} cartLength={cartItems} sizeOption={size} />}/>
        <Route path="/payment" element={<Payment onAdd={onAdd} onRemove={onRemove} cart={cart} cartLength={cartItems} sizeOption={size}/>}/>
        <Route path="/store" element={<Store onAdd={onAdd} onRemove={onRemove} cartLength={cartItems} cart={cart} sizeOption={size}/>}/>
        <Route path="/account" element={<PrivateRoute><Account onAdd={onAdd} onRemove={onRemove} cartLength={cartItems} cart={cart} sizeOption={size}/></PrivateRoute>}/>
        <Route path="/addresses" element={<PrivateRoute><Addresses onAdd={onAdd} onRemove={onRemove} cartLength={cartItems} cart={cart} sizeOption={size}/></PrivateRoute>}/>
        <Route path="/storeSingle/:id" element={<StoreSingle onSizeSelect={handleSizeSelect} onAdd={onAdd} onRemove={onRemove} cart={cart} cartLength={cartItems} sizeOption={size} />}/>
        <Route path="/products" element={<AdminRoute><Products/></AdminRoute>}/>
        <Route path="/products/:id" element={<AdminRoute><EditProduct/></AdminRoute>}/>
        <Route path="/admindashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>}/>
        <Route path="/productslisting" element={<AdminRoute><ProductsListing /></AdminRoute>}/>
        <Route path="/order" element={<AdminRoute><OrderListing /></AdminRoute>}/>
        <Route path="/order/:id" element={<AdminRoute><OrderDetail /></AdminRoute>}/>
      </Routes>
    </Router>
  );
}
 
export default App;
