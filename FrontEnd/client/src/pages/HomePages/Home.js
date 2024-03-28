import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import { GoArrowUpRight } from "react-icons/go";
import { RiBillLine } from "react-icons/ri";
import { LuDot } from "react-icons/lu";
import { RiArrowDropDownLine } from "react-icons/ri";
import "./utility.css"
import "./home.css";


const Home = () => {
  const works = [
    { title: "Leave application" },
    { title: "Leave Application Recommended" },
    { title: "Leave Application Approved" },
    { title: "Leave Application Rejected" },
    { title: "Approved Leave Cancel Request" },
  ];

  const WorkDisplay = ({ work }) => (
    <div className="cssFlex cssAlignItemsCenter cssAlignItemsCenter hpContentOptions">
      <div className="cssFlex cssJustifyBetween cssAlignItemsCenter hpContentOptionsText">
        <span className="ml-2">{work.title}</span>
        <GoArrowUpRight className="mr-2" />
      </div>
      <div className="hpLuDot cssFlex">
        <LuDot />
        <span>0</span>
      </div>
    </div>
  );

  return (
    <div className="hp">
      <div className="bootcontainer hpExtend">
        <div className="cssFlex cssAlignItemsCenter cssJustifyBetween">
            <div className="cssFlex cssAlignItemsCenter hpLeftFlexGap">
              <RxHamburgerMenu className="homehamberger" size={"2em"} />
              <p className="hpHeader">HR-EMP</p>
            </div>
            <div className="cssFlex hpTopRightButtonsDiv">
              <a className="border border-black">
                <button className="bg-white text-black h-2">
                  Create Workspace
                </button>
              </a>
              <a className="border border-black">
                <button className="bg-white text-black h-2">Edit</button>
              </a>
            </div>
        </div>
        <div className="cssFlex">
          <div className="homeCssLeftWidth">
            <div className="cssFlex cssAlignItemsCenter hpLeftFlexGap">
              <RiArrowDropDownLine className="hpPublicSpan" />
              <span className="hpPublicSpan hpPublicSpan2">PUBLIC</span>
            </div>
            <div className="cssFlex cssAlignItemsCenter hpLeftFlexGap hpLeftIcons hpLeftFirstIcon hpLeftIconsactive">
              <FaRegUser />
              <span>HR-EMP</span>
            </div>
            <div className="cssFlex cssAlignItemsCenter hpLeftFlexGap hpLeftIcons">
              <GrNotes />
              <span>MMS Section</span>
            </div>
          </div>
          <div className="hpContentContainer">
            <div className="cssFlex cssFlexWrap hpWorksFlexRev">
              {works.map((w, index) => (
                <WorkDisplay key={index} work={w} />
              ))}
            </div>
            <div className="cssFlex cssSpaceAround hplast_contents">
                <div>
                    <div>
                        <RiBillLine />
                        <span>Employee</span>
                    </div>
                    <div>
                        <LuDot />
                        <span>Employee</span>
                    </div>
                </div>
                <div>
                    <div>
                        <RiBillLine />
                        <span>Leave</span>
                    </div>
                    <div>
                        <LuDot />
                        <span>Leave Type</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
