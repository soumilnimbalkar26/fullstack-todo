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

export async function DELETE(request) {
  const { id } = await request.json();

  const index = todoData.findIndex((item) => item.id === id);

  if (index === -1) {
    return new Response(JSON.stringify({ error: "Item not found" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }

  const deletedItem = todoData.splice(index, 1)[0];

  return new Response(JSON.stringify(deletedItem), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
