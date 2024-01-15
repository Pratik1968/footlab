"use client"
import { ReactNode, useEffect, useState } from "react";
import PersonSrc from "../assets/user.svg"
import EmailSrc from "../assets/email.svg"
import PasswordSrc from "../assets/password.svg"
import Image from "next/image";
import illustration1 from "../assets/girl-shopping-illustration.svg";
import illustration2 from "../assets/ladding-waiting-illustration.svg";
import illustration3 from "../assets/lady-choosing-illustration.svg";
import illustration4 from "../assets/lady-shopping-online-illustration.svg";
import { BrowserView } from "react-device-detect";
import errorCode from "../Error/errorCode";
import { useRouter } from "next/navigation";
import {cookies} from "next/headers";
export default function Login():ReactNode{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("") 
    const[signInButtonPressed,setSignInButtonPressed] = useState(false)
    return(
        <div className="w-full h-full bg-primary flex items-center justify-center relative">
            <SignUpContainer signInButtonPressed={signInButtonPressed} setSignInButtonPressed={setSignInButtonPressed}  email={email} setEmail = {setEmail} password={password} setPassword = {setPassword}/>
        
       
            
                
                <Image className="absolute  hidden lg:block top-[30%] right-0" src={illustration1} alt="illustration1" height={300}/>
                <Image className="absolute  hidden lg:block right-[20%] bottom-0" src={illustration2} alt="illustration2" height={300}/>
                <Image className="absolute  hidden lg:block left-[20%] top-0" src={illustration3} alt="illustration3" height={250}/>
                <Image className="absolute  hidden lg:block left-0 top-[25%]" src={illustration4} alt="illustration4" height={500}/>
            
                <AdminText/>
        </div>
    )
}
function SignUpContainer({signInButtonPressed,setSignInButtonPressed,password,email,setPassword,setEmail}:{signInButtonPressed:boolean,setSignInButtonPressed:Function,password:string,email:string,setPassword:Function,setEmail:Function}):ReactNode{

    return(
        <div className="z-[2] self-center  bg-secondary h-fit   w-fit min-w-[290px] max-w-[401px]  md:w-[40%] lg:w-[25%] rounded-lg flex flex-col p-4 mx-20">

<Title text="Login"/>
<Discription text="Unleash exclusive collections, personalized recommendations, and early access to the best shoe deals."/>
      <div className="w-full h-fit mt-9 flex flex-col gap-5 ">
          <InputBox setData={setEmail} type="email" icon={EmailSrc} alt="email" placeholder="Enter your email"/>
          <InputBox setData={setPassword} type="password" icon={PasswordSrc} alt="password" placeholder="Enter your password"/>
<SignUpButton email={email} password={password}  signInButtonPressed={signInButtonPressed} setSignInButtonPressed={setSignInButtonPressed}/>

      </div>
      <LoginText/>
      
            </div>
    )
}
function Title({text}:{text:string}):ReactNode{
    return(
        <div className="w-full flex items-center justify-center mt-14 lg:mt-8">
            <p className="text-3xl font-bold ">{text}</p>
        </div>
    )
}
function Discription({text}:{text:string}):ReactNode{
   return(
    <div className="mt-[1.31rem] flex text-center">
        <p className="text-[#848484] text-[0.8rem] font-normal">{text}</p>
    </div>
   ) 
}
function InputBox({type,icon,alt,placeholder,setData}:{alt:string,type:string,icon:string,placeholder:string,setData:Function}):ReactNode{
    return(
        <div className="self-center w-[85%] h-fit flex items-center justify-center  border-2 border-[#848484] rounded-[0.3rem] py-3 pl-[0.88rem] gap-2">
 <Image className="self-start" src={icon} width={16} alt={alt}/>       
            <input type={type} className="flex-1 outline-none h-fit w-max text-[0.7rem] font-medium bg-transparent" placeholder={placeholder} onChange={(e)=>setData(e.target.value)}/>
        </div>
    )
}

function SignUpButton({signInButtonPressed,setSignInButtonPressed,email,password}:{signInButtonPressed:boolean,setSignInButtonPressed:Function,email:string,password:string}):ReactNode{
  const router = useRouter()
    useEffect(()=>{
if(signInButtonPressed===true){
  router.push("/main")
}
    },[signInButtonPressed])
    return(
        <div className="w-[80%] self-center h-fit flex items-center justify-center">
<button onClick={()=>SignUpMethod(setSignInButtonPressed,email,password)} className=" w-full bg-primary text-secondary rounded-2xl  py-[0.8rem] text-[0.775rem] font-bold ">Sign Up</button>
        </div>
    )
}
function LoginText():ReactNode{
    const router = useRouter()
    return(
        <div className="w-full flex items-center justify-center mt-4">
            <p className="text-[0.775rem] text-[#848484] font-normal ">Don't have a account ? <span className=" font-bold text-black cursor-pointer" onClick={()=>router.push("/SignUp")} >Register</span></p>
        </div>
    )
}
async function SignUpMethod(setSignInButtonPressed:Function,email:string,password:string,){
if(email ==="" || email===null ||password===""||password===null){
    alert("Please fill the information properly")
    return
}

let response = await    fetch("api/user_login",{
        method:"POST",
        mode:"cors",
        cache:"no-cache",
        credentials:"same-origin",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email:email,password:password})

    });
    let resJson = JSON.parse(await response.text())
    if(await resJson.code =='200'){

        

        sessionStorage.setItem("name",resJson.name)
        sessionStorage.setItem("email",email)
        setSignInButtonPressed(true);
        return
    }
    alert("Email not found")
return
}
function AdminText():ReactNode{
    const router = useRouter()
    return(
        <div className="w-full p-5 flex items-center  justify-center mt-4 fixed bottom-0 ">
            <p className="text-[0.775rem] text-[#848484] font-normal ">Are you admin? <span className=" font-bold  cursor-pointer text-white" onClick={()=>router.push("/admin/login")} >Login</span></p>
        </div>
    )
}