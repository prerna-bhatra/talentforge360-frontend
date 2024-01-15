import axios from "axios";
import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  skills: string;
  expectedSalary: string;
  nodeJsExperience: string;
  reactJsExperience: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
        name: {
          type: "required",
          message: "Name is required.",
        },

      }
      : {},
  };
};

export default function AddCandidateForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(
    async (data) => {

      const {
        name,
        email,
        phone,
        skills,
        expectedSalary,
        nodeJsExperience,
        reactJsExperience
        // totalScore
      } = data

      try {

        const response = await axios.post('https://talentforge360-production.up.railway.app/candidates', {
          name,
          email,
          phone,
          skills,
          expectedSalary: parseInt(expectedSalary),
          nodeJsExperience: parseInt(nodeJsExperience),
          reactJsExperience: parseInt(reactJsExperience),
        });

        // console.log({ response });
        reset();

        toast.success("Candidate added succefully!", {
          position: toast.POSITION.TOP_RIGHT,
        });


      } catch (error) {

        console.log({ error });
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });

      }

    }
  );





  return (
    <>
      <ToastContainer />

      <form onSubmit={onSubmit} className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input {...register("name")} type="text" id="name" placeholder="John Doe" className="input-field" />
          {errors?.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input {...register("email")} type="email" id="email" placeholder="john@example.com" className="input-field" />
          {errors?.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
            Phone
          </label>
          <input {...register("phone")} type="tel" id="phone" placeholder="123-456-7890" className="input-field" />
          {errors?.phone && <p className="text-red-500">{errors.phone.message}</p>}

        </div>

        <div className="mb-4">
          <label htmlFor="skills" className="block text-gray-700 text-sm font-bold mb-2">
            Skills
          </label>
          <input {...register("skills")} type="text" id="skills" placeholder="JavaScript, React, Node.js" className="input-field" />
        </div>

        <div className="mb-4">
          <label htmlFor="expectedSalary" className="block text-gray-700 text-sm font-bold mb-2">
            Expected Salary
          </label>
          <input {...register("expectedSalary")} type="text" id="expectedSalary" placeholder="$60,000" className="input-field" />
        </div>

        <div className="mb-4">
          <label htmlFor="nodeJsExperience" className="block text-gray-700 text-sm font-bold mb-2">
            Node.js Experience
          </label>
          <input {...register("nodeJsExperience")} type="text" id="nodeJsExperience" placeholder="2 years" className="input-field" />
        </div>

        <div className="mb-4">
          <label htmlFor="reactJsExperience" className="block text-gray-700 text-sm font-bold mb-2">
            React.js Experience
          </label>
          <input {...register("reactJsExperience")} type="text" id="reactJsExperience" placeholder="1 year" className="input-field" />
        </div>

        <div className="mb-4">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </form>
    </>

  );
}
