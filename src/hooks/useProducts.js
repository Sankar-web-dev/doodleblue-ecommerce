import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  selectAllProducts,
  selectProductsStatus,
  selectProductsError,
} from '../store/productsSlice/slice'

export function useProducts() {
  const dispatch = useDispatch()
  const items = useSelector(selectAllProducts)
  const status = useSelector(selectProductsStatus)
  const error = useSelector(selectProductsError)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  return { items, status, error }
}
