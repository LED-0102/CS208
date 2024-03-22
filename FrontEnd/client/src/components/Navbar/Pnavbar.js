import React, { useEffect } from 'react'
import logo from "../../images/iiti_logo.png"
import "./pnavbar.css"
import { RiUser3Line , RiArrowDropDownLine } from "react-icons/ri";
import { IoIosNotifications , IoIosLogOut } from "react-icons/io";
import { ImProfile } from "react-icons/im";

const Pnavbar = () => {
    const sNav = () =>{
        const navbar = document.querySelector('.makeSticky');
        let top = navbar.offsetTop;
        const stickynavbar = () => {
            if (window.scrollY >= top) {    
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');    
            }
        }
        window.addEventListener('scroll', stickynavbar);
    }
    


    useEffect(() => {
        sNav();
      },[]);

  return (
    <div>
      <nav className="flex h-28 justify-between makeSticky">
        <img src={logo} width="80" className="mx-5" />
        <ul className="mx-5 setWidth flex justify-between items-center">
            <li><button className="mb-3 bg-blue-600 rounded-3xl min-w-10 active">Home</button></li>
            <li><button className="mb-3 bg-blue-600 rounded-3xl min-w-10">About</button></li>
            <li><button className="mb-3 bg-blue-600 rounded-3xl min-w-10">Contact Us</button></li>
        </ul>
        <ul className="mx-5 flex justify-between items-center gap-x-1">
            <li className="flex cursor-pointer"><RiUser3Line size={30} /> <RiArrowDropDownLine size={30} /></li>
            <li className="cursor-pointer"><IoIosNotifications size={30} /></li>
        </ul>
      </nav>
    </div>
  )
}

export default Pnavbar
