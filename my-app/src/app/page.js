'use client'
import React from 'react'
import Image from "next/image"
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useGoogleLogin } from '@react-oauth/google'
export default function Homepage() {
  const clientID = "417278201013-bt8s4fsscmho0pl6po3nnk0gogpjd3qm.apps.googleusercontent.com";

  const handleSuccess = async (credentialsResponse) => {
    const userInfo = jwtDecode(credentialsResponse.credential);
    console.log(userInfo);
  }

  const handleError = () => {
    console.error('Login failed');
  }
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`
          }
        });
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    },
  });
  return (
    <div className="flex h-screen">
      {/* Left side - Login form */}
      <div className="w-1/2 flex items-center justify-center bg-background">
        <div className="w-full max-w-md space-y-8 p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </form>

          <div className="text-center text-sm">
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>

          <div className="mt-4">
            <button onClick={login} style={{ padding: "10px", backgroundColor: "red", color: "white" }}>
              Login with Google
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Image and welcome message */}
      <div className="w-1/2 relative bg-gray-100">
        <Image
          alt="Chatty-Cat background"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <h2 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to Chatty-Cat</h2>
          <p className="text-xl text-gray-600">Connect with fellow cat lovers and chat about all things feline!</p>
        </div>
      </div>
    </div>
  )
}