// src/app/api/portfolio/route.ts

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let { userId, email, tag } = await req.json();
    let where;

    if (tag) {
      where = { tag };
    } else {
      if (!userId && !email) {
        return NextResponse.json(
          { error: "No userId or email found in request" },
          { status: 400 }
        );
      }

      if (!userId) {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return NextResponse.json(
            { error: "No user found given email" },
            { status: 404 }
          );
        }

        userId = user.id;
      }

      where = { userId };
    }

    const portfolio = await prisma.portfolio.findUnique({
      where,
      include: {
        links: true,
        educationHistories: true,
        workHistories: true,
      },
    });

    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to parse request body" },
      { status: 400 }
    );
  }
}

// Function to set (update/create) the portfolio
export async function PUT(req: NextRequest) {
  try {
    let userId;
    const {
      userId: rawUserId,
      email,
      tag,
      fullName,
      description,
      title,
      links,
      educationHistories,
      workHistories,
    } = await req.json();

    if (!userId && !email) {
      return NextResponse.json(
        { error: "No userId or email found in request" },
        { status: 400 }
      );
    }

    if (!userId) {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { error: "No user found given email" },
          { status: 404 }
        );
      }

      userId = user.id;
    } else {
      userId = rawUserId;
    }

    const portfolio = await prisma.portfolio.upsert({
      where: { userId: userId },
      create: {
        userId: userId,
        tag: tag,
        fullName: fullName,
        description: description,
        title: title,
        links: {
          create: links,
        },
        educationHistories: {
          create: educationHistories,
        },
        workHistories: {
          create: workHistories,
        },
      },
      update: {
        tag: tag,
        fullName: fullName,
        description: description,
        title: title,
        links: {
          deleteMany: {}, // Remove existing links
          create: links, // Add new links
        },
        educationHistories: {
          deleteMany: {}, // Remove existing education histories
          create: educationHistories, // Add new education histories
        },
        workHistories: {
          deleteMany: {}, // Remove existing work histories
          create: workHistories, // Add new work histories
        },
      },
      include: {
        links: true,
        educationHistories: true,
        workHistories: true,
      },
    });
    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
