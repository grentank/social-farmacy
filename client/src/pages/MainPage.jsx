import React from 'react'
import MainCard from '../components/MainCard/MainCard'
import FeedbackCard from '../components/MainCard/FeedbackCard'
import Licenze from '../components/MainCard/Licenze'
import InfoProductIngener from '../components/MainCard/InfoProductIngener'




export default function MainPage() {
  return (
     <>
      <MainCard/>
      <Licenze/>
      <FeedbackCard/>
      <InfoProductIngener/>
    </>
  )
}

