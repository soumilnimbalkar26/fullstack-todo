"use client";
import React, { useState } from "react";
import InputAndBtn from "./InputAndBtn";
import AllTodos from "./AllTodos";

const TodoList = () => {
  return (
    <>
      <InputAndBtn />
      <AllTodos />
    </>
  );
};

export default TodoList;
