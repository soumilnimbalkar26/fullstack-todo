import { todoData } from "./data";

export async function GET() {
  return Response?.json(todoData);
}

export async function POST(request) {
  const dataToSet = await request?.json();
  const newData = {
    id: todoData?.length + 1,
    todo: dataToSet?.todo,
  };
  todoData?.push(newData);
  return new Response(JSON.stringify(newData), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
