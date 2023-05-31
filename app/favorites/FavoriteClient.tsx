'use client'

import { useState, useCallback } from "react"
import { SafeListing, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavoriteClientProps {
    listings: SafeListing[]
    currentUser?: SafeUser | null
}

const FavoriteClient: React.FC<FavoriteClientProps> = ({listings, currentUser}) => {

  return (
      <Container>
        <Heading title='Favorites' subTitle='All your favorite listing are here' />
        <div className="mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing: SafeListing, index) => {
            return (
              <ListingCard currentUser={currentUser} key={index} data={listing}/>
            )
          })}
        </div>
      </Container>
  );
};

export default FavoriteClient;
