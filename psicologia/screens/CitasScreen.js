import React, {useEffect, useState} from 'react'
import { View, Text, FlatList } from 'react-native'
import {getCitas} from '../api'

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
      <FlatList 
        data={citas}         
        renderItem = {({ item }) => {
            return <Text>{item.tipo_cita}</Text>; }}>
      </FlatList>
    </View>
  )
}

export default CitasScreen