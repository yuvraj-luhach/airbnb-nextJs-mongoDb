'use client'

import { Range } from "react-date-range"

import * as React from 'react';
import { BiRupee } from "react-icons/bi";
import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
    price: number
    totalPrice: number 
    dateRange: Range    
    disabled: boolean 
    disabledDates: Date[]
    onChangeDate: (value: Range) => void 
    onSubmit: () => void 
}

const ListingReservation: React.FC<ListingReservationProps> = ({price, totalPrice, onChangeDate, dateRange, onSubmit, disabled, disabledDates})=> {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
        <div className="flex flex-row items-center gap-1 p-4">
            <div className="text-2xl font-semibold">
                <BiRupee/>
            </div>
            <div>{price}</div>
            <div className="font-light text-neutral-600">
               / night
            </div>
        </div>
        <hr />
        <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)}/>
        <hr />
        <div className="p-4">
            <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
        </div>
        <hr />
        <div className="p-4 flex flex-row items-center justify-end font-semibold text-lg">
            <div>Total </div>
            <div>
                <BiRupee/>
            </div>
            <div>{totalPrice}</div>
        </div>
    </div>
  );
};

export default ListingReservation;
