// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// function SignUp() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     bio: "",
//     skills: "",
//     experience: "",
//     education: "",
//   });

//   const URL = process.env.REACT_APP_URL;

//   async function handleSignUp(e) {
//     e.preventDefault();

//     // Split skills string into an array
//     const skillsArray = userData.skills.split(",").map((skill) => skill.trim());

//     const newUserData = {
//       ...userData,
//       skills: skillsArray,
//     };

//     setLoading(true);
//     try {
//       const response = await axios({
//         method: "post",
//         url: URL + "/api/auth/signup",
//         withCredentials: true,
//         data: newUserData,
//       });

//       if (response.data.success) {
//         navigate("/signin");
//       }
//       setLoading(false);
//     } catch (error) {
//       alert(error.response.data.message);
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 space-y-6">
//         <h2 className="text-3xl font-bold text-center text-gray-800">Create Your Account</h2>
//         <p className="text-center text-gray-600">
//           Join us to get started on your journey.
//         </p>

//         <form className="space-y-6" onSubmit={(e) => handleSignUp(e)}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Name */}
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Your Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="John Doe"
//                 required
//                 value={userData.name}
//                 onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Your Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="name@company.com"
//                 required
//                 value={userData.email}
//                 onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Your Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 minLength="8"
//                 placeholder="••••••••"
//                 required
//                 value={userData.password}
//                 onChange={(e) => setUserData({ ...userData, password: e.target.value })}
//               />
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 minLength="8"
//                 placeholder="••••••••"
//                 required
//                 value={userData.confirmPassword}
//                 onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
//               />
//             </div>

//             {/* Bio */}
//             <div className="md:col-span-2">
//               <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
//                 Bio (Optional)
//               </label>
//               <textarea
//                 id="bio"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Tell us about yourself"
//                 value={userData.bio}
//                 onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
//               />
//             </div>

//             {/* Skills */}
//             <div className="md:col-span-2">
//               <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
//                 Skills (Comma separated)
//               </label>
//               <input
//                 type="text"
//                 id="skills"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="e.g., JavaScript, Node.js, React"
//                 required
//                 value={userData.skills}
//                 onChange={(e) => setUserData({ ...userData, skills: e.target.value })}
//               />
//             </div>

//             {/* Experience */}
//             <div>
//               <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
//                 Years of Experience
//               </label>
//               <input
//                 type="number"
//                 id="experience"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Years of experience"
//                 min="0"
//                 required
//                 value={userData.experience}
//                 onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
//               />
//             </div>

//             {/* Education */}
//             <div>
//               <label htmlFor="education" className="block text-sm font-medium text-gray-700">
//                 Your Education
//               </label>
//               <input
//                 type="text"
//                 id="education"
//                 className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Your highest degree"
//                 required
//                 value={userData.education}
//                 onChange={(e) => setUserData({ ...userData, education: e.target.value })}
//               />
//             </div>
//           </div>

//           {/* SignUp Button */}
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             disabled={loading}
//           >
//             {loading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//             ) : (
//               "Register new account"
//             )}
//           </button>
//         </form>

//         {/* Sign In Link */}
//         <div className="text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
//             Sign In
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;





























import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    skills: "",
    experience: "",
    education: "",
  });
  const [error, setError] = useState(""); // State to hold error messages

  const URL = process.env.REACT_APP_URL;

  // Email validation regex
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Handle form submission
  async function handleSignUp(e) {
    e.preventDefault();
    setError(""); // Reset error state

    // Basic form validations
    if (!validateEmail(userData.email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (userData.skills.trim().length === 0) {
      setError("Please provide at least one skill.");
      return;
    }

    const skillsArray = userData.skills.split(",").map((skill) => skill.trim());

    const newUserData = {
      ...userData,
      skills: skillsArray,
    };

    setLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/auth/signup",
        withCredentials: true,
        data: newUserData,
      });

      if (response.data.success) {
        navigate("/signin");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">Create Your Account</h2>
        <p className="text-center text-gray-400">Join us to get started on your journey.</p>

        {/* Display Error Messages */}
        {error && <div className="text-red-500 text-center mt-2">{error}</div>}

        <form className="space-y-6" onSubmit={handleSignUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                placeholder="John Doe"
                required
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                placeholder="name@company.com"
                required
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Your Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                minLength="8"
                placeholder="••••••••"
                required
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                minLength="8"
                placeholder="••••••••"
                required
                value={userData.confirmPassword}
                onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
              />
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-300">
                Bio (Optional)
              </label>
              <textarea
                id="bio"
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                placeholder="Tell us about yourself"
                value={userData.bio}
                onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
              />
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label htmlFor="skills" className="block text-sm font-medium text-gray-300">
                Skills (Comma separated)
              </label>
              <input
                type="text"
                id="skills"
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                placeholder="e.g., JavaScript, Node.js, React"
                required
                value={userData.skills}
                onChange={(e) => setUserData({ ...userData, skills: e.target.value })}
              />
            </div>

            {/* Experience */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-300">
                Years of Experience
              </label>
              <input
                type="number"
                id="experience"
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                placeholder="Years of experience"
                min="0"
                required
                value={userData.experience}
                onChange={(e) => setUserData({ ...userData, experience: e.target.value })}
              />
            </div>

            {/* Education */}
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-300">
                Your Education
              </label>
              <input
                type="text"
                id="education"
                className="mt-1 block w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                placeholder="Your highest degree"
                required
                value={userData.education}
                onChange={(e) => setUserData({ ...userData, education: e.target.value })}
              />
            </div>
          </div>

          {/* SignUp Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Register new account"
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/signin" className="font-medium text-blue-400 hover:text-blue-300">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
