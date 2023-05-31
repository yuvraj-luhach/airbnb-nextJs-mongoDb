import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams{
    listingId?: string
}

export async function DELETE(
    request: Request,
    { params } : { params: IParams }
){
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const { listingId } = params

    if(!listingId || typeof listingId!=='string'){
        return NextResponse.error()
    }

    const deleteListing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    })

    return NextResponse.json(deleteListing);
}