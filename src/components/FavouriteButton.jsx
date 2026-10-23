import { useDispatch, useSelector } from 'react-redux'
import {
  selectIsFavourite,
  toggleFavourite,
} from '../store/favouritesSlice/slice'
import { showToast } from '../store/toastSlice/slice'
import { HeartIcon } from './icons'

function FavouriteButton({ productId, className = '' }) {
  const dispatch = useDispatch()
  const isFav = useSelector(selectIsFavourite(productId))

  return (
    <button
      type="button"
      className={`fav-btn ${isFav ? 'fav-btn-active' : ''} ${className}`}
      aria-label={isFav ? 'Remove from favourites' : 'Add to favourites'}
      aria-pressed={isFav}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(toggleFavourite(productId))
        dispatch(
          showToast(isFav ? 'Removed from favourites' : 'Saved to favourites')
        )
      }}
    >
      <HeartIcon size={18} filled={isFav} />
    </button>
  )
}

export default FavouriteButton
