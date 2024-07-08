import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// !! req kullanılmasada eklenmesi zorunlu -- ilk arguman olmak zorunda !!
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { 
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      Images,
      isFeatured,
      isArchived
     } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!Images || !Images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        storeId: params.storeId,
        name,
        isFeatured,
        isArchived,
        price,
        categoryId,
        colorId,
        sizeId,
        Images :{
          deleteMany:{}
        }
      },
    });

    // Once patch yerine update gerek yoksa olmuyor image'den dolayı once sil resimleri update ile sonra tekrar update ederek yukle

    const product = await prismadb.product.update({
      where : {
        id : params.productId
      },
      data : {
        Images : {
          createMany : {
            data: [
              ...Images.map((image : {url : string}) => image),
            ]
          }
        }
      }
    })

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// !! req kullanılmasada eklenmesi zorunlu -- ilk arguman olmak zorunda !!
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function GET(
    req: Request,
    { params }: { params: { productId: string } }
  ) {
    try {
      if (!params.productId) {
        return new NextResponse("Product id is required", { status: 400 });
      }
  
      const product = await prismadb.product.findUnique({
        where: {
          id: params.productId,
        },
        include : {
          Images : true,
          category : true,
          size : true,
          color : true
        }

      });
  
      return NextResponse.json(product);
    } catch (error) {
      console.log("[PRODUCT_GET]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }