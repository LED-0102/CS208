import React from 'react'
import "./navbar.css"
import { MdHome } from 'react-icons/md';
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import iiti_logo from "../../images/iiti_logo.png";
const Navbar = () => {
  return (
      <div className="navbarC navbarCHide cb">
        <img src={iiti_logo} width="100" height="100" />
        <ul>
            <li className="activeOp"><MdHome /><p>Home</p></li>
            <li><AiOutlineClockCircle /><p>Recent</p></li>
            <li><CiBookmark /><p>My Stuff</p></li>
        </ul>
      </div>
  )
}

export default Navbar
