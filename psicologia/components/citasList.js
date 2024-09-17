import { Text, FlatList } from 'react-native'
import React from 'react'

const CitasList = ({ citas }) => {
  return (
    <FlatList 
    data={citas}  
    keyExtractor={(item) => item.id_cita}       
    renderItem = {({ item }) => {
        return <Text>{item.tipo_cita}</Text>; }}>
  </FlatList>
  )
}

export default CitasList