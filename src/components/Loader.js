import React from 'react'
import s from '../styles/Loader.module.css'

export default function () {
  return (
    <div className={s.spinnerContainer}>
        <div className={s.spinner}></div>
    </div>
  )
}
