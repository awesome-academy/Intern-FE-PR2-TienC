import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthenticated } from 'src/hooks/useAuthenticated'
import { getCartPurchase } from 'src/pages/DetailProduct/detailproduct.slice'

export default function Authorization() {
  const dispatch = useDispatch()
  const authenticated = useAuthenticated()

  useEffect(() => {
    if (authenticated) {
      dispatch(getCartPurchase())
    }
  }, [dispatch, authenticated])
  return null
}
