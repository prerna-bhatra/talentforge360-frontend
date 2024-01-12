import React from 'react';
import { useForm, Controller } from 'react-hook-form';

const AddCandidateForm = () => {
  const { handleSubmit, control, register } = useForm();

  const onSubmit = () => {
    // console.log(data);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name:
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            {...register('firstName', { required: 'First name is required' })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name:
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            {...register('lastName', { required: 'Last name is required' })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Gender:
          </label>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select className="border rounded w-full py-2 px-3" {...field}>
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            )}
          />
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>

  );
};

export default AddCandidateForm;
