import React,{useState} from 'react'
// import user_icon from '../../images/LoginSignup/person.png'
// import email_icon from '../../images/LoginSignup/email.png'
// import password_icon from '../../images/LoginSignup/password.png'
import image_icon from '../../images/LoginSignup/image.jpg'
import google_icon from '../../images/LoginSignup/google.svg'
import globalUrl from "../url";
import Cookies from 'js-cookie';
import axios from "axios";
import { Link } from 'react-router-dom'

const LoginSignup = () => {
  const [action,setAction]=useState("Sign Up");
  const [post,setPost]=useState({
    username:'',
    email:'',
    password:'',
    designation:'',
  
  })

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setPost({ ...post, designation: option }); // Update designation field with selected option
    setShowDropdown(false);
  };
 

  const [cook , setCook]= useState("");
  const handleInput=(event)=>{
    setPost({...post,[event.target.name]: event.target.value})

  }
  const handleSubmit = async (event) => { 
    event.preventDefault();
    console.log("formdata submit clicked ",post)
    
    try {
      const response = await axios.post(`${globalUrl}/v1/auth/register`, post, {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
      >
        {/* <!-- left side --> */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcom back! Please enter your details
          </span>
          <div className="py-4">
            <span className="mb-2 text-md">Username</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="username"
              id="username"
              value={post.username}
              onChange={handleInput}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="text"
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
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              value={post.password}
              onChange={handleInput}
            />
          </div>
          <div className="py-4">
      <span className="mb-2 text-md">Designation</span>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
        onClick={toggleDropdown}
        readOnly
        value={selectedOption} // Display selected option in input field
      />
      {showDropdown && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 shadow-md">
          <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleOptionClick("HOD")}>HOD</li>
          <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleOptionClick("Staff")}>Staff</li>
          <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleOptionClick("Professor")}>Professor</li>
          <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleOptionClick("Office")}>Office</li>
          <li className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleOptionClick("Student")}>Student</li>
        </ul>
      )}
    </div>
          <div className="flex justify-between w-full py-4">
            <div className="mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-md">Remember for 30 days</span>
            </div>
            <span className="font-bold text-md">Forgot password</span>
          </div>
          <button
            className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </button>
          {/* <button
            className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
          >
            <img src={google_icon} alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button> */}
          <div className="text-center text-gray-400">
            Already have an account?
            {/* <span className="font-bold text-black">Log in</span> */}
            <Link to="/login"><span className="font-bold text-black">Login</span></Link>
          </div>
        </div>
        {/* right side */}
        <div className="relative">
          <img
            src=""
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          {/* <!-- text on image  --> */}
          <div
            className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
          >
            <span className="text-white text-xl"
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