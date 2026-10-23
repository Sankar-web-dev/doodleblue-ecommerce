import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { addToCart } from '../store/cartSlice/slice'
import { selectUser } from '../store/authSlice/slice'

// Returns an add(product, qty) function that only works when logged in;
// guests are sent to the login page instead.
export function useAddToCart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)

  return (product, qty = 1) => {
    if (!user) {
      navigate('/login')
      return
    }
    dispatch(addToCart({ product, qty }))
  }
}
