import { useSelector, useDispatch } from 'react-redux'
import { clear, close, set } from '../redux/slices/sectionSlice'
import { section } from '../constants/system'

const usePageSection = () => {
  const pageSection = useSelector((state) => state.section.pageSection)
  const dispatch = useDispatch()

  const accountSection = {
    set: (id) => {
      dispatch(
        set({
          type: section.account,
          isActive: true,
          data: { id }
        })
      )
    },
    close: () => {
      dispatch(close())
    },
    clear: () => {
      dispatch(clear())
    }
  }

  return {
    state: pageSection,
    accountSection
  }
}

export default usePageSection
