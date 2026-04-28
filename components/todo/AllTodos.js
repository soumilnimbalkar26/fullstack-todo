import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import axiosInstance from "../../http/axiosInstance";

const SectionEmptyState = ({ title, copy, icon }) => (
  <div className="rounded-[24px] border border-dashed border-[color:var(--border-strong)] bg-white/55 px-5 py-8 text-center">
    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--accent-soft)] text-[color:var(--foreground)]">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-[color:var(--foreground)]">{title}</h3>
    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[color:var(--muted-strong)]">
      {copy}
    </p>
  </div>
);

const AllTodos = ({
  activeTodos,
  completedTodos,
  loadingTodo,
  refectTodo,
  searchQuery,
}) => {
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const deleteTodo = async (id) => {
    try {
      setDeletingId(id);
      await axiosInstance.delete("/", {
        data: {
          id: id,
        },
      });
      await refectTodo();
    } finally {
      setDeletingId(null);
    }
  };

  const updateTodoStatus = async (id, completed) => {
    try {
      setUpdatingId(id);
      await axiosInstance.patch("/", {
        id,
        completed,
      });
      await refectTodo();
    } finally {
      setUpdatingId(null);
    }
  };

  const visibleCount = activeTodos.length + completedTodos.length;
  const hasTodos = visibleCount > 0;

  const renderTodoCard = (todo, index, isCompleted = false) => (
    <li
      key={todo?.id}
      className={`group flex items-start justify-between gap-4 rounded-[24px] border px-4 py-4 shadow-[0_12px_30px_rgba(106,74,44,0.08)] transition duration-200 hover:-translate-y-0.5 ${
        isCompleted
          ? "border-emerald-200 bg-emerald-50/80"
          : "border-[color:var(--border)] bg-white/80 hover:border-[color:var(--border-strong)] hover:bg-white"
      }`}
    >
      <div className="flex min-w-0 items-start gap-4">
        <button
          type="button"
          onClick={() => updateTodoStatus(todo?.id, !isCompleted)}
          disabled={updatingId === todo?.id}
          className={`status-button ${isCompleted ? "status-button-done" : ""}`}
          aria-label={isCompleted ? `Move ${todo?.todo} to active tasks` : `Mark ${todo?.todo} as done`}
        >
          {isCompleted ? (
            <CheckCircleRoundedIcon fontSize="small" />
          ) : (
            <RadioButtonUncheckedRoundedIcon fontSize="small" />
          )}
        </button>
        <div className={`task-index ${isCompleted ? "task-index-done" : ""}`}>
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="space-y-1">
          <p
            className={`text-base font-medium leading-6 ${
              isCompleted
                ? "text-emerald-900 line-through decoration-2"
                : "text-[color:var(--foreground)]"
            }`}
          >
            {todo?.todo}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            Task #{todo?.id}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => deleteTodo(todo?.id)}
        disabled={deletingId === todo?.id}
        className="icon-button"
        aria-label={`Delete ${todo?.todo}`}
      >
        <DeleteIcon fontSize="small" />
      </button>
    </li>
  );

  return (
    <section className="glass-panel p-6 sm:p-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-[color:var(--border)] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <span className="eyebrow">Task board</span>
          <div>
            <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">
              My tasks
            </h2>
            <p className="text-sm text-[color:var(--muted-strong)]">
              {searchQuery
                ? `Showing matches for "${searchQuery}".`
                : "A clean list for the work that still needs your attention."}
            </p>
          </div>
        </div>
        <div className="rounded-full border border-[color:var(--border-strong)] bg-white/70 px-4 py-2 text-sm font-medium text-[color:var(--foreground)]">
          {visibleCount} visible
        </div>
      </div>

      {loadingTodo ? (
        <div className="grid gap-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-20 animate-pulse rounded-2xl border border-[color:var(--border)] bg-white/60"
            />
          ))}
        </div>
      ) : !hasTodos ? (
        <div className="rounded-[28px] border border-dashed border-[color:var(--border-strong)] bg-white/55 px-6 py-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--accent-soft)] text-lg font-semibold text-[color:var(--foreground)]">
            0
          </div>
          <h3 className="text-xl font-semibold text-[color:var(--foreground)]">
            {searchQuery ? "No matching tasks" : "Nothing in the queue"}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[color:var(--muted-strong)]">
            {searchQuery
              ? "Try a different search term or clear the filter to bring the full list back."
              : "Add your first task above and this board will turn into a focused running list."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
                To do
              </h3>
              <span className="section-badge">{activeTodos.length}</span>
            </div>
            {activeTodos.length ? (
              <ul className="grid gap-3">
                {activeTodos.map((todo, index) => renderTodoCard(todo, index))}
              </ul>
            ) : (
              <SectionEmptyState
                title="No active tasks"
                copy="Everything visible has been completed. Add a new task when you are ready for the next round."
                icon={<RadioButtonUncheckedRoundedIcon fontSize="small" />}
              />
            )}
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
                Done
              </h3>
              <span className="section-badge section-badge-done">
                {completedTodos.length}
              </span>
            </div>
            {completedTodos.length ? (
              <ul className="grid gap-3">
                {completedTodos.map((todo, index) =>
                  renderTodoCard(todo, index, true)
                )}
              </ul>
            ) : (
              <SectionEmptyState
                title="Done section is empty"
                copy="Mark a task as done and it will move here automatically."
                icon={<CheckCircleRoundedIcon fontSize="small" />}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default AllTodos;
