import React,{useState} from 'react'
// import user_icon from '../../images/LoginSignup/person.png'
// import email_icon from '../../images/LoginSignup/email.png'
// import password_icon from '../../images/LoginSignup/password.png'
import google_icon from '../../images/LoginSignup/google.svg'
import campus from '../../images/LoginSignup/campus.jpg'
import globalUrl from "../url";
import Cookies from 'js-cookie';
import axios from "axios";
import { Link } from 'react-router-dom'
import "./login.css"


const LoginSignup = () => {
  const [action,setAction]=useState("Sign Up");
  const [post,setPost]=useState({
    // username:'',
    email:'',
    password:'',
  
  })

  const [cook , setCook]= useState("");
  const handleInput=(event)=>{
    setPost({...post,[event.target.name]: event.target.value})

  }

  const handleSubmit = async (event) => { 
    event.preventDefault();
    console.log("formdata",post)
    
    try {
      const response = await axios.post(`${globalUrl}/v1/auth/login`, post, {
          withCredentials: true,
      });
      console.log("Here");
      console.log("Response.headers", response.headers);

        if (response.headers['set-cookie']){
            console.log("Inside");
            const cookieValue = response.headers['set-cookie'][0];
            localStorage.setItem('jwt', cookieValue);
            console.log('Cookie set: ');
        }
        console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

    const setCookie = () => {
        Cookies.set('userToken', 'exampleToken', { expires: 7 }); // Set a cookie that expires in 7 days
    };

    const getCookie = () => {
        const userToken = Cookies.get('userToken'); // Get the value of the cookie
        alert(`User Token: ${userToken || 'Not found'}`);
    };

    const deleteCookie = () => {
        Cookies.remove('userToken'); // Remove the cookie
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div
        className="extCssFadeIn relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
      >
        {/* <!-- left side --> */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold overflow-y-hidden">Welcome back</span>
          <span className="text-gray-600 mb-8">
            Welcome back! Please enter your details
          </span>
            <form>
            {/* <form onSubmit={handleSubmit}> */}
          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              value={post.email}
              onChange={handleInput}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="password"
              id="password"
              value={post.password}
              onChange={handleInput}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24 flex justify-center">
              <input type="checkbox" name="ch" id="ch" className="mr-2 cursor-pointer" />
              <label className="text-md cursor-pointer" htmlFor="ch">Remember for 30 days</label>
            </div>
            <Link className="cursor-pointer"><span className="font-bold text-md">Forgot password</span></Link>
          </div>
          <button
            className="w-full font-normal text-base bg-blue-600 text-white p-2 rounded-lg mb-6 hover:bg-blue-800 hover:font-bold hover:text-lg"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Sign in
          </button>
          </form>
          {/* <button
            className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
          >
            <img src={google_icon} alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button> */}
          <div className="text-center text-gray-400">
            Dont'have an account?
            <Link to="/signup"><span className="font-bold text-black">Sign up for free</span></Link>
          </div>
        </div>
        {/* right side */}
        <div className="relative">
          <img
            src={campus}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          {/* <!-- text on image  --> */}
          <div
            className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-50 backdrop-blur-sm rounded drop-shadow-lg md:block"
          >
            <span className="text-xl font-bold"
              >We've been uesing Untitle to kick"<br />start every new project
              and can't <br />imagine working without it."
            </span>
          </div>
        </div>
      </div>
    </div>
  ) 
}

export default LoginSignup