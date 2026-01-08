"use client";
import React, { useState } from "react";
import InputAndBtn from "./InputAndBtn";
import AllTodos from "./AllTodos";
import axiosInstance from "../../http/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const TodoList = () => {
  const fetchTodos = async () => {
    const res = await axiosInstance.get("/");
    return res.data || [];
  };

  const {
    data: todoListData,
    isLoading: loadingTodo,
    refetch: refectTodo,
  } = useQuery({
    queryKey: ["fetchTodos"],
    queryFn: fetchTodos,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <InputAndBtn refectTodo={refectTodo} />
      <AllTodos
        todoListData={todoListData}
        loadingTodo={loadingTodo}
        refectTodo={refectTodo}
      />
    </>
  );
};

export default TodoList;
