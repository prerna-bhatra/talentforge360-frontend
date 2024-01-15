import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

  const statues = ["Contacted", "Interview Scheduled", "Offer Extended", "Hired", "Rejected"]

  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const [selectedStatus, setSelectedStatus] = useState('');


  useEffect(() => {
    // Fetch candidates from API
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('https://talentforge360-production.up.railway.app/candidates');
        setCandidates(response.data);
        // setSelectedStatus(candidates.status)

      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);


  console.log({ candidates });



  const handleSelectChange = async (e: any, i: number) => {

    console.log("target", e.target.value);
    try {
      const response = await axios.post(`https://talentforge360-production.up.railway.app/candidates/status/${i}`, {
        status: e.target.value
      });
      // console.log({ response });
      toast.success("Candidate status updated succefully!", {
        position: toast.POSITION.TOP_RIGHT,
      });

      // setSelectedStatus(candidates.status)

    } catch (error) {
      toast.error("Something went wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

  }

  return (
    <div>
            <ToastContainer />

      <h2 className='mt-4 mb-4 ml-4'>Candidate List</h2>
      {
        candidates.length > 0 ? (<table className="min-w-full divide-y divide-gray-200">
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
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                React JS Experience
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Node JS Experience
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
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
                <td className="px-6 py-4 whitespace-nowrap">{candidate.reactJsExperience}</td>
                <td className="px-6 py-4 whitespace-nowrap">{candidate.nodeJsExperience}</td>
                <td className="px-6 py-4 whitespace-nowrap w-20px">{candidate.skills}</td>
                <td className="px-6 py-4 whitespace-nowrap">{candidate.totalScore}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select id="options" onChange={(e) => handleSelectChange(e, candidate.id)}>
                    <option value={candidate.status ? candidate.status : selectedStatus}>
                      {candidate.status ? candidate.status : "Select..."}
                    </option>
                    {
                      statues.map((element) =>
                      (
                        <option value={element}>{element}</option>
                      ))
                    }
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        ) :
          (
            <div>Loading</div>
          )
      }

    </div >
  );
};

export default CandidateList;
