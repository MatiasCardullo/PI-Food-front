import React from 'react'
import { Link } from 'react-router-dom'
import s from '../styles/Landing.module.css'

export default function LandingPage() {
  return (
    <div className={s.landingContainer}>
        <h1 className={s.landingTitle}>Recipe's Ideas</h1>
        <div className={s.text}>
            <p>Welcome!</p>
        </div>

    <div className={s.buttonContainer}>
    <Link to= '/recipes'>
    <button className={s.button}>Enter</button>
    </Link>
    </div>
    </div>
  )
}
