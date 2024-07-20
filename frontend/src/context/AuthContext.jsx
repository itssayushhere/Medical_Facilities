import { createContext, useEffect, useReducer, useMemo } from "react";

// Initial state for the context, which will be used by the reducer
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Parse user from localStorage if exists
  role: localStorage.getItem("role") || null, // Get role from localStorage or set to null if not found
  token: localStorage.getItem("token") || null, // Get token from localStorage or set to null if not found
};

// Create the authentication context with the initial state
export const authContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null, // Clear user data
        role: null, // Clear role
        token: null, // Clear token
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user, // Set user data from action payload
        token: action.payload.token, // Set token from action payload
        role: action.payload.role, // Set role from action payload
      };

    case "LOGOUT":
      return {
        user: null, // Clear user data
        role: null, // Clear role
        token: null, // Clear token
      };

    default:
      return state; // Return current state if action type is not recognized
  }
};

// Provider component to wrap the application and provide context value
export const AuthContextProvider = ({ children }) => {
  // Use useReducer hook to manage state with authReducer and initialState
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user: state.user,
    token: state.token,
    role: state.role,
    dispatch,
  }), [state]);

  // useEffect hook to store the state changes in localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user)); // Store user data in localStorage
    localStorage.setItem("token", state.token); // Store token in localStorage
    localStorage.setItem("role", state.role); // Store role in localStorage
  }, [state.user, state.token, state.role]); // Effect runs whenever user, token, or role changes

  return (
    // Provide the context value to child components
    <authContext.Provider value={contextValue}>
      {children} {/* Render child components */}
    </authContext.Provider>
  );
};
