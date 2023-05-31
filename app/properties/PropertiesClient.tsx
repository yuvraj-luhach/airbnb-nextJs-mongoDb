'use client'

import { useCallback, useState } from 'react';
import { SafeListing, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface PropertiesClientProps {
    listings: SafeListing[]
    currentUser?: SafeUser | null
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({listings, currentUser}) => {

    const router = useRouter()
    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((listingId: string)=>{
        setDeletingId(listingId)

        axios.delete(`/api/listings/${listingId}`)
        .then(()=>{
            toast.success('Listing deleted')
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
            <Heading title='Properties' subTitle='All your listed properties are visible here' />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing: SafeListing, index) => {
                    return (
                    <ListingCard currentUser={currentUser} key={index} 
                    data={listing} actionId={listing.id} onAction={onCancel} 
                    disabled={deletingId===listing.id} actionLabel='Delete Listing'/>
                    )
                })}
            </div>
            
        </Container>
  );
};

export default PropertiesClient;
