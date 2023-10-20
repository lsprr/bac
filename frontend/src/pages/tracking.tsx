import axios from 'axios';
import React, { useState } from "react";

export default function TrackingView() {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingInfo, setTrackingInfo] = useState(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleTracking = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/tracking_parcel?tracking_number=${trackingNumber}`);
            setTrackingInfo(response.data);
        } catch (error) {
            console.error('Error fetching tracking info:', error);
        }
    };

    return (
        <section className='mt-10'>
            <Header />
            <SearchForm trackingNumber={trackingNumber} setTrackingNumber={setTrackingNumber} handleTracking={handleTracking} onHandleSubmit={handleSubmit} />
            {trackingInfo && <TrackingStatusList items={trackingInfo['parcel_tracking_items']} />}
        </section >
    )
}

function Header() {
    return (
        <header>
            <h2 className="text-2xl font-bold mt-5">
                BPS Tracking
            </h2>
        </header>

    );
}

function SearchForm({ trackingNumber, setTrackingNumber, handleTracking, onHandleSubmit }) {
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
                <button onClick={handleTracking} className="mr-5 inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">Track Parcel</button>
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none" disabled>Show Map</button>
            </div>
        </form>
    );
}

function TrackingStatusList({ items }) {
    return (
        <ol className="mt-3 divide-y divider-gray-200 pt-10">
            {items.map(item => (
                <TrackingStatusItem key={item.uid} item={item} />
            ))}
        </ol>
    );
}

function TrackingStatusItem({ item }) {
    const date = new Date(item.timestamp);
    const day = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
    const description = item.tracking_code_vendor?.tracking_code?.tracking_code_locales[0]?.description ?? item.tracking_code?.tracking_code_locales[0]?.description;
    const location = item.location ?? item.city + ', ' + item.state;

    return (
        <>
            <li>
                <div className="items-center block py-3 sm:flex">
                    <div className="text-gray-800">

                        <time className="text-lg font-semibold">{day}</time>
                        <div className="text-base font-normal flex items-center">
                            <span className="text-gray-800 capitalize">
                                {description}
                            </span>
                            <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-sm font-semibold rounded-full bg-green-700 text-green-300">
                                <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                </svg>
                                <span className="sr-only">Icon description</span>
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

                    </div>
                </div>
            </li>
        </>
    );
}
