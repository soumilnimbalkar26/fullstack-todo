import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosInstance from "../../http/axiosInstance";

const AllTodos = ({ todoListData, loadingTodo, refectTodo }) => {
  const deleteTodo = (id) => {
    axiosInstance.delete("/", {
      data: {
        id: id,
      },
    });
  };

  return (
    <div className="mt-2">
      {loadingTodo ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="w-full bg-white shadow-lg rounded-2xl dark:bg-gray-700">
            <p className="p-4 font-bold text-black text-md dark:text-white">
              My Tasks
              <span className="ml-2 text-sm text-gray-500">
                {todoListData?.length}
              </span>
            </p>
            <ul>
              {todoListData?.map((el) => (
                <li
                  key={el?.id}
                  className="py-3 px-3 text-gray-600 border-b-2 border-gray-100 dark:text-gray-200 dark:border-gray-800"
                >
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="mx-4">{el?.id}</div>
                      <div>{el?.todo}</div>
                    </div>
                    <DeleteIcon
                      onClick={() => {
                        deleteTodo(el?.id);
                        setTimeout(() => {
                          refectTodo();
                        }, 300);
                      }}
                      className="text-red-600 cursor-pointer"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default AllTodos;
