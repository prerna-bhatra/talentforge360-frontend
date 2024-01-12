import React, { useEffect, useState } from 'react';


import axios from 'axios';

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  skills: string;
  status: string;
  expectedSalary: number;
  nodeJsExperience: number;
  reactJsExperience: number;
  totalScore: number;
}

const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Fetch candidates from API
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:3005/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div>
      <h2 className='mt-4 mb-4 ml-4'>Candidate List</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            {/* Add other table headers */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td className="px-6 py-4 whitespace-nowrap">{candidate.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{candidate.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{candidate.phone}</td>
              {/* Add other table data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateList;
