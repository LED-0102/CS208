import React from 'react';
import "./header.css";
import { RiUser3Line } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosNotifications , IoIosLogOut } from "react-icons/io";
import { ImProfile } from "react-icons/im";
const Header = () => {

    const handleHide = (el) =>{
        const a=document.querySelector("."+el)
        a.classList.toggle(el+"Hide")
    }
  return (
    <div className="fH_FocusPage">
    <div className="fH_head cb">
          <div className="headHam" onClick={ ()=>handleHide("navbarC") }>
            <div className="htb"></div>
            <div className="hm"></div>
            <div className="htb"></div>
          </div>
          <div className="fh_User">
            <div className="fH_headUser" onClick={()=>handleHide("fH_headUserDropDown")}>
              <RiUser3Line />
              <RiArrowDropDownLine />
            </div>
            <div className="fH_headUserDropDown fH_headUserDropDownHide">
              <ul>
                <li><ImProfile /><pre> My Profile</pre></li>
                <li><IoIosNotifications /><pre> Notifications</pre></li>
                <li><IoIosLogOut /><pre> LogOut</pre></li>
              </ul>
            </div>
          </div>
        </div>
        </div>
  )
}

export default Header
