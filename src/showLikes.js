import { getLikes } from "./hitApi.js";
import showPizza from "./home.js";



const likeCounter = async () => {
    const value  = await getLikes();
    console.log(value)
  };
  

  export default likeCounter;