import { createContext, ReactNode, useContext, useState, useEffect, useCallback } from "react";
import { User, LoginUser, RegisterUser } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "../lib/queryClient";
import { auth, firebaseSignOut } from "@/lib/firebase";

// Create the auth context
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginUser) => Promise<boolean>;
  register: (userData: RegisterUser) => Promise<boolean>;
  logout: () => Promise<boolean>;
  isAuthenticating: boolean;
  handleFirebaseAuth: (firebaseUser: any) => Promise<boolean>;
};

// Create the auth context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Create the auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [lastAuthToastTime, setLastAuthToastTime] = useState(0);
  const AUTH_TOAST_COOLDOWN = 3000; // 3 seconds between auth toasts
  
  // Rate limiter for API requests
  const [lastLoginAttemptTime, setLastLoginAttemptTime] = useState(0);
  const LOGIN_REQUEST_COOLDOWN = 3000; // 3 seconds between login attempts

  // Fetch the current user
  const fetchCurrentUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/user');
      
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else if (res.status !== 401) { // 401 is expected when not logged in
        setError('Failed to fetch user data');
      }
    } catch (err) {
      setError('Network error while fetching user data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch user on mount
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // Login function
  const login = async (credentials: LoginUser): Promise<boolean> => {
    try {
      // Rate limit check
      const now = Date.now();
      if (now - lastLoginAttemptTime < LOGIN_REQUEST_COOLDOWN) {
        console.log(`Rate limiting login requests. Please wait ${Math.ceil((LOGIN_REQUEST_COOLDOWN - (now - lastLoginAttemptTime))/1000)} seconds before trying again.`);
        toast({
          title: "Too many attempts",
          description: "Please wait a few seconds before trying again.",
          variant: "destructive",
        });
        return false;
      }
      
      // Set rate limit timestamp
      setLastLoginAttemptTime(now);
      
      setIsAuthenticating(true);
      setError(null);
      
      console.log("Starting login process...");
      
      // First, try the enhanced apiRequest which has retry logic
      let res;
      try {
        res = await apiRequest('POST', '/api/login', credentials);
      } catch (apiError) {
        console.warn("Initial login request failed, trying alternative approach...", apiError);
        
        // As a fallback, try a direct fetch with different options
        res = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          },
          body: JSON.stringify(credentials),
          credentials: 'include'
        });
      }
      
      // Process the response
      if (!res.ok) {
        // DISABLED: Mock user feature removed to prevent authentication banner issues
        
        // Regular error handling
        let errorMessage = 'Login failed';
        
        try {
          // Try to parse as JSON first
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || 'Login failed';
        } catch (jsonError) {
          // If not JSON, try text
          try {
            const errorText = await res.text();
            errorMessage = errorText || 'Login failed';
          } catch (textError) {
            // If all else fails, use status text
            errorMessage = `Login failed: ${res.status} ${res.statusText}`;
          }
        }
        
        throw new Error(errorMessage);
      }
      
      const userData = await res.json();
      console.log("Login successful:", userData);
      
      setUser(userData);
      queryClient.setQueryData(["/api/user"], userData);
      
      // Check if enough time has passed since last auth toast
      const currentTime = Date.now();
      if (currentTime - lastAuthToastTime > AUTH_TOAST_COOLDOWN) {
        setLastAuthToastTime(currentTime);
        toast({
          title: "Login successful",
          description: `Welcome back, ${userData.fullName}!`,
        });
      } else {
        console.log("Suppressing duplicate login toast due to cooldown");
      }
      
      return true;
    } catch (err) {
      console.error("Login error:", err);
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Register function
  const register = async (userData: RegisterUser): Promise<boolean> => {
    try {
      // Rate limit check
      const now = Date.now();
      if (now - lastLoginAttemptTime < LOGIN_REQUEST_COOLDOWN) {
        console.log(`Rate limiting registration requests. Please wait ${Math.ceil((LOGIN_REQUEST_COOLDOWN - (now - lastLoginAttemptTime))/1000)} seconds before trying again.`);
        toast({
          title: "Too many attempts",
          description: "Please wait a few seconds before trying again.",
          variant: "destructive",
        });
        return false;
      }
      
      // Set rate limit timestamp
      setLastLoginAttemptTime(now);
      
      setIsAuthenticating(true);
      setError(null);
      
      console.log("Starting registration process...");
      
      // First, try the directly enhanced apiRequest which has retry logic
      let res;
      try {
        res = await apiRequest('POST', '/api/register', userData);
      } catch (apiError) {
        console.warn("Initial registration request failed, trying alternative approach...", apiError);
        
        // As a fallback, try a direct fetch with different options
        res = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          },
          body: JSON.stringify(userData),
          credentials: 'include'
        });
      }
      
      // Process the response
      if (!res.ok) {
        // DISABLED: Mock user registration feature removed to prevent authentication banner issues
        
        // Regular error handling
        let errorMessage = 'Registration failed';
        
        try {
          // Try to parse as JSON first
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || 'Registration failed';
        } catch (jsonError) {
          // If not JSON, try text
          try {
            const errorText = await res.text();
            errorMessage = errorText || 'Registration failed';
          } catch (textError) {
            // If all else fails, use status text
            errorMessage = `Registration failed: ${res.status} ${res.statusText}`;
          }
        }
        
        throw new Error(errorMessage);
      }
      
      const newUser = await res.json();
      console.log("Registration successful:", newUser);
      
      setUser(newUser);
      queryClient.setQueryData(["/api/user"], newUser);
      
      toast({
        title: "Registration successful",
        description: `Welcome to Inmobi, ${newUser.fullName}!`,
      });
      
      return true;
    } catch (err) {
      console.error("Registration error:", err);
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      
      toast({
        title: "Registration failed",
        description: message,
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Logout function
  const logout = async (): Promise<boolean> => {
    try {
      setIsAuthenticating(true);
      setError(null);
      
      console.log("Starting logout process...");
      
      // First, log out from Firebase if the user was authenticated with it
      if (auth.currentUser) {
        try {
          await firebaseSignOut();
          console.log("Firebase sign-out successful");
        } catch (firebaseError) {
          console.warn("Firebase sign-out error:", firebaseError);
          // Continue with server logout even if Firebase logout fails
        }
      }
      
      // Then log out from our server
      let res;
      try {
        res = await apiRequest('POST', '/api/logout');
      } catch (apiError) {
        console.warn("Initial logout request failed, trying alternative approach...", apiError);
        
        // As a fallback, try a direct fetch with different options
        res = await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          },
          credentials: 'include'
        });
      }
      
      // Process the response
      if (!res.ok) {
        let errorMessage = 'Logout failed';
        
        try {
          // Try to parse as JSON first
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || 'Logout failed';
        } catch (jsonError) {
          // If not JSON, try text
          try {
            const errorText = await res.text();
            errorMessage = errorText || 'Logout failed';
          } catch (textError) {
            // If all else fails, use status text
            errorMessage = `Logout failed: ${res.status} ${res.statusText}`;
          }
        }
        
        throw new Error(errorMessage);
      }
      
      console.log("Logout successful");
      
      // Clear user data from state and query cache
      setUser(null);
      queryClient.setQueryData(["/api/user"], null);
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      return true;
    } catch (err) {
      console.error("Logout error:", err);
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
      
      toast({
        title: "Logout failed",
        description: message,
        variant: "destructive",
      });
      
      // Even if the server logout fails, clear the local state to allow
      // the user to try logging in again
      setUser(null);
      queryClient.setQueryData(["/api/user"], null);
      
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Handle Firebase authentication
  const handleFirebaseAuth = async (firebaseUser: any): Promise<boolean> => {
    try {
      setIsAuthenticating(true);
      setError(null);
      
      console.log("Processing Firebase authentication:", firebaseUser?.email);
      
      if (!firebaseUser?.uid || !firebaseUser?.email) {
        throw new Error("Invalid Firebase user data");
      }
      
      // Call the server endpoint to register/login the Firebase user
      const res = await fetch('/api/firebase-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        body: JSON.stringify({
          firebaseUid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL
        }),
        credentials: 'include'
      });
      
      if (!res.ok) {
        // Handle error response
        let errorMessage = 'Firebase authentication failed on server';
        
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (jsonError) {
          try {
            const errorText = await res.text();
            errorMessage = errorText || errorMessage;
          } catch (textError) {
            errorMessage = `Firebase auth failed: ${res.status} ${res.statusText}`;
          }
        }
        
        throw new Error(errorMessage);
      }
      
      // Process successful response
      const userData = await res.json();
      console.log("Server Firebase authentication successful:", userData);
      
      // Update user state
      setUser(userData);
      queryClient.setQueryData(["/api/user"], userData);
      
      // Show success toast only if enough time has passed
      const currentTime = Date.now();
      if (currentTime - lastAuthToastTime > AUTH_TOAST_COOLDOWN) {
        setLastAuthToastTime(currentTime);
        toast({
          title: "Authentication successful",
          description: `Welcome, ${userData.fullName || firebaseUser.displayName || firebaseUser.email}!`,
        });
      } else {
        console.log("Suppressing duplicate authentication toast due to cooldown");
      }
      
      return true;
    } catch (err) {
      console.error("Firebase authentication error:", err);
      const message = err instanceof Error ? err.message : 'Firebase authentication failed';
      setError(message);
      
      toast({
        title: "Authentication failed",
        description: message,
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Create the context value
  const contextValue: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticating,
    handleFirebaseAuth
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

export { AuthContext };
