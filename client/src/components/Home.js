import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    // Attempt to fetch the user data via the API when the component mounts
    getUser();
  }, []);

  async function getUser() {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/auth/user",
        withCredentials: true, // Ensures cookies are sent for authentication
      });

      if (response.data.success) {
        setUserData(response.data.data); // Assuming the response contains a "data" object
      } else {
        setUserData(null); // If the response isn't successful, reset user data
      }
    } catch (error) {
      console.error("Error fetching user data:", error); // Log error to console
      navigate("/signin"); // Redirect to the signin page if the user is not authenticated
    } finally {
      setLoading(false); // Stop loading after the request completes
    }
  }

  async function handleLogout() {
    setLogoutLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/auth/logout",
        withCredentials: true, // Ensure logout request includes cookies
      });

      if (response.data.success) {
        // Clear user session, and navigate to the signin page
        localStorage.removeItem("authToken"); // Remove authentication token from localStorage
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error during logout:", error); // Log error if logout fails
    } finally {
      setLogoutLoading(false); // Stop logout loading state
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-20 h-20 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          <p className="mt-4 text-white text-lg">Loading...</p>
        </div>
      ) : (
        userData && (
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {userData.name}!</h1>
              <p className="text-gray-600 mb-6">Here's your profile information:</p>
            </div>
            <div className="space-y-4 text-gray-700">
              <p><span className="font-semibold">Email:</span> {userData.email}</p>
              <p><span className="font-semibold">Bio:</span> {userData.bio}</p>
              <p><span className="font-semibold">Skills:</span> {userData.skills}</p>
              <p><span className="font-semibold">Experience:</span> {userData.experience}</p>
              <p><span className="font-semibold">Education:</span> {userData.education}</p>
              <p><span className="font-semibold">Joined on:</span> {new Date(userData.createdAt).toLocaleDateString()}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              {logoutLoading ? "Logging out..." : "Logout"}
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default Home;
