import React from 'react'
import { useDispatch } from 'react-redux'
import adminServices from '@/Services/admin_users.Services'
import { logout } from '@/store/AuthSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = ()=> {
        adminServices.logoutUser().then(()=>{
            dispatch(logout())
        })
    }

  return (
    <button className=''>Logout</button>
  )
}

export default LogoutBtn
