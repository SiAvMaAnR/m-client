import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import api from '../../../../../api/api'
import ProfileItem from './ProfileItem/ProfileItem'
import './CreateAIChannelStep1.scss'

const defaultPageSize = 15

function CreateAIChannelStep1({ debouncedSearch, setProfileId }) {
  const pageNumberRef = useRef(0)
  const [pagesCount, setPagesCount] = useState(0)
  const [isProfilesLoading, setIsProfilesLoading] = useState(false)
  const [profiles, setProfiles] = useState([])
  const [selectedProfileId, setSelectedProfileId] = useState(null)

  useEffect(() => {
    setProfileId(selectedProfileId)
  }, [setProfileId, selectedProfileId])

  const loadProfiles = async ({ searchField, pageNumber, pageSize }) => {
    try {
      setIsProfilesLoading(true)

      const { data, response } = await api.aiProfile.getAll({
        pageNumber,
        pageSize,
        searchField
      })

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data || response?.data?.errors) {
        throw new Error('Something went wrong')
      }

      if (pageNumber === 0) {
        setProfiles(data.items || [])
      } else {
        setProfiles((prevProfiles) => [...prevProfiles, ...(data.items || [])])
      }

      setPagesCount(data.meta.pagesCount)
    } catch (err) {
      // temp
    } finally {
      setIsProfilesLoading(false)
    }
  }

  const resetPage = () => {
    pageNumberRef.current = 0
  }

  const refreshProfiles = useCallback((search) => {
    resetPage()

    loadProfiles({
      pageNumber: pageNumberRef.current,
      pageSize: defaultPageSize,
      searchField: search
    })
  }, [])

  useEffect(() => {
    refreshProfiles(debouncedSearch)
  }, [debouncedSearch, refreshProfiles])

  const scrollHandler = (event) => {
    if (!isProfilesLoading && pageNumberRef.current < pagesCount - 1) {
      const { scrollHeight, scrollTop } = event.target
      const targetHeight = event.target.getBoundingClientRect().height

      const isNeedUpdate = scrollHeight - (scrollTop + targetHeight) < 60

      if (isNeedUpdate) {
        pageNumberRef.current += 1
        loadProfiles({
          pageNumber: pageNumberRef.current,
          pageSize: defaultPageSize,
          searchField: debouncedSearch
        })
      }
    }
  }

  return (
    <div className="c-create-ai-channel-step-1" onScroll={scrollHandler}>
      {profiles.map((profile) => (
        <ProfileItem
          className="profile-item"
          key={profile.id}
          profileInfo={profile}
          isSelected={selectedProfileId === profile.id}
          onClick={() => setSelectedProfileId(profile.id)}
        />
      ))}
    </div>
  )
}

CreateAIChannelStep1.propTypes = {
  debouncedSearch: PropTypes.string,
  setProfileId: PropTypes.func
}

export default CreateAIChannelStep1
