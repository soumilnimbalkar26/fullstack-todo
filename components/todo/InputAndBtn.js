import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axiosInstance from "../../http/axiosInstance";

const InputAndBtn = ({ refectTodo }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      todo: "",
    },
    validationSchema: Yup.object({
      todo: Yup.string().required("Todo is required"),
    }),
    onSubmit: (values) => {
      const data = {
        todo: values?.todo,
      };
      axiosInstance
        .post("/", data)
        .then(function (response) {
          setTimeout(() => {
            refectTodo();
          }, 500);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  return (
    <>
      <div className="flex items-center justify-center">
        <div className=" relative ">
          <label
            htmlFor="name-with-label"
            className="text-gray-100 text-[24px]"
          >
            <b>Todo</b>
          </label>
          <input
            type="text"
            id="name-with-label"
            className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            name="todo"
            placeholder="Enter Todo"
            onChange={formik?.handleChange}
          />
          {formik?.errors && (
            <div className="text-red-500">{formik?.errors?.todo}</div>
          )}
          <button
            onClick={formik?.handleSubmit}
            className="py-2 px-4 mt-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg cursor-pointer"
          >
            Add Todo
          </button>
        </div>
      </div>
    </>
  );
};

export default InputAndBtn;
