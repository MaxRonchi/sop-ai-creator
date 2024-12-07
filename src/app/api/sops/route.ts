import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const createSopSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tasks: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
    cost: z.number().default(0),
  })).optional(),
  resources: z.array(z.object({
    name: z.string(),
    type: z.string(),
    cost: z.number(),
    quantity: z.number().default(1),
  })).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validatedData = createSopSchema.parse(body);

    const sop = await prisma.sOP.create({
      data: {
        userId,
        title: validatedData.title,
        description: validatedData.description,
        tasks: {
          create: validatedData.tasks?.map(task => ({
            title: task.title,
            description: task.description,
            startDate: new Date(task.startDate),
            endDate: new Date(task.endDate),
            cost: task.cost,
          })) ?? [],
        },
        resources: {
          create: validatedData.resources?.map(resource => ({
            name: resource.name,
            type: resource.type,
            cost: resource.cost,
            quantity: resource.quantity,
          })) ?? [],
        },
      },
      include: {
        tasks: true,
        resources: true,
      },
    });

    return NextResponse.json(sop);
  } catch (error) {
    console.error("[SOP_CREATE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const sops = await prisma.sOP.findMany({
      where: {
        userId,
      },
      include: {
        tasks: true,
        resources: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(sops);
  } catch (error) {
    console.error("[SOPS_GET]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
