import "./index.css"

const MenuList = props => {

    const {MenuData} = props
    const {title, imageUrl, rating,price} = MenuData;
    return(
        <li className="menu-item">
            <img src={imageUrl} alt="item" className="thumbnail"/>
            <h1 className="title">{title}</h1>
            <div className="menu-details">
                <p className="price">Rs {price}</p>
                <div className="rating-container">
                    <p className="rating">{rating}</p>
                    <img className="star" src="https://img.freepik.com/free-vector/3d-metal-star-isolated_1308-115283.jpg?" alt="star"/>
                </div>
            </div>
        </li>

    )
}

export default MenuList