import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HoneyTrap() {
    useEffect(()=>{
        window.location.href = "/app"
    })
  return (
    <div>Loading...</div>
  )
}
