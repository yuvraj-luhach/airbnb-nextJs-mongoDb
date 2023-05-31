'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiRupee } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}

const Input: React.FC<InputProps> = ({id, label, type, disabled, formatPrice, required, register, errors}) => {
    return ( 
        <div className="w-full relative">
            {formatPrice && <BiRupee size={24} className="text-neutral-700 absolute top-5 left-2"/>}

            <input id={id} type={type} disabled={disabled} 
            {...register(id, { required })} placeholder={type}
            className={`peer w-full p-4 pt-5 placeholder-transparent font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
            ${formatPrice ? 'pl-9': 'pl-4'}
            ${errors[id] ? 'border-rose-500': 'border-neutral-300'}
            ${errors[id] ? 'focus:border-rose-500': 'focus:border-black'}
            `} />

            {/* <label className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] 
            ${formatPrice ? 'left-9':'left-4'} peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 
            ${errors[id] ? 'text-rose-400':'text-zinc-400'}`} >
                {label}
            </label> */}
            <label className={`absolute ${formatPrice ? 'left-9':'left-4'} transition-all duration-200
            top-1 text-xs peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:pl-0.5
            ${errors[id] ? 'text-rose-400':'text-zinc-400'}`} >
                {label}
            </label>
        </div>
     );
}
 
export default Input;