"use client"


import styles from './page.module.css'
import { useState } from 'react'

const isContainNumber = (password) => {
  for (let i = 0; i < password.length; i++) {
    if (password[i].charCodeAt(0) >= 48 && password[i].charCodeAt(0) <= 57) 
    {
      return 1;
    }
  }
  return 0;
};

const isSpecialCharacter = (password) => {
  for (let i = 0; i < password.length; i++) {
    if(
      (password[i].charCodeAt(0) >= 33 && password[i].charCodeAt(0) <= 47) ||
      (password[i].charCodeAt(0) >= 58 && password[i].charCodeAt(0) <= 64) ||
      (password[i].charCodeAt(0) >= 91 && password[i].charCodeAt(0) <= 96) ||
      (password[i].charCodeAt(0) >= 123 && password[i].charCodeAt(0) <= 126)
      ) 
      {
        return 1;
      }
  }
  return 0;
};

const isUpperCase = (password) => {
  for (let i = 0; i < password.length; i++) {
    if (password[i].charCodeAt(0) >= 65 && password[i].charCodeAt(0) <= 90)
    {
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

  return (
  <div className={styles.container}>
    <input
      value={password}
      onChange={(e) => {
        setPassword(e.target.value);
      }}
      className={styles.input}/>
      <PasswordStrength strength={calculateStrength(password)}/>
  </div>
  );
}


const textMap = {
  0: "Weak",
  1: "Arai gaigu",
  2: "Bolomjiin",
  3: "Dajgui shuu",
  4: "Bolsoon"
}

const colorMap = {
  0: "black",
  1: "#EA1111",
  2: "#FFBA08",
  3: "#1EAE98",
  4: "#10B981",
}



const PasswordStrength = (props) => {
  return (
    <div className={styles.chip}> 
       <div className={styles.strength}>
        {new Array(4).fill("").map((_, index) => (
          <div 
          key={index}
          className={styles.render}
          style={{
            backgroundColor:
            index < props.strength ? colorMap[props.strength] : "#E5E7EB"
          }}
          ></div>   
        ))}
       </div>

       <p>{textMap[props.strength]}</p>
    </div>
  )
}
