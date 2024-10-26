import { useCallback, useEffect, useState } from 'react'
import { PageHeader, Pagination } from '../../../components/_exports'
import Loader1 from '../../../components/common/Loader/Loader1/Loader1'
import ProfileItem from '../../../components/aiProfilesPage/AiProfileItem/AiProfileItem'
import CreateIcon from '../../../components/common/Icon/CreateIcon1/CreateIcon1'
import CreateAIProfileModal from '../../../components/aiProfilesPage/Modals/CreateAIProfileModal/CreateAIProfileModal'
import api from '../../../api/api'
import './AIProfiles.scss'

const pageSize = 15

function AIProfiles() {
  const [isLoading, setIsLoading] = useState(false)
  const [profiles, setProfiles] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pagesCount, setPagesCount] = useState(0)
  const [isActiveCreateAIProfileModal, setIsActiveCreateAIProfileModal] = useState(false)

  const loadAIProfiles = useCallback(async () => {
    try {
      setIsLoading(true)

      const { data, response } = await api.aiProfile.getAll({
        pageNumber,
        pageSize
      })

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data || response?.data?.errors) {
        throw new Error('Something went wrong')
      }

      setProfiles(data.items || [])
      setPagesCount(data.meta?.pagesCount || 1)
    } catch (err) {
      // temp
    } finally {
      setIsLoading(false)
    }
  }, [pageNumber])

  useEffect(() => {
    loadAIProfiles()
  }, [loadAIProfiles])

  const onNext = () => {
    if (pageNumber + 1 < pagesCount) {
      setPageNumber((number) => number + 1)
    }
  }

  const onPrev = () => {
    if (pageNumber > 0) {
      setPageNumber((number) => number - 1)
    }
  }

  return (
    <div className="p-ai-profiles">
      <CreateAIProfileModal
        setIsActive={setIsActiveCreateAIProfileModal}
        isActive={isActiveCreateAIProfileModal}
        refreshProfiles={loadAIProfiles}
      />

      <PageHeader className="ai-profiles-header" text="AI Profiles">
        <div
          className="header-item new-profile-item"
          onClick={() => setIsActiveCreateAIProfileModal(true)}
          role="presentation"
        >
          <CreateIcon />
        </div>
      </PageHeader>

      <div className="ai-profiles-content">
        {isLoading ? (
          <Loader1 className="loader" />
        ) : (
          <table className="profiles-table">
            <thead className="table-head">
              <tr>
                <th width="6%" aria-label="image">
                  {}
                </th>
                <th width="5%">Id</th>
                <th width="10%">Integration</th>
                <th width="10%">Model</th>
                <th width="10%">Template</th>
                <th width="10%">Temperature</th>
                <th width="10%">Api key</th>
                <th width="5%" aria-label="tools">
                  {}
                </th>
              </tr>
            </thead>

            <tbody className="table-body">
              {profiles.map((profile) => (
                <ProfileItem
                  key={profile.id}
                  profileInfo={profile}
                  refreshProfiles={loadAIProfiles}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination
        className="ai-profiles-pagination"
        pageNumber={pageNumber}
        pagesCount={pagesCount}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  )
}

export default AIProfiles
