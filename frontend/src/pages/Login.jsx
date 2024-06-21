import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        username:"",
        password:""
    });

    const handleChange = (key, value) => {
        setData({
            ...data,
            [key]: value
        })
    }
    
    const loginUser = async (data) => {
        try {
            const response = await axios({
                method: "post",
                data: data,
                url: "http://localhost:4000/login",
                headers: { "Content-Type": "application/json" },
            });
            localStorage.setItem('user', JSON.stringify(response.data))
            return response.data;
        } catch (error) {
            console.error(error, "::error");
            throw error;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await loginUser(data).then(() => navigate('/text'))
        } catch (error) {
            console.error(error);
        }
    };


    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Username 
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    value={data.username}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    type="text"
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

          </div>
        </div>
      </>
    )
  }
  