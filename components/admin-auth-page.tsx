'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'

interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function getCookie(name: string): string | null {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}


const PasswordInput: React.FC<PasswordInputProps> = ({ id, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input 
        id={id} 
        type={showPassword ? "text" : "password"} 
        value={value}
        onChange={onChange}
        required
      />
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-gray-400" />
        ) : (
          <Eye className="h-4 w-4 text-gray-400" />
        )}
      </Button>
    </div>
  );
};

interface AdminAuthPageProps {
  onLogin: (username: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
}

function AdminAuthPage({ onLogin, onSignup }: AdminAuthPageProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
  
      if (!response.ok) {
        // Parse the response to get error details
        const data = await response.json();
        throw new Error(data.error || 'An unknown error occurred.');
      }
  
      // Handle successful login
      onLogin(loginEmail, loginPassword);
    } catch (error: any) {
      console.error('Error:', error.message);
      // Update the state with the error message
      setError(error.message);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:8000/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: signupUsername,
          email: signupEmail,
          password: signupPassword,
        }),
      });
  
      if (!response.ok) {
        // Check if the response is HTML or JSON
        const contentType = response.headers.get('Content-Type');
        let errorMessage = 'An error occurred.';
        
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          errorMessage = data.error || 'An unknown error occurred.';
        } else {
          const text = await response.text();
          errorMessage = text;
        }
  
        throw new Error(errorMessage);
      }
  
      // Handle successful signup
      onSignup(signupUsername, signupEmail, signupPassword);
    } catch (error: any) {
      console.error('Error:', error.message);
      setError(error.message); // Display error message
    }
  };
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className='font-samarkan text-[35px] text-center' >E-Upasthiti</CardTitle>
          <CardDescription>Login or create an admin account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Input 
                        id="login-email" 
                        type="email" 
                        placeholder="admin@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="login-password" 
                        type={showPassword ? "text" : "password"} 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4" type="submit">Login</Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-name">Name</Label>
                    <div className="relative">
                      <Input 
                        id="signup-name" 
                        placeholder="John Doe"
                        value={signupUsername}
                        onChange={(e) => setSignupUsername(e.target.value)} 
                        required
                      />
                      <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="admin@example.com"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="signup-password" 
                        type={showPassword ? "text" : "password"} 
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4" type="submit">Sign Up</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
          Track Smart, Work Smarter with E-Upasthiti. 
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AdminAuthPage;
