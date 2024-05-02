import React, { Component} from "react";
import {Navigate } from "react-router-dom"
import Cookies from "js-cookie"

import "./index.css"
class LoginForm extends Component{
    constructor(props){
        super(props)
            this.state={
                username:"",
                password:"",
                loginSuccess:false,
                loginFailure:false,
            };
        }
        onSubmitForm = async event => {
             event.preventDefault();
             const {username, password} = this.state;
             const userDetails = {username,password};
             const url = "http://localhost:3004/login";
             const options = {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(userDetails)
                
             };

             
            try{
                const response = await fetch(url,options);
                const responseData = await response.json();
                console.log("Response Data:" ,responseData)
                
                if(response.ok){
                    //login success
                   
                    if(responseData.jwt_token){
                        const expirationDate = new Date()
                        expirationDate.setDate(expirationDate.getDate()+7);
                        Cookies.set("jwt_token", responseData.jwt_token, {expires: expirationDate});
                        this.setState({loginSuccess:true, loginFailure:false})
                    }else{
                        console.error("jwt_token is undefined");
                        this.setState({loginSuccess:false, loginFailure:true})
                    }
                    
                        
                }else{
                    //login failure
                    this.setState({loginSuccess:false, loginFailure:true})
                }

            }catch(error){
                    console.error("Error Occur:", error);
                    this.setState({loginSuccess:false, loginFailure:true})
            }
        };
    


    onChangeUserName = event =>{
        this.setState({username:event.target.value})
    }

    onChangePassword = event => {
        this.setState({password:event.target.value})
    }

    
    renderUserName = () => {
        const{username} = this.state
        return(
            <>
            <label className="input-label" htmlFor="username">
                USERNAME
            </label>
            <input 
            type="text"
            id="username"
            value={username}
            placeholder="Enter Your Name"
            className="user-input"
            onChange={this.onChangeUserName}/>
            </>
        )   
    };

    renderPassword = () => {
        const {password} = this.state
        return(
            <>
            <label className="input-label" htmlFor="password">
            PASSWORD
            </label>
            <input 
            type="password"
            id="password"
            value = {password}
            placeholder="Enter Your Password"
            className="password-input"
            onChange={this.onChangePassword}/>
            </>
        )
    };

    render() { 
        const jwtToken = Cookies.get('jwt_token') 
        if(jwtToken !== undefined){
            return < Navigate to="/"/>
        }  
        const {loginSuccess, loginFailure} = this.state;
    
        if(loginSuccess) {
            return <Navigate to="/" replace />
        } 
    
        return(
            <div className="login-form-container">
                <form className="form-container" onSubmit = {this.onSubmitForm}>
                    <img src="https://img.freepik.com/free-photo/beautiful-woman-chef-image_144627-9580.jpg" alt="logo" className="login-image"/>
                    <div className="input-container">{this.renderUserName()}</div>
                    <div className="input-container">{this.renderPassword()}</div>
                    <button type="submit" className="login-btn">Login</button>
                   {loginFailure && (<div className="failed-message">*Login Faild Please Enter Valid Usernam and Password.</div>)} 
                </form>
            </div>
        )
    
       }
}
            
export default LoginForm
