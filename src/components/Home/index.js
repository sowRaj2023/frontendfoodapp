
import Header from "../Header"

import "./index.css"


const Home = () => {

   
    return(
    <>
    <Header />
    <div className="home-container">

        
        <h1 className="home-heading">Welcome to Sowndharya's Kitchen</h1>
        <img className="image" src="https://img.freepik.com/free-photo/chef-female-holds-punmping-dark-background_613910-7184.jpg" alt="image1"/>
        <p className="home-description">Our job is to filling your tummy with
         delicious food and fastest delivery.
        </p>
        <button className="order-now-btn">Order Now</button>
    </div>
    </>

)}
export default Home