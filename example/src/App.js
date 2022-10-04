import React, { Fragment, useMemo } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

import { Breadcrumb, useCrumb, useTrail, useRootCrumb } from 'react-bread-crumb'

const Home = () => {
  const crumb = useMemo(() => {
    return {
      text: "home",
      path: "/",
    }
  }, [])
  useRootCrumb(crumb)

  return (
    <div>
      <Link to="/page1">page1</Link>
      <Link to="/page2">page2</Link>
      <Link to="/page3">page3</Link>
    </div>
  )
}

const Page1 = () => {
  const crumb = useMemo(() => {
    return {
      text: "page 1",
      path: "/page1",
    }
  }, [])
  useCrumb(crumb, "page 1")

  return (
    <div>
      Page 1
      <Link to="/page2">page2</Link>
      <Link to="/page3">page3</Link>
    </div>
  )
}

const Page2 = () => {
  const crumb = useMemo(() => {
    return {
      text: "page 2",
      path: "/page2",
    }
  }, [])
  useCrumb(crumb, "page 2")

  return (
    <div>
      Page 2
    </div>
  )
}

const Page3 = () => {
  const crumb = useMemo(() => {
    return {
      text: "page 3",
      path: "/page3",
    }
  }, [])
  useCrumb(crumb, "page 3")

  return (
    <div>
      Page 3
    </div>
  )
}

const BreadCrumb = () => {
  const trail = useTrail()

  return (
    <>
      <div>
        {
          trail.map((crumb, index) => {
            return (
              <Fragment key={index}>
                { index !== 0 && <span>{">"}</span>}
                {
                  <Link to={crumb.path}>{crumb.text}</Link>
                }
              </Fragment>
            )
          })
        }
      </div>
      <Outlet />
    </>
  )
}

const App = () => {
  return <React.StrictMode>
    <Breadcrumb>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<BreadCrumb />}>
            <Route index element={<Home />} />
            <Route path="page1" element={<Page1 />}/>
            <Route path="page2" element={<Page2 />}/>
            <Route path="page3" element={<Page3 />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Breadcrumb>
  </React.StrictMode>
}

export default App
