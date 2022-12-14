import {React, useEffect, useState} from 'react'
import { collection, getDocs, getFirestore, query, where }from 'firebase/firestore'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'

function ItemListContainer( {gretting} ) {
  const {categoryId} = useParams()
  const [dataProducts, setDataProducts] = useState(null) 
  useEffect(() => {
    const data = getFirestore()
    const productsCollection = collection(data, 'items')
    if(categoryId){
      const productsCollectionFilter = query(productsCollection, where('description', '==', categoryId))
      getDocs(productsCollectionFilter).then(res => {
        setDataProducts(res.docs.map(prod => ({id:prod.id, ...prod.data()})))
      })}
    else{
      getDocs(productsCollection).then(res => {
        setDataProducts(res.docs.map(prod => ({id:prod.id, ...prod.data()})))
      })}
    }, [categoryId])
    if(dataProducts === null){
      return (
        <main className='loading__items d-flex justify-content-center align-items-center'>
            <p className='text-uppercase'>Cargando...</p>
        </main>
      )
    }
  return (
    <main className='bg-dark py-5'>
      {gretting}
      <ItemList list={dataProducts}/>
    </main>
  )
}

export default ItemListContainer

