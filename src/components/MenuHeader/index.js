import React from "react"
import "./index.css"

const MenuHeader = props => {
    const {sortbyOptions, activeOptionId, updateActiveOptionId} = props;
    const onChangeSortby = event =>{
        updateActiveOptionId(event.target.value)
    }
    return(
        <div className="menu-header">
            <h1 className="title">All Products</h1>
            <div className="sort-by-container">
                <h1 className="sort-by">Sort by</h1>
                <select 
                className="sort-by-select"
                value = {activeOptionId}
                onChange = {onChangeSortby}>
                {sortbyOptions.map(eachOption =>(
                    <option
                    key= {eachOption.optionId}
                    value = {eachOption.optionId}
                    className="select-option">

                        {eachOption.displayText}
                    </option>
                ))}
                </select>
                
            </div>
        </div>
    ) 

}

export default MenuHeader