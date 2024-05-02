import React, {Component} from "react"
import Cookies from "js-cookie"
import {ThreeDots} from "react-loader-spinner"
import "./index.css"
import MenuList from "../MenuList"


const apiStatusConstant  = {
    initial:"INITIAL",
    success:"SUCCESS",
    failure:"FAILURE",
    loading:"LOADING"
}

class PrimeMember extends Component{

    state = {
        primeList:[],
        apiStatus:apiStatusConstant.initial,
    }

    componentDidMount(){
        this.getPrimeDetails()
    }

    getPrimeDetails = async () => {
        this.setState({
         apiStatus:apiStatusConstant.loading
        })
        const jwtToken = Cookies.get("jwt_token")//get Cookies from jwt_token
        const apiUrl = "http://localhost:3004/prime"//Api
        const options = {
            
            headers:{
                Authorization:`Bearer ${jwtToken}`,
            },
            method:"GET",
        }
        const response = await fetch(apiUrl,options)//feching api details
        if (response.ok ===true){//success part
            const fetchedData = await response.json()// convert into json
            const updatedData = fetchedData.map(prime => ({//convert cases
                title:prime.title,
                price:prime.price,
                id:prime.id,
                imageUrl:prime.image,
                rating:prime.rating,
            }))
            this.setState({
                primeList:updatedData,
                apiStatus:apiStatusConstant.success,
            }) 
        }else if(response.status === 401){//handling failure part
            this.setState({
                apiStatus:apiStatusConstant.failure,
            })
        }
    }

    renderPrimeList = () =>{ //only prime member
     const {primeList} = this.state
     return(
        <div className="primelist-container">
        <h1 className="heading">Exclusive Offers!!!</h1>
        
        
            
            <ul className="list-container">
                {primeList.map(item=>(
                    <MenuList MenuData={item} key={item.id}/>
                ))}

            </ul>
            </div>
        
     )
    }
    renderPrimeFailure = () =>{

        return(
        <p className= "failure-view">Please Join as a Prime Member....</p>
        
    )

}

    renderLoader = () => {
        return(
        <div className="loader-container">
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="grey"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />

        </div>
        )
    }


 render(){
    const {apiStatus} = this.state
    /// three states using switch case
    switch(apiStatus){
        case apiStatusConstant.success:
            return this.renderPrimeList()
        case apiStatusConstant.failure:
            return this.renderPrimeFailure()
        case apiStatusConstant.loading:
            return this.renderLoader()
        default:
            return null
    }
 }
}

export default PrimeMember