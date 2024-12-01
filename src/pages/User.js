import React, { useEffect, useState } from 'react'
import Layouts from '../components/layouts/Layouts'
import { jwtDecode } from 'jwt-decode'
import { useData } from '../components/layouts/DataContext'

const token = localStorage.getItem('token');

const User = () => {
    const [userData, setUserData] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const { UpdatetotalUserData } = useData();
    const resultsPerPage = 10;

    // Fetch all user data
    const fetchUserData = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8080/api/vi/users', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) {
                console.log("Failed to fetch data");
                return;
            }

            const data = await res.json();
            setUserData(data.data.user);
            setTotalResults(data.results);
            UpdatetotalUserData(data.results);
        } catch (error) {
            console.log("Error fetching data:", error);
        }
    };

    // Handle page change
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        fetchUserData();
        if (token) {
            const decoded = jwtDecode(token);
            setCurrentUser({
                id: decoded.id,
                name: decoded.name,
                email: decoded.email,
                photo: decoded.photo,
                role: decoded.role
            });
            setIsAdmin(decoded.role === 'admin');
        } else {
            setCurrentUser(null);
        }
        setLoading(false);
    }, [currentPage, token]);

    // Total pages calculation
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    // Only show data for admin, user, or organizer
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!isAdmin) {
        return <p>You are not authorized to access this page.</p>;
    }

    // Paginate the user data
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const displayedUserData = userData.slice(startIndex, endIndex);

    // Page numbers for pagination
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Delete a user
    const deleteUser = async (userID) => {
        try {
            const res = await fetch(`http://127.0.0.1:8080/api/vi/users/${userID}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                console.log("Error deleting user");
                return;
            }

            fetchUserData(); // Refresh data after deleting user
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <Layouts>
            <div className="flex flex-row m-10">
                <div className="basis-1/5">
                    <div className="flex items-center justify-center mt-32">
                        <div className="max-w-xs">
                            {currentUser ? (
                                <div className="bg-red-50 shadow-xl rounded-lg h-96">
                                    <div className="photo-wrapper p-2">
                                        <img className="w-32 h-32 rounded-full mx-auto" src={`http://localhost:8080/${currentUser.photo}`} alt={currentUser.name} />
                                    </div>
                                    <div className="p-2">
                                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{currentUser.name}</h3>
                                        <div className="text-center text-gray-400 text-xs font-semibold">
                                            <p>{currentUser.role}</p>
                                        </div>
                                        <table className="text-xs my-3">
                                            <tbody>
                                                <tr>
                                                    <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                                                    <td className="px-2 py-2">Chatakpur-3, Dhangadhi Kailali</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                                                    <td className="px-2 py-2">+977 9955221114</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                                                    <td className="px-2 py-2">{currentUser.email}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="text-center my-3">
                                            <a href="/" className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium">View Profile</a>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>Please log in to view user information</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="basis-3/4">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-red-50">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-red-50">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">id</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedUserData.map((data) => (
                                    <tr key={data._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <div className="text-base font-semibold">{data._id}</div>
                                            </div>
                                        </td>
                                        <th scope="row" className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{data.name}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="font-normal text-gray-500">{data.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> {data.role}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => deleteUser(data._id)} className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col items-center mt-8">
                        <span className="text-sm text-gray-700 dark:text-gray-400">
                            Showing <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> to <span className="font-semibold text-gray-900 dark:text-white">{totalPages}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalResults}</span> Entries
                        </span>
                        <nav aria-label="Page navigation example" className="flex items-center justify-center mt-4">
                            <ul className="inline-flex -space-x-px">
                                <li>
                                    <button onClick={handlePrevPage} className="page-link rounded-l-lg bg-white border border-gray-300 text-gray-500 px-4 py-2 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                                        Previous
                                    </button>
                                </li>
                                {pageNumbers.map((number) => (
                                    <li key={number}>
                                        <button onClick={() => setCurrentPage(number)} className={`page-link px-4 py-2 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700`}>
                                            {number}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button onClick={handleNextPage} className="page-link rounded-r-lg bg-white border border-gray-300 text-gray-500 px-4 py-2 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </Layouts>
    );
}

export default User;
