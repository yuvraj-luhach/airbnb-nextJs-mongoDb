'use client'

import { useRouter } from "next/navigation"
import Heading from "./Heading"
import Button from "./Button"

interface EmpltyStateProps {
    title?: string
    subtitle?: string
    showReset?: boolean
}

const EmptyState:React.FC<EmpltyStateProps> = ({title = "No exact matches" , subtitle = "Try choosing another category", showReset}) => {

    const router = useRouter()

    return ( 
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
        <Heading center title={title} subTitle={subtitle} />
        {showReset && (
            <div className="w-48 mt-4">
                <Button outline label="Remove all filters" onClick={() => router.push('/')} />
            </div>
        )}
    </div>
    );
}
 
export default EmptyState;