import React from 'react'
import { Route ,Routes} from 'react-router'
import WelcomePage from './components/user/WelcomePage'
import Layouts from './components/user/Layouts'


function App() {
  return (
      <>
      <Routes>
       <Route
          path="/"
          element={
            <>
              <Layouts>
                <WelcomePage />
              </Layouts>
            </>
          }
        />
        </Routes>
      </>
  )
}

export default App