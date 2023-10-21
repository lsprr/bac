import axios from 'axios';
import React, { useState } from "react";

interface TrackingStatusItemProps {
    item: {
        uid: string;
        timestamp: string;
        tracking_code_vendor?: {
            tracking_code?: {
                tracking_code_locales: Array<{
                    description: string;
                }>
            }
        };
        tracking_code?: {
            tracking_code_locales: Array<{
                description: string;
            }>
        };
        location?: string;
        city?: string;
        state?: string;
    };
}

interface TrackingStatusListProps {
    items: Array<TrackingStatusItemProps['item']>;
    labels: {
        tracking_number?: string;
        external_tracking_number?: string;
    };
}

interface SearchFormProps {
    trackingNumber: string;
    setTrackingNumber: React.Dispatch<React.SetStateAction<string>>;
    handleTracking: () => Promise<void>;
    onHandleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const TrackingView = () => {
    const [trackingNumber, setTrackingNumber] = useState<string>('');
    const [trackingInfo, setTrackingInfo] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleTracking = async () => {

        if (!trackingNumber) {
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3001/tracking_parcel?tracking_number=${trackingNumber}`);
            setTrackingInfo(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tracking info:', error);
        }
    };

    return (
        <section className='mt-10'>
            <Header />
            <SearchForm trackingNumber={trackingNumber} setTrackingNumber={setTrackingNumber} handleTracking={handleTracking} onHandleSubmit={handleSubmit} loading={loading} />
            {trackingInfo && <TrackingStatusList labels={trackingInfo['label']} items={trackingInfo['parcel_tracking_items']} />}
        </section >
    )
}

const Header = () => {
    return (
        <header>
            <h2 className="text-2xl font-bold mt-5">
                BPS Tracking
            </h2>
        </header>

    );
}

const SearchForm = ({ trackingNumber, setTrackingNumber, handleTracking, onHandleSubmit, loading }: SearchFormProps) => {
    return (
        <form onSubmit={onHandleSubmit}>
            <div className='mb-5'>
                <label htmlFor="tracking" className="sm:block mt-5">Enter your tracking number</label>
                <input
                    value={trackingNumber}
                    onChange={e => setTrackingNumber(e.target.value)}
                    type="text"
                    id="tracking"
                    className="mt-2 bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Tracking #"
                    required
                />
            </div>
            <div className='flex justify-between md:justify-start'>
                {loading
                    ?
                    <button disabled type="button" className="mr-5 inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                    </button>
                    :
                    <button onClick={handleTracking} className="mr-5 inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">Track Parcel</button>

                }
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" disabled>Show Map</button>
            </div>
        </form>
    );
}

const TrackingStatusList = ({ items, labels }: TrackingStatusListProps) => {
    const trackingNumber = labels?.tracking_number;
    const externalTrackingNumber = labels?.external_tracking_number;

    return (
        <>
            <div className='pt-10 flex flex-col md:flex-row justify-between'>
                <p>
                    <b>Tracking Number:</b> {trackingNumber}
                </p>
                <p>
                    <b>External Tracking Number:</b> {externalTrackingNumber}
                </p>
            </div>
            <ol className="relative border-l border-gray-200 dark:border-gray-700 mt-5">
                {items.map(item => (
                    <TrackingStatusItem key={item.uid} item={item} />
                ))}
            </ol>
        </>
    );
}

const TrackingStatusItem = ({ item }: TrackingStatusItemProps) => {
    const date = new Date(item.timestamp);
    const day = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
    const description = item.tracking_code_vendor?.tracking_code?.tracking_code_locales[0]?.description ?? item.tracking_code?.tracking_code_locales[0]?.description;
    const location = item.location ?? item.city + ', ' + item.state;

    return (
        <li className='mb-10 ml-7'>
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white ">
                <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                </svg>
                <span className="sr-only">Icon description</span>
            </span>
            <time className="text-lg font-semibold">{day}</time>
            <div className="text-base font-normal flex items-center">
                <span className="text-gray-800 capitalize">
                    {description}
                </span>
            </div>
            <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 border border-gray-500">
                <svg className="w-2.5 h-2.5 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                </svg>
                {time}
            </span>
            <span className="uppercase bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border border-blue-600">
                <svg className="w-2.5 h-2.5 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19ZM8.374 17.4a7.6 7.6 0 0 1-5.9-7.4c0-.83.137-1.655.406-2.441l.239.019a3.887 3.887 0 0 1 2.082 2.5 4.1 4.1 0 0 0 2.441 2.8c1.148.522 1.389 2.007.732 4.522Zm3.6-8.829a.997.997 0 0 0-.027-.225 5.456 5.456 0 0 0-2.811-3.662c-.832-.527-1.347-.854-1.486-1.89a7.584 7.584 0 0 1 8.364 2.47c-1.387.208-2.14 2.237-2.14 3.307a1.187 1.187 0 0 1-1.9 0Zm1.626 8.053-.671-2.013a1.9 1.9 0 0 1 1.771-1.757l2.032.619a7.553 7.553 0 0 1-3.132 3.151Z" />
                </svg>
                {location}
            </span>
        </li>
    );
}

export default TrackingView;