"use client";
import React, { useState } from "react";
import InputAndBtn from "./InputAndBtn";
import AllTodos from "./AllTodos";
import axiosInstance from "../../http/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const TodoList = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredTodos =
    todoListData?.filter((item) =>
      item?.todo?.toLowerCase().includes(normalizedQuery)
    ) || [];
  const activeTodos = filteredTodos.filter((item) => !item?.completed);
  const completedTodos = filteredTodos.filter((item) => item?.completed);
  const totalTodos = todoListData?.length || 0;
  const totalCompleted = todoListData?.filter((item) => item?.completed).length || 0;
  const totalActive = totalTodos - totalCompleted;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <InputAndBtn
        refectTodo={refectTodo}
        activeCount={totalActive}
        completedCount={totalCompleted}
      />
      <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="glass-panel p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <span className="eyebrow">Overview</span>
              <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">
                Keep the list easy to scan.
              </h2>
              <p className="max-w-xl text-sm leading-6 text-[color:var(--muted-strong)]">
                Search across current tasks, spot workload at a glance, and
                trim anything that no longer deserves space.
              </p>
            </div>
            <label className="flex w-full max-w-sm flex-col gap-2 text-sm font-medium text-[color:var(--foreground)]">
              Search tasks
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Filter by keyword"
                className="input-shell"
              />
            </label>
          </div>
        </div>
        <aside className="glass-panel p-5 sm:p-6">
          <span className="eyebrow">Snapshot</span>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="stat-card min-h-28">
              <span className="stat-label">In progress</span>
              <span className="stat-value">{totalActive}</span>
            </div>
            <div className="stat-card min-h-28">
              <span className="stat-label">Completed</span>
              <span className="stat-value">{totalCompleted}</span>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-[color:var(--muted-strong)]">
            {searchQuery
              ? `${filteredTodos.length} matching task${filteredTodos.length === 1 ? "" : "s"} across both sections.`
              : `You have ${totalTodos} total task${totalTodos === 1 ? "" : "s"} on the board.`}
          </p>
        </aside>
      </section>
      <AllTodos
        activeTodos={activeTodos}
        completedTodos={completedTodos}
        loadingTodo={loadingTodo}
        refectTodo={refectTodo}
        searchQuery={searchQuery}
      />
    </main>
  );
};

export default TodoList;
