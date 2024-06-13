import React from 'react'
import { NavLink } from 'react-router-dom';

const FooterLinks = (props) => {
  
  return (
    <div className='flex flex-col gap-3 text-left'>
      <h3 className=' text-richblack-100 font-bold font-inter text-[1.3rem]'>{props.title}</h3>
      <div className='flex flex-col gap-2'>
        {
          props.links.map((link, index) => {
            return(
              <NavLink key={index} to={link?.link} className=" text-richblack-300 text-[0.9rem] opacity-65 transition-all duration-200 hover:text-white">
                {link.text}
              </NavLink>
            )
          })
        }
      </div>
    </div>
  )
}

export default FooterLinks