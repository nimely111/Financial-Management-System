import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import logo from '../assets/images/accnt-finance-logo.png';

const UserListings = ({ isHome = false }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Show spinner when fetching

  useEffect(() => {
    const fetchUsers = async () => {
      const apiUrl = isHome ? '/api/users?_limit=3' : '/api/users';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-green-500 mb-6 text-center">
          {isHome ? 'Recent Admissions' : 'Browse Admissions'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="overflow-auto rounded-lg shadow">
            <table className="min-w-full">
              <thead className='border-b-2 border-green-200 bg-green-500 text-white'>
                <tr>
                  <th className="w-20 py-2 text-left tracking-wide px-4 border-b">ID</th>
                  <th className="py-2 text-left tracking-wide font-semibold px-4 border-b">Name</th>
                  <th className="py-2 text-left tracking-wide font-semibold px-4 border-b">Saving's Type</th>
                  <th className="py-2 text-left tracking-wide font-semibold px-4 border-b">Location</th>
                  <th className="py-2 text-left tracking-wide font-semibold px-4 border-b">Saving's Amount</th>
                  <th className="py-2 text-left tracking-wide font-semibold px-4 border-b">Currency</th>
                  <th className="py-2 text-left tracking-wide font-semibold px-4 border-b">Image</th>
                  <th className="py-2 text-left tracking-wide font-semibold px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-green-100'>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100 text-left">
                    <td className="py-2 text-left tracking-wide px-4 border-b whitespace-nowrap">
                      <span className='font-bold text-blue-500 hover:underline hover:cursor-pointer'>
                      #{user.id}
                      </span>
                      </td>
                    <td className="py-2 text-left tracking-wide px-4 border-b whitespace-nowrap">
                      <span className='font-bold text-blue-500'>
                      {user.name}
                      </span>
                      </td>
                    <td className="py-2 text-left tracking-wide px-4 border-b whitespace-nowrap">{user.type}</td>
                    <td className="py-2 text-left tracking-wide px-4 border-b whitespace-nowrap">{user.location}</td>
                    <td className="py-2 text-left tracking-wide px-4 border-b whitespace-nowrap">{user.saving}</td>
                    <td className="py-2 text-left tracking-wide px-4 border-b whitespace-nowrap">{user.currency.slice(0, 4)}</td>
                    <td className="py-2 text-left tracking-wide px-4 border-b whitespace-nowrap">
                      {logo ? (
                        <img
                          src={logo}
                          alt={logo}
                          className="md:w-16 md:h-16 object-cover rounded-full sm:w-8 sm:h-8"
                        />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td className="py-2 text-left tracking-wide px-4 border-b">
                      <div className="flex space-x-2">
                        <Link
                          to={`/users/${user.id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                        >
                          Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserListings;
