import React from 'react';

const OpenSourceContext = React.createContext(undefined)

export const GET_OPEN_SOURCE = 'get opensource'
export const UPDATE_OPEN_SOURCE = 'update opensource'

const openSourceReducers = (state, action) => {
  switch (action.type) {
    case GET_OPEN_SOURCE: {
      return { ...state }
    }
    case UPDATE_OPEN_SOURCE: {
      const {
        name,
        image,
        description,
        id
      } = action
      console.log(action)
      return { ...state, name, image, description, id }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const OpenSourceProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(openSourceReducers, {
    name: "",
    image: "",
    description: "",
    id: null,
  })

  const value = { state, dispatch }

  return <OpenSourceContext.Provider value={value}>
    {children}
  </ OpenSourceContext.Provider>
}

const useOpenSource = () => {
  const context = React.useContext(OpenSourceContext)
  if (!context) {
    throw new Error("useOpenSource must be used within a OpenSourceProvider")
  }
  return context
}

export { OpenSourceProvider, useOpenSource }
