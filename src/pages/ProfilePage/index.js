import React, { useEffect } from 'react'
import ContentContainer from "../../components/utilComponents/ContentContainer"
import NewsContainer from "../../components/utilComponents/NewsContainer"
import Profile from "../../components/profilePageComponents/profile"
// import TabsContainer from '../../components/profilePageComponents/TabsContainer'
import { useDispatch } from 'react-redux'
import { getUserAsync } from '../../slices/userSlice'

function ProfilePage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserAsync())
  }, [dispatch])

  return (

    <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2" >
      <ContentContainer className="keep-scrolling overflow-auto flex-col space-y-3 bg-white py-5 px-3 snap snap-y snap-mandatory">

        <Profile />

        {/* <TabsContainer /> */}


      </ContentContainer>
      <NewsContainer className="px-2" >
        <div className="h-48 p-4 rounded shadow-lg bg-white dark:bg-gray-800">
        </div>
      </NewsContainer>
    </div>
  )
}

export default ProfilePage;
