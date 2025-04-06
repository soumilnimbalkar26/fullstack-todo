import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AllTodos = ({ todoListData, loadingTodo }) => {
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
                  className="flex items-center justify-between py-3 text-gray-600 border-b-2 border-gray-100 dark:text-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center justify-start text-sm">
                    <span className="mx-4">{el?.id}</span>
                    <span>{el?.todo}</span>
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
