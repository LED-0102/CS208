import React from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import { GoArrowUpRight } from "react-icons/go";
import { RiBillLine } from "react-icons/ri";
import { LuDot } from "react-icons/lu";
import { RiArrowDropDownLine } from "react-icons/ri";

const NewFh = () => {
  const works = [
    {title:"Leave application"},
    {title:"Leave Application Recommended"},
    {title:"Leave Application Approved"},
    {title:"Leave Application Rejected"},
    {title:"Approved Leave Cancel Request"},
  ];

  const WorkDisplay = ({work}) => (
    <div className="flex justify-between gap-10 items-center border-x-1 border-x-black">
        <span className="ml-2">{work.title}</span>
        <GoArrowUpRight className="mr-2" />
    </div>
  );

  return (
    <div>
      <div className="bootcontainer">
        <div className="flex">
            <div className="w-56">
                <div className="flex">
                    <RxHamburgerMenu />
                    <p>HR-EMP</p>
                </div>
                <div className="flex">
                    <RiArrowDropDownLine />
                    <span>PUBLIC</span>
                </div>
                <div className="flex">
                    <FaRegUser />
                    <span>HR-EMP</span>
                </div>
                <div className="flex">
                    <GrNotes />
                    <span>MMS Section</span>
                </div>
            </div>
            <div className="">
                <div className="flex justify-end gap-2">
                    <Link className="border border-black"><button className="bg-white text-black h-2">Create Workspace</button></Link>
                    <Link className="border border-black"><button className="bg-white text-black h-2">Edit</button></Link>
                </div>
                <div className="flex flex-wrap">
                    {works.map((w,index) => <WorkDisplay key={index} work={w} />)}
                </div>
                <RiBillLine />
                <span>Employee</span>
                <LuDot />
                <span>Employee</span>
                <RiBillLine />
                <span>Leave</span>
                <LuDot />
                <span>Leave Type</span>
            </div>
        </div>   
      </div>
    </div>
  );
};

export default NewFh;