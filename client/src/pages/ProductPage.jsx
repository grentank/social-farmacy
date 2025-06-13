import React from 'react'
import Cards from '../components/Card/Cards'
import SaleCard from '../components/SaleCard/SaleCard'

export default function ProductPage({currentUser}) {

  
  return (
    <>
<Cards currentUser={currentUser}/>
    </>
  )
}
