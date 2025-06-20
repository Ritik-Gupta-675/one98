// // src/pages/Login.tsx
// import { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { env } from '@/config/env';
// import { Eye, EyeOff } from 'lucide-react';

// const LogIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const { login, GoogleOneTap } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//     } catch (err) {
//       setError('Failed to log in. Please check your credentials.');
//     }
//   };

//   return (
//     <>
//     <GoogleOneTap />
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full space-y-8">
//           <div>
//             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//               Sign in to your account
//             </h2>
//           </div>
//           {error && (
//             <div
//               className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
//               role="alert"
//             >
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             <div className="rounded-md shadow-sm -space-y-px">
//               <div>
//                 <label htmlFor="email-address" className="sr-only">
//                   Email address
//                 </label>
//                 <input
//                   id="email-address"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                   placeholder="Email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <div className="relative">
//                   <label htmlFor="password" className="sr-only">
//                     Password
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="current-password"
//                     required
//                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
//                     onClick={() => setShowPassword(!showPassword)}
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-5 w-5" />
//                     ) : (
//                       <Eye className="h-5 w-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>
//           <div className="text-center">
//             <button
//               onClick={() =>
//                 (window.location.href = `${env./users/register`)
//               }
//               className="font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               Don't have an account? Register
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LogIn;