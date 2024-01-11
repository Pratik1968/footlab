"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useEffect, useLayoutEffect } from 'react'
import Login from "./login/page"
import Register from "./SignUp/page"

export default function Home() {

  
  return (
<Page/>
  )

}
const Page = ()=>{
  let userRegister = sessionStorage.getItem("email")?true:false
  if(userRegister)  return <Login/>
  else  return <Register/>

}
