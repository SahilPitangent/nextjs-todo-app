import { PrismaClient, type Todo } from '@prisma/client';
import type { HttpResponse } from './types';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
   try {
      const todos = await prisma.todo.findMany();

      const response: HttpResponse<Todo[]> = {
         status: 200,
         response: { data: todos, message: 'Todos are fetched.' },
      };
      return Response.json(response);
   } catch (error) {
      console.log(error);
      return Response.json({ status: 500, message: 'Failed to fetch todos.' });
   }
}

export async function POST(request: Request) {
   try {
      const body = await request.json();
      const todo = await prisma.todo.create({
         data: body,
      });

      const response: HttpResponse<Todo> = {
         status: 201,
         response: { data: todo, message: 'Todo is created.' },
      };
      return Response.json(response);
   } catch (error) {
      console.log(error);
      return Response.json({ status: 500, message: 'Failed to create todo.' });
   }
}

export async function PATCH(request: Request) {
   try {
      const body: Todo = await request.json();
      const todo = await prisma.todo.update({
         where: {
            id: body.id,
         },
         data: body,
      });

      const response: HttpResponse<Todo> = {
         status: 201,
         response: { data: todo, message: 'Todo is updated.' },
      };
      return Response.json(response);
   } catch (error) {
      console.log(error);
      return Response.json({ status: 500, message: 'Failed to update todo.' });
   }
}

export async function DELETE(request: Request) {
   try {
      const body: Todo = await request.json();
      const todo = await prisma.todo.delete({
         where: {
            id: body.id,
         },
      });

      const response: HttpResponse<Todo> = {
         status: 202,
         response: { data: todo, message: 'Todo is deleted.' },
      };
      return Response.json(response);
   } catch (error) {
      console.log(error);
      return Response.json({ status: 500, message: 'Failed to delete todo.' });
   }
}
