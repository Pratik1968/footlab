"use client"
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { useEffect, useLayoutEffect } from 'react'
import Login from "./login/page"
import Register from "./SignUp/page"
import 'material-symbols';
export default function Home() {
  // let userRegister = sessionStorage.getItem("email")===undefined?true:false
return <Login/>  


}

