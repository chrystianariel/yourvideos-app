import React from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import serach_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link } from 'react-router-dom'

const Navbar = ({setSidebar}) => {
  return (
    <nav className='flex-div'>
        <div className='nav-left flex-div'>
            <img className='menu-icon' onClick={()=>setSidebar(prev=>prev===false?true:false)} src={menu_icon} alt="Menu Icon" />
            <Link to='/'><img className='logo' src={logo} alt="Company Logo" /></Link>
        </div>

        <div className="nav-middle flex-div">
            <div className="search-box flex-div">
            <input type="text" placeholder='Search' />
            <img src={serach_icon} alt="Search Icon" />
            </div>
        </div> 

        <div className="nav-right flex-div">
        <img src={upload_icon} alt="Upload Icon" />
        <img src={more_icon} alt="More Icon" />
        <img src={notification_icon} alt="Notification Icon" />
        <img src={profile_icon} className='user-icon' alt="Profile Icon" />
        </div>  
    </nav>
  )
}

export default Navbar