import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axiosInstance from "../../http/axiosInstance";

const quickStarts = [
  "Plan the top 3 priorities",
  "Reply to pending messages",
  "Review the next sprint tasks",
];

const InputAndBtn = ({ refectTodo, activeCount, completedCount }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      todo: "",
    },
    validationSchema: Yup.object({
      todo: Yup.string().required("Todo is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = {
        todo: values?.todo?.trim(),
      };

      try {
        setIsSubmitting(true);
        await axiosInstance.post("/", data);
        resetForm();
        await refectTodo();
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <section className="glass-panel relative overflow-hidden p-6 sm:p-8">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[color:var(--accent-soft)] blur-3xl" />
      <div className="relative space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl space-y-3">
            <span className="eyebrow">Daily flow</span>
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
                Build a calmer plan for the day.
              </h1>
              <p className="max-w-lg text-sm leading-6 text-[color:var(--muted-strong)] sm:text-base">
                Capture the next thing that matters, keep the list tidy, and
                let the board stay readable even when the day gets noisy.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:min-w-72">
            <div className="stat-card">
              <span className="stat-label">Active tasks</span>
              <span className="stat-value">{activeCount}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Done today</span>
              <span className="stat-value">{completedCount}</span>
            </div>
          </div>
        </div>

        <form className="space-y-3" onSubmit={formik.handleSubmit}>
          <label
            htmlFor="todo-input"
            className="text-sm font-medium text-[color:var(--foreground)]"
          >
            Add a new task
          </label>
          <input
            type="text"
            id="todo-input"
            className="input-shell"
            name="todo"
            placeholder="Draft the next meaningful step..."
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.todo}
          />
          {formik.touched.todo && formik.errors.todo ? (
            <div className="text-sm text-rose-600">{formik.errors.todo}</div>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {quickStarts.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => formik.setFieldValue("todo", item)}
                  className="chip-button"
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="primary-button sm:min-w-40"
            >
              {isSubmitting ? "Adding..." : "Add task"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default InputAndBtn;
