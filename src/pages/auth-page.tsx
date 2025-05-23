import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import { LoginUser, RegisterUser, loginUserSchema, registerUserSchema } from "../shared/schema";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, InfoIcon, AlertCircle } from "lucide-react";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { PasskeyAuthForm } from "@/components/auth/passkey-auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { user, login, register, isAuthenticating } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Set document title
  useEffect(() => {
    document.title = "Login or Register - Inmobi";
  }, []);

  // Login form
  const loginForm = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterUser>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
    },
  });

  // Add submission tracking to prevent multiple rapid submissions
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Track last submission time to prevent multiple rapid submissions 
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const DEBOUNCE_TIME = 2000; // 2 seconds

  const onLoginSubmit = async (data: LoginUser) => {
    // Get current time
    const now = Date.now();
    
    // Hard block on multiple submissions
    if (isSubmitting || isAuthenticating) {
      console.log("Login already in progress, blocking submission");
      return;
    }
    
    // Implement strict time-based debounce
    if (now - lastSubmitTime < DEBOUNCE_TIME) {
      console.log(`Too many login attempts. Please wait ${Math.ceil((DEBOUNCE_TIME - (now - lastSubmitTime))/1000)} seconds.`);
      toast({
        title: "Rate limited",
        description: `Please wait a moment before trying again.`,
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Lock submission completely
      setIsSubmitting(true);
      setLastSubmitTime(now);
      
      // Disable the entire form
      const formEl = document.querySelector('form') as HTMLFormElement;
      if (formEl) {
        Array.from(formEl.elements).forEach((el: any) => {
          if (el.tagName === 'BUTTON' || el.tagName === 'INPUT') {
            el.disabled = true;
          }
        });
      }
      
      // Execute login
      await login(data);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      // Reset submission state after a significant delay
      setTimeout(() => {
        setIsSubmitting(false);
        
        // Re-enable form elements
        const formEl = document.querySelector('form') as HTMLFormElement;
        if (formEl) {
          Array.from(formEl.elements).forEach((el: any) => {
            if (el.tagName === 'BUTTON' || el.tagName === 'INPUT') {
              el.disabled = false;
            }
          });
        }
      }, 2000); // Longer cooldown
    }
  };

  const onRegisterSubmit = async (data: RegisterUser) => {
    // Get current time
    const now = Date.now();
    
    // Hard block on multiple submissions
    if (isSubmitting || isAuthenticating) {
      console.log("Registration already in progress, blocking submission");
      return;
    }
    
    // Implement strict time-based debounce
    if (now - lastSubmitTime < DEBOUNCE_TIME) {
      console.log(`Too many registration attempts. Please wait ${Math.ceil((DEBOUNCE_TIME - (now - lastSubmitTime))/1000)} seconds.`);
      toast({
        title: "Rate limited",
        description: `Please wait a moment before trying again.`,
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Lock submission completely
      setIsSubmitting(true);
      setLastSubmitTime(now);
      
      // Disable the entire form
      const formEl = document.querySelector('form') as HTMLFormElement;
      if (formEl) {
        Array.from(formEl.elements).forEach((el: any) => {
          if (el.tagName === 'BUTTON' || el.tagName === 'INPUT') {
            el.disabled = true;
          }
        });
      }
      
      // Execute registration
      await register(data);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      // Reset submission state after a significant delay
      setTimeout(() => {
        setIsSubmitting(false);
        
        // Re-enable form elements
        const formEl = document.querySelector('form') as HTMLFormElement;
        if (formEl) {
          Array.from(formEl.elements).forEach((el: any) => {
            if (el.tagName === 'BUTTON' || el.tagName === 'INPUT') {
              el.disabled = false;
            }
          });
        }
      }, 2000); // Longer cooldown
    }
  };

  if (user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Form Section */}
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary-800">Welcome to Inmobi</h1>
                <p className="text-primary-600 mt-2">
                  Access exclusive property insights and investment opportunities
                </p>
              </div>
              
              {/* Development Mode Warning - Only show on development domains */}
              {(window.location.hostname.includes('replit') || window.location.hostname.includes('localhost')) && (
                <Alert variant="destructive" className="mb-6 bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-500" />
                  <AlertTitle className="text-blue-700">Development Mode</AlertTitle>
                  <AlertDescription className="text-blue-600">
                    You're using Inmobi on a development domain. Some features like social authentication may be limited.
                    Use the demo credentials below for testing.
                  </AlertDescription>
                </Alert>
              )}
              
              <Tabs
                defaultValue="login"
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as "login" | "register")}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Password</FormLabel>
                              <Button 
                                variant="link" 
                                type="button"
                                className="h-auto p-0 text-secondary-600 hover:text-secondary-500"
                                onClick={() => toast({
                                  title: "Password Reset",
                                  description: "Password reset functionality is coming soon.",
                                })}
                              >
                                Forgot password?
                              </Button>
                            </div>
                            <FormControl>
                              <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label
                          htmlFor="remember"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember me
                        </label>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gray-900 text-white hover:bg-gray-800"
                        disabled={isAuthenticating || isSubmitting}
                      >
                        {isAuthenticating || isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        Sign In
                      </Button>
                      
                      <div className="mt-4 text-sm text-center">
                        <Button 
                          type="button" 
                          variant="link" 
                          className="text-secondary-600 hover:text-secondary-500"
                          onClick={() => {
                            // Fill in test credentials
                            loginForm.setValue('username', 'testuser');
                            loginForm.setValue('password', 'password123');
                          }}
                        >
                          Use demo credentials for testing
                        </Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                      <FormField
                        control={registerForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Choose a username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Create a password" {...field} />
                            </FormControl>
                            <FormMessage />
                            <p className="text-xs text-primary-500 mt-1">
                              Must be at least 8 characters with a number and special character
                            </p>
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="terms" className="mt-1" />
                        <div className="text-sm leading-none">
                          I agree to the{" "}
                          <Button 
                            variant="link" 
                            type="button"
                            className="h-auto p-0 text-secondary-600 hover:text-secondary-500"
                            onClick={(e) => {
                              e.preventDefault();
                              toast({
                                title: "Terms of Service",
                                description: "Terms of Service page is coming soon.",
                              });
                            }}
                          >
                            Terms of Service
                          </Button>{" "}
                          and{" "}
                          <Button 
                            variant="link" 
                            type="button"
                            className="h-auto p-0 text-secondary-600 hover:text-secondary-500"
                            onClick={(e) => {
                              e.preventDefault();
                              toast({
                                title: "Privacy Policy",
                                description: "Privacy Policy page is coming soon.",
                              });
                            }}
                          >
                            Privacy Policy
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gray-900 text-white hover:bg-gray-800"
                        disabled={isAuthenticating || isSubmitting}
                      >
                        {isAuthenticating || isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : null}
                        Create Account
                      </Button>
                      
                      <div className="mt-4 text-sm text-center">
                        <Button 
                          type="button" 
                          variant="link" 
                          className="text-secondary-600 hover:text-secondary-500"
                          onClick={() => {
                            // Fill in test credentials
                            registerForm.setValue('username', 'testuser');
                            registerForm.setValue('email', 'test@example.com');
                            registerForm.setValue('password', 'password123');
                            registerForm.setValue('fullName', 'Test User');
                          }}
                        >
                          Use demo credentials for testing
                        </Button>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-primary-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-primary-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <SocialAuthButtons 
                    onSuccess={async (userData) => {
                      // Handle successful Firebase auth
                      try {
                        // For login tab, try to login first
                        if (activeTab === 'login') {
                          try {
                            // Try to login with the given email as username
                            await login({
                              username: userData.email,
                              password: userData.password
                            });
                            return; // If login succeeds, return
                          } catch (error) {
                            // If login fails, it might be a new user - continue to register
                            console.log("Firebase user not found in our system, registering...");
                          }
                        }
                        
                        // Register the user with our API
                        await register({
                          username: userData.username,
                          email: userData.email,
                          password: userData.password,
                          fullName: userData.fullName || userData.email.split('@')[0] // Use email prefix if no name
                        });
                      } catch (error) {
                        console.error("Error in Firebase auth flow:", error);
                      }
                    }}
                    onError={(error) => {
                      console.error("Social auth error:", error);
                    }}
                  />
                  
                  {/* Passkey Authentication */}
                  {activeTab === 'login' && (
                    <div className="mt-4">
                      <PasskeyAuthForm />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Hero Section */}
            <div className="hidden md:block relative overflow-hidden">
              <div className="absolute inset-0 bg-[#0f1620]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10 mix-blend-multiply"></div>
              </div>
              
              {/* Modern house image */}
              <div className="absolute right-0 bottom-0 w-[350px] h-[350px] opacity-80">
                <img 
                  src="@assets/fc22b533-29c2-4e45-a37a-627a17bdb980.png" 
                  alt="Modern luxury house" 
                  className="object-contain"
                />
              </div>
              
              <div className="relative z-10 p-12 flex flex-col h-full justify-center">
                <h2 className="text-4xl font-bold text-white mb-6 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                  Data-Driven Real Estate Investments
                </h2>
                <p className="text-white text-lg mb-8 max-w-md [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">
                  Join thousands of investors making smarter real estate decisions with powerful analytics, market insights, and premium properties.
                </p>
                
                <div className="bg-[#192231]/80 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-300 flex drop-shadow">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                  </div>
                  <blockquote className="text-white font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)] mb-4">
                    "Inmobi has completely transformed how I approach real estate investing. The data insights helped me find properties with 20% higher ROI than my previous investments."
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center text-white font-bold shadow-md">
                      RC
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">Robert Chen</p>
                      <p className="text-white/90 text-sm [text-shadow:0_1px_1px_rgba(0,0,0,0.5)]">Real Estate Investor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
