import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";


const ReservationsPage = async () => {

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login first" />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({ authorId : currentUser.id })

    if(reservations.length===0){
        return (
            <ClientOnly>
                <EmptyState title="No Reservations" subtitle="Looks like you don't have any reservations on your properties" />
            </ClientOnly>
        )
    }


    return (
        <ClientOnly>
            <ReservationsClient reservations={reservations} currentUser={currentUser} />
        </ClientOnly>
    )
}

export default ReservationsPage