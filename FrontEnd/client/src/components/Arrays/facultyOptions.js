import form from "../../images/facultyoptionsImages/form.png"
import viewform from "../../images/facultyoptionsImages/viewform.png"

const facultyOptions = [
    {
        id:1,
        title: "View forms",
        url:"/availableForms", 
        src:viewform
    },
    {
        id:2,
        title: "Generate forms",
        url:"/login",
        src:form    
    },
    {
        id:3,
        title: "Leave Application",
        url:"/leave",   
    },
    {
        id:4,
        title: "Leave Application Recommended",
        url:"/recommendedLeave",      
    },
    {
        id:5,
        title: "Leave Application Approved",
        url:"/approvedLeave",      
    },
    {
        id:6,
        title: "Leave Application Rejected",
        url:"/rejectedLeave",      
    },
    {
        id:7,
        title: "Approved Leave Cancel Request",
        url:"/cancelLeaveReq",      
    },
    
    // {
    //     id:9,
    //     title: "Personal Inventory",
    //     url:"/faculty/personalinventory",    
    // },
    // {
    //     id:10,
    //     title: "Budget",
    //     url:"/faculty/budget",      
    // },
    // {
    //     id:11,
    //     title: "Other Requests",
    //     url:"/faculty/otherrequests",      
    // }
    ];
export default facultyOptions;