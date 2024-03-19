import React from 'react'
import Transaltor from '../componenets/Transaltor'
import { MdOutlineTranslate } from "react-icons/md";
function Screen() {
  return (
    <>
    <h1 className='heading'>Text Translator <MdOutlineTranslate /></h1>
    <Transaltor/>
    </>
  )
}

export default Screen