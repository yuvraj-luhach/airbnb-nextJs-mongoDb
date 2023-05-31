import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

export default async function getFavorites() {
    try {
        const currentUser = await getCurrentUser()

        if(!currentUser){
            return []
        }
        
        const favoriteListings = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds) || []]
                }
            }
        })

        const safeListings = favoriteListings.map((favorite) => ({
            ...favorite,
            createdAt: favorite.createdAt.toISOString(),
            updatedAt: favorite.updatedAt.toISOString(),
        }))

        return safeListings
    } catch (error: any) {
        throw new Error(error)        
    }
}