import React from "react";
import { Link } from "react-router-dom";
import { loginUser } from './../../apiCalls/auth';
import { toast } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../../redux/loaderSlice";

function Login(){
    const dispatch = useDispatch();
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });

    async function onFormSubmit(event){
        event.preventDefault();
        // console.log(user);
        let response = null;
        try{
            dispatch(showLoader());
            response = await loginUser(user);
            dispatch(hideLoader());
            // console.log("in login :",response);
            if(response.success){
                // alert(response.message);
                toast.success(response.message);
                localStorage.setItem('token', response.token);
                window.location.href = "/"; // redirect to home page
            }else{
                // alert(response.message);
                toast.error(response.message);
            }
        }catch(error){
            // alert(error.message);
            dispatch(hideLoader());
            toast.error(response.message);
        }
    }

    return (
        <div className="container">
        <div className="container-back-img"></div>
        <div className="container-back-color"></div>
        <div className="card">
        <div className="card_title">
            <h1>Login Here</h1>
        </div>
        <div className="form">
        <form onSubmit={ onFormSubmit }>
            <input type="email" placeholder="Email" 
            value={user.email}
            onChange={ (e) => setUser({...user, email: e.target.value})} />

            <input type="password" placeholder="Password"
            value={user.password}
            onChange={ (e) => setUser({...user, password: e.target.value})} />
            <button>Login</button>
        </form>
        </div>
        <div className="card_terms"> 
            <span>Don't have an account yet?
                <Link to="/signup">Signup Here</Link>
            </span>
        </div>
        </div>
    </div>
    )
}

export default Login;