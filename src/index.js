import React, { createContext, useCallback, useContext, useEffect, useId, useMemo, useReducer, useRef, useState } from 'react'

const breadcrumbContext = createContext([])

const ADD_CRUMB = Symbol()
const RESET_TRAIL = Symbol()

export const BreadcrumbProvider = ({ children, trail: initial_trail = [] }) => {
  const [ count, setCount ] = useState(0)
  const [ trail, dispatch ] = useReducer((trail, { action, crumb }) => {
    switch(action){
      case ADD_CRUMB:
        const index = crumb.id && trail.findIndex(({ id }) => {
          return id && id === crumb.id
        })
        if(index === -1) {
          return [ ...trail, crumb ]
        }
        return trail.slice(0, index + 1)
      case RESET_TRAIL:
        return [ crumb ]
      default:
        return trail
    }
  }, initial_trail)

  const addCrumb = useCallback((id, crumb) => {
    dispatch({
      action: ADD_CRUMB,
      crumb: {
        id, crumb,
      },
    })
    setCount((count) => count + 1)
  }, [dispatch])

  const resetTrail = useCallback((crumb) => {
    dispatch({
      action: RESET_TRAIL,
      crumb: { crumb, },
    })
    setCount((count) => count + 1)
  }, [dispatch])

  const unloadCrumb = useCallback(() => {
    setCount((count) => count - 1)
  }, [])

  const trailView = useMemo(() => {
    return trail.map(({ crumb }) => crumb)
  }, [trail])
  
  return (
    <breadcrumbContext.Provider value={
      {
        trail,
        trailView,
        addCrumb,
        resetTrail,
        unloadCrumb,
        count,
      }
    }>
      {children}
    </breadcrumbContext.Provider>
  )
}
export const useRootCrumb = (crumb) => {
  const { resetTrail, unloadCrumb, count } = useContext(breadcrumbContext)
  
  const ref = useRef(crumb)
  const initialCrumb = ref.current === crumb

  useEffect(() => {
    if (!initialCrumb)
      console.trace("Crumb changing during lifetime of object, make sure to memoize it")
  }, [initialCrumb])

  useEffect(() => {
    if (count > 1)
      console.trace("Multiple crumb locations being used at one time")
  }, [count])

  useEffect(() => {
    resetTrail(ref.current)
    return unloadCrumb
  }, [resetTrail, ref.current, unloadCrumb])
}
export const RootCrumb = (crumb) => {
  useCrumb(crumb)
  return <></>
}

export const useCrumb = (crumb, id) => {
  const { addCrumb, unloadCrumb, count } = useContext(breadcrumbContext)

  const ref = useRef(crumb)
  const initialCrumb = ref.current === crumb

  useEffect(() => {
    if (!initialCrumb)
      console.trace("Crumb changing during lifetime of object, make sure to memoize it")
  }, [initialCrumb])

  useEffect(() => {
    if(count > 1)
      console.trace("Multiple crumb locations being used at one time")
  }, [count])

  useEffect(() => {
    addCrumb(id, ref.current)
    return unloadCrumb
  }, [addCrumb, id, ref.current, unloadCrumb])
}
export const Crumb = (crumb, id) => {
  useCrumb(crumb, id)
  return <></>
}

export const useTrailView = () => {
  const { trailView } = useContext(breadcrumbContext)
  return trailView
}

export const useTrail = () => {
  const { trail } = useContext(breadcrumbContext)
  return trail
}