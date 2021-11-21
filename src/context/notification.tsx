import React from 'react';

const NotificationContext = React.createContext(undefined)

const notificationReducers = (state, action) => {
  switch (action.type) {
    case 'test': {
      return { ...state }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(notificationReducers, { state: "initial state value" })

  const value = { state, dispatch }

  return <NotificationContext.Provider value={value}>
    {children}
  </ NotificationContext.Provider>
}

const useNotification = () => {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

export { NotificationProvider, useNotification }
