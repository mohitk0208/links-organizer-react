import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoutingComp from './router';
import { manageLoginAsync, selectIsLoggedIn } from './slices/authSlice';
import Sidebar from './components/Sidebar';
import Main from './components/utilComponents/Main';
import Header from './components/Header';
import { BrowserRouter as Router } from "react-router-dom"
import { dequeueNotification, selectCurrentObject } from "./slices/globalNotificationSlice"
import Alert from "./components/utilComponents/Alert"


function App() {

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()

  const alertCurrentObject = useSelector(selectCurrentObject)

  useEffect(() => {

    dispatch(manageLoginAsync())

  }, [dispatch])


  return (
    <Router>

      <Alert
        message={alertCurrentObject?.msg}
        autoClose={true}
        duration={alertCurrentObject?.duration}
        onClose={() => dispatch(dequeueNotification())}
        variant={alertCurrentObject?.type}
        placement="right-end"
        corners="very-light-curve"
      />

      {isLoggedIn ? (
        <div className="flex bg-gray-100 dark:bg-gray-900 transition duration-500" >
          <Sidebar />


          <Main>
            <Header />
            <RoutingComp />
          </Main>

        </div>
      ) : (
        <RoutingComp />
      )}


    </Router>

  )

}

export default App;
