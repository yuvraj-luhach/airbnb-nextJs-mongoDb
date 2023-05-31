'use client'

import { useState , useCallback} from 'react';
import { SafeReservation, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface ReservationsClientProps {
    reservations: SafeReservation[] 
    currentUser?: SafeUser
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({reservations, currentUser}) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((reservationId: string)=>{
        setDeletingId(reservationId)

        axios.delete(`/api/reservations/${reservationId}`)
        .then(()=>{
            toast.success('Reservation cancelled')
            router.refresh()
        })
        .catch((error)=>{
            toast.error('Something went wrong')
        })
        .finally(()=>{
            setDeletingId('')
        })

    },[router])

    return (
        <Container>
            <Heading title='Reservations' subTitle='Bookings on your properties' />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations?.map((reservation, index) => (
                    <ListingCard key={reservation.id} data={reservation.listing}
                    actionId={reservation.id} onAction={onCancel} 
                    disabled={deletingId===reservation.id} actionLabel='Cancel guest reservation' 
                    currentUser={currentUser} reservation={reservation} />
                ))}
            </div>        
        </Container>
    );
};

export default ReservationsClient;
