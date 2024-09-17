import React, {useEffect, useState} from 'react'
import { View } from 'react-native'
import {getCitas} from '../api'
import CitasList from '../components/citasList'

const CitasScreen = () => { 

const [citas, setCitas] = useState([])

const loadCitas = async () => {
    const data = await getCitas()
    setCitas(data)
}

    useEffect(() =>  {
        loadCitas()
    }, [])

  return (
    <View>
        <CitasList citas={citas} />
    </View>
  )
}

export default CitasScreen