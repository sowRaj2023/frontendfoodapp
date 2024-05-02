  import Header from "../Header"
  import {Hourglass} from "react-loader-spinner"
  import "./index.css"
  
  const MyOrder = () =>(
   <>
   <Header />
   <div>
   <h1 className="heading">Coming Soon...</h1>
   <div className="spinner">
   <Hourglass
  visible={true}
  height="80"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['#black', '#grey']}
  />
  </div>
   </div>
   </>
  )

  export default MyOrder