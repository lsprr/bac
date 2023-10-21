interface JWTTokenDisplayProps {
    token: string;
}

const JWTTokenDisplay = ({ token }: JWTTokenDisplayProps) => {
    return (
        <div className="mt-8 grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <p className="mt-4 text-sm text-gray-500 sm:mt-0 break-all">
                    <b className='text-gray-800'>Your JWT Token: </b>{token}
                </p>
            </div>
        </div>
    )
}

export default JWTTokenDisplay;