import React from 'react'
import iiti_logo from "../../../images/iiti_logo.png";
import "./facultyHome.css";
import { MdHome } from 'react-icons/md';
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { RiUser3Line } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosNotifications , IoIosLogOut } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import facultyOptions from '../../../components/Arrays/facultyOptions';
import { Link } from 'react-router-dom';
const FacultyHome = () => {

  // const handleNav = () =>{
  //   const a=document.querySelector(".navbarC")
  //   a.classList.toggle("navbarCHide")
  // }

  // const handleD = () =>{
  //   const a=document.querySelector(".fH_headUserDropDown")
  //   a.classList.toggle("fH_headUserDropDownHide")
  // }

  const handleHide = (el) =>{
    const a=document.querySelector("."+el)
    a.classList.toggle(el+"Hide")
  }

  return (
    <div className="facultyHomeBody">
      <div className="navbarC navbarCHide">
        <img src={iiti_logo} width="100" height="100" />
        <ul>
            <li className="activeOp"><MdHome /><p>Home</p></li>
            <li><AiOutlineClockCircle /><p>Recent</p></li>
            <li><CiBookmark /><p>My Stuff</p></li>
        </ul>
      </div>
      <div className="fH_FocusPage">
        <div className="fH_head">
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
        <div className="optionsCont">
          {facultyOptions.map((option) => 
          <div className="fCard" key={option.id}>
            <img src={option.src} width={300} height={300} alt="Card Image" />
            <div className="fcard-content">
              <div className="fcard-title">{option.title}</div>
              <Link to={option.url} className="fbutton">Click Here</Link>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default FacultyHome
