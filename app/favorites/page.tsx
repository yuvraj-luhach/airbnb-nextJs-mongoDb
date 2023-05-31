import getCurrentUser from "../actions/getCurrentUser"
import getFavorites from "../actions/getFavorites"
import ClientOnly from "../components/ClientOnly"
import EmptyState from "../components/EmptyState"
import FavoriteClient from "./FavoriteClient"

const FavoritePage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login first"/>
            </ClientOnly>
        )
    }

    const favorites = await getFavorites()

    if(favorites.length===0){
        return (
            <ClientOnly>
                <EmptyState title="No favorites" subtitle="Looks like you have no favorite listings"/>
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoriteClient listings={favorites} currentUser={currentUser}/>
        </ClientOnly>
    )
}

export default FavoritePage