"use client";
import React, { useState } from "react";
import InputAndBtn from "./InputAndBtn";
import AllTodos from "./AllTodos";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const TodoList = () => {
  const url = "http://localhost:3000/backend/todolistdata";

  const fetchTodos = async () => {
    const res = await axios.get(url);
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
      <AllTodos todoListData={todoListData} loadingTodo={loadingTodo} />
    </>
  );
};

export default TodoList;
