"use client"


import { useState } from 'react'

const isContainNumber = (password) => {
  for (let i = 0; i < password.length; i++) {
    if (password[i].charCodeAt(0) >= 48 && password[i].charCodeAt(0) <= 57) {
      return 1;
    }
  }
  return 0;
};

const isSpecialCharacter = (password) => {
  for (let i = 0; i < password.length; i++) {
    if (
      (password[i].charCodeAt(0) >= 33 && password[i].charCodeAt(0) <= 47) ||
      (password[i].charCodeAt(0) >= 58 && password[i].charCodeAt(0) <= 64) ||
      (password[i].charCodeAt(0) >= 91 && password[i].charCodeAt(0) <= 96) ||
      (password[i].charCodeAt(0) >= 123 && password[i].charCodeAt(0) <= 126)
    ) {
      return 1;
    }
  }
  return 0;
};

const isUpperCase = (password) => {
  for (let i = 0; i < password.length; i++) {
    if (password[i].charCodeAt(0) >= 65 && password[i].charCodeAt(0) <= 90) {
      return 1;
    }
  }
  return 0;
};

const isLengthThan8 = (password) => {
  return password.length >= 8 ? 1 : 0;
};

const calculateStrength = (password) => {
  let strength = 0;

  strength += isContainNumber(password);
  strength += isSpecialCharacter(password);
  strength += isUpperCase(password);
  strength += isLengthThan8(password);

  return strength;
}


export default function Home() {
  const [password, setPassword] = useState("");
  const [isHidden, setIsHidden] = useState(true)
  const [userName, setUserName] = useState("");
  const [isLook, setIsLook] = useState(false)


  return (
    <div className='w-full h-screen bg-white m-auto max-w-[500px]'>
      <div className='flex flex-col h-[1000px] items-center justify-center gap-5'>
        <p className='text-2xl text-blue-500'>Welcome</p>
        <input
          type={"text"}
          value={userName}
          placeholder='     Username'
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          className='w-[280px] h-[50px] rounded-3xl relative border-4 border-cyan-400'
        />
        <UsernameStrength string={estimateStrength(userName)}/>
        <input
          type={isHidden ? "password" : "text"}
          value={password}
          placeholder='     Password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className='w-[280px] h-[50px] rounded-3xl relative border-4 border-cyan-400'
        />
        <button className='absolute mt-10 ml-52 text-teal-400 bg-slate-800 rounded-xl p-0.5' onClick={() => {
          setIsHidden(!isHidden);
        }}>{isHidden ? 'Show' : 'Hide'}</button>
        <PasswordStrength strength={calculateStrength(password)} />
        <button className='flex mt-10 bg-blue-500 w-[300px] justify-center p-1 rounded-2xl text-white'>Log in</button>
      </div >
    </div>
  );
};

const colorMap = {
  0: "black",
  1: "red",
  2: "#FFBA08",
  3: "#1EAE98",
  4: "#10B981",
}



const PasswordStrength = (props) => {
  return (
    <div className='flex flex-col w-[200px] gap-5 justify-center items-center text-zinc-900 font-sans text-2xl'>
      <div className='flex gap-5'>
        {["", "", "", "",].map((_, index) => (
          <div
            key={index}
            className='flex w-[100px] h-[20px] gap-5 rounded-xl border-lime-400 border-2'
            style={{
              backgroundColor:
                index < props.strength ? colorMap[props.strength] : "#E5E7EB",
            }}
          ></div>
        ))}
      </div>
    </div >
  )
};

const isTextContain = (userName) => {
  return userName.length >= 10 ? 1 : 0;
}

const estimateStrength = (userName) => {
  let string = 0;

  string += isTextContain(userName);

  return string;
};

const useMap = {
  1: "red",
};

const UsernameStrength = (props) => {
  return (
    <div>
      <p 
       style={{
        backgroundColor:
        props.string ? useMap[props.string] : ""
      }}>Username is required</p>
    </div>
  )
};
