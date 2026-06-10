import React from 'react'
import apiClient from '../config/apiClient.js'

function getTemplate() {

    React.useEffect(()=>{
        ;(async(endpoint)=>{
            const response = await apiClient.get(endpoint)
        })()

    },[])

  return (
    <div>
      
    </div>
  )
}

export default getTemplate
