// This component checks if the user is authenticated before rendering the children components.
// If the user is not authenticated, it redirects them to the login page.
// If the authentication status is still being checked, it shows a loading spinner.
// This is useful for protecting routes that require authentication, ensuring that only logged-in users can access certain pages.
// Usage example:
// <ProtectedRoute>
//   <YourProtectedComponent />
// </ProtectedRoute>
// This will render YourProtectedComponent only if the user is authenticated, otherwise it redirects to the login page.
// This component is typically used in the App.jsx file to wrap around routes that require authentication, ensuring that only authenticated users can access those routes.
// It helps maintain a secure and user-friendly navigation experience in the application.
// It is a common pattern in React applications to protect routes that should only be accessible to authenticated users.
// It can be used in conjunction with a global state management solution like Zustand to manage the authentication state across the application.
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
