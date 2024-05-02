import React, {Component} from "react"
import Cookies from "js-cookie"
import {ThreeDots} from "react-loader-spinner"
import "./index.css"
import MenuList from "../MenuList"
import MenuHeader from "../MenuHeader"



const sortbyOptions =   [
    {
        optionId:'PRICE_HIGH',
        displayText:'Price (High-Low)',
    },

    {
        optionId:'PRICE_LOW',
        displayText:'Price (Low-High)',
    },
]

class AllMenuSection extends Component{

    state = {
        activeOptionId: sortbyOptions[0].optionId,
        MenuLists:[],
        isLoading:true,
       
    }

    componentDidMount(){
        this.getMenuDetails()
    }

   getMenuDetails = async () => {

        const activeOptionId = this.state
        this.setState({
            isLoading:true,
        })
        const jwtToken = Cookies.get("jwt_token")
        const apiUrl = `http://localhost:3004/menu?sort_by = ${activeOptionId}`
        
        const options = {
            method:"GET",
            headers:{
                Authorization:`Bearer ${jwtToken}`,
            },
        }
        const response = await fetch(apiUrl,options)
        if (response.ok ===true){
            const fetchedData = await response.json()
            const updatedData = fetchedData.map(menu => ({
                title:menu.title,
                price:menu.price,
                id:menu.id,
                imageUrl:menu.image,
                rating:menu.rating,
            }))
            this.setState({
                MenuLists:updatedData,isLoading:false
            }) 
        }
    }

    updateActiveOptionId = activeOptionId =>{
        this.setState({
            activeOptionId,
        },this.getMenuDetails)
    }



    renderMenuList = () =>{
     const {MenuLists,activeOptionId} = this.state
     return(
        <>
        <MenuHeader sortbyOptions = {sortbyOptions}
        activeOptionId = {activeOptionId}
        updateActiveOptionId = {this.updateActiveOptionId}/>
           <ul className="list-container">
                {MenuLists.map(item=>(
                    <MenuList MenuData={item} key={item.id}/>
                ))}

            </ul>
            </>
        
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
    const {isLoading} = this.state
   return <>
   {isLoading? this.renderLoader() : this.renderMenuList()}
   </>
 }
}

export default AllMenuSection