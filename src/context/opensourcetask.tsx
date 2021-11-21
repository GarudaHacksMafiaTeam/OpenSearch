import React from 'react';

const OpenSourceTaskContext = React.createContext(undefined)

export const GET_OPEN_SOURCE = 'get task'
export const UPDATE_OPEN_SOURCE = 'update task'

const openSourceTaskReducers = (state, action) => {
  switch (action.type) {
    case GET_OPEN_SOURCE: {
      return { ...state }
    }
    case UPDATE_OPEN_SOURCE: {
      const {
        name,
        description,
        id
      } = action
      return { ...state, name, description, id }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const OpenSourceTaskProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(openSourceTaskReducers, {
    name: "",
    description: "",
    id: null,
  })

  const value = { state, dispatch }

  return <OpenSourceTaskContext.Provider value={value}>
    {children}
  </ OpenSourceTaskContext.Provider>
}

const useOpenSourceTask = () => {
  const context = React.useContext(OpenSourceTaskContext)
  if (!context) {
    throw new Error("useOpenSourceTask must be used within a OpenSourceProvider")
  }
  return context
}

export { OpenSourceTaskProvider, useOpenSourceTask }

