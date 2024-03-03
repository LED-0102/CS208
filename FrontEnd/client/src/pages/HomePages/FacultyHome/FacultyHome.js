import React from 'react'
import iiti_logo from "../../../images/iiti_logo.png";
import "./facultyHome.css";
import { MdHome } from 'react-icons/md';
import { AiOutlineClockCircle } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { RiUser3Line } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import facultyOptions from '../../../components/Arrays/facultyOptions';
const FacultyHome = () => {
  return (
    <div className="facultyHomeBody">
      <div className="navbarC">
        <img src={iiti_logo} width="100" height="100"></img>
        <ul>
            <li className="activeOp"><MdHome /><p>Home</p></li>
            <li><AiOutlineClockCircle /><p>Recent</p></li>
            <li><CiBookmark /><p>My Stuff</p></li>
        </ul>
      </div>
      <div className="fH_FocusPage">
        <div className="fH_head">
          <div className="fH_headUser">
            <RiUser3Line />
            <RiArrowDropDownLine />
          </div>
        </div>
        <div className="optionsCont">
          {facultyOptions.map((option) => 
          <div className="fCard" key={option.id}>
            <img src="https://via.placeholder.com/300" width={300} alt="Card Image" />
            <div className="fcard-content">
              <div className="fcard-title">{option.title}</div>
              <a href="#" className="fbutton">Click Here</a>
            </div>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default FacultyHome
