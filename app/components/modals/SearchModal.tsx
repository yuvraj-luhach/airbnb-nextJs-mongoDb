'use client';
import {signIn} from 'next-auth/react'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import { useState, useCallback, useMemo } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import useSearchModal from '@/app/hooks/useSearchModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import Modal from "./Modal";
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast'
import Button from '../Button';
import { useRouter, useSearchParams } from 'next/navigation';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import queryString from 'query-string';
import { formatISO } from 'date-fns';
import Counter from '../inputs/Counter';
import Calendar from '../inputs/Calendar';

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () =>{
    const router = useRouter();
    const searchModal = useSearchModal()
    const params = useSearchParams()

    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })
    const [location, setLocation] = useState<CountrySelectValue>()

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false
    }), [location])


    const [isLoading, setIsLoading] = useState(false);

    
    const onBack = () =>{
        setStep((value) => value - 1)
    }

    const onNext = () =>{
        setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
        if(step==STEPS.INFO){
            return "Search"
        }

        return "Next"
    },[step])

    const secondaryActionLabel = useMemo(() => {
        if(step==STEPS.LOCATION){
            return undefined
        }

        return "Back"
    },[step])

    const onSubmit = useCallback(async () => {
        if(step!==STEPS.INFO){
            return onNext()
        }
        
        let currentQuery = {}

        if(params){
            currentQuery = queryString.parse(params.toString())
        }

        const updatedQuery : any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if(dateRange.startDate){
            updatedQuery.startDate = formatISO(dateRange.startDate)
        }
        if(dateRange.endDate){
            updatedQuery.endDate = formatISO(dateRange.endDate)
        }

        const url = queryString.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true});

        setStep(STEPS.LOCATION)
        searchModal.onClose()

        router.push(url)
    },[router, searchModal, step, guestCount, roomCount, bathroomCount, dateRange, location, params]) 

    let bodyContent = (
        <div className="flex flex-col gap-8 overflow-y-auto">
            <Heading title="Where do you wanna go ? "
            subTitle="Choose any location"/>
            <CountrySelect value={location} onChange={(value) => {
                setLocation(value)
            }} />
            <Map center={location?.latlng}/>
        </div>
    )

    if(step===STEPS.DATE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Check in and check out dates" subTitle="Please select dates"/>
                <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)}/>
            </div>
        )
    }

    if(step===STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="What type of place you are looking for" subTitle="What amenities do you need?"/>
                <Counter value={guestCount} onChange={(value) => setGuestCount(value)} title="Guests" 
                subtitle="How many guests are coming?"  />
                <hr />
                <Counter value={roomCount} onChange={(value) => setRoomCount(value)} title="Rooms" 
                subtitle="How many rooms do you need?"  />
                <hr />
                <Counter value={bathroomCount} onChange={(value) => setBathroomCount(value)} title="Bathrooms" 
                subtitle="How many bathrooms do you need?"  />
            </div>
        )
    }

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
           <hr />
           <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => signIn('google')}/>
           <Button outline label='Continue with Github' icon={AiFillGithub} onClick={() => signIn('github')}/>
        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={searchModal.isOpen} title="Filters" 
        actionLabel={actionLabel} 
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        secondaryActionLabel={secondaryActionLabel}
        onClose={searchModal.onClose} 
        onSubmit={onSubmit} 
        body={bodyContent} 
        // footer={footerContent}
        />
    )
}

export default SearchModal;