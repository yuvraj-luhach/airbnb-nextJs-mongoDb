import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./PropertiesClient";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login first" />
            </ClientOnly>
        )
    }

    const listings = await getListings({ userId: currentUser.id})

    if(listings.length===0){
        return (
            <ClientOnly>
                <EmptyState title="No Properties found" subtitle="Looks like you haven't listed any properties" />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient listings={listings} currentUser={currentUser} />
        </ClientOnly>
    )

}

export default PropertiesPage;