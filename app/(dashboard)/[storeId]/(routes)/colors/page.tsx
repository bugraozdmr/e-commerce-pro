import prismadb from "@/lib/prismadb";
import { SizesClient } from "./components/client";
import { ColorColumn } from "./[colorId]/components/columns";
import {format} from 'date-fns';


const ColorsPage = async ({
    params
} : {
    params : {storeId : string}
} ) => {
    const colors = await prismadb.color.findMany({
        where : {
            storeId : params.storeId
        },
        orderBy:{
            createdAt : 'desc'
        }
    });

    const formattedColors : ColorColumn[] = colors.map((item) => ({
        id : item.id,
        name : item.name,
        value : item.value,
        createdAt : format(item.createdAt, "MMMM do,yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizesClient data={formattedColors} />
            </div>
        </div>
    )
}

export default ColorsPage; 