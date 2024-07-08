import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// !! req kullanılmasada eklenmesi zorunlu -- ilk arguman olmak zorunda !!
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value url is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
        where: {
            id : params.storeId,
            userId
        }
    });

    if(!storeByUserId){
        return new NextResponse('Unauthorized',{status: 403})
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_POST]", error);
    return new NextResponse("Interval error", { status: 500 });
  }
}

// !! req kullanılmasada eklenmesi zorunlu -- ilk arguman olmak zorunda !!
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    
    if (!params.storeId) {
      return new NextResponse("StoreId is required", { status: 400 });
    }

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLORS_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
