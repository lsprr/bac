import React, { useState } from "react";
import axios from 'axios';

import Header from "@/components/shared/Header";
import SearchForm from "@/components/SearchForm";
import TrackingStatusList from "@/components/TrackingStatusList";

const API_BASE_URL = 'http://localhost:3001';

const TrackingView = () => {
    const [trackingNumber, setTrackingNumber] = useState<string>('');
    const [lastFetchedTrackingNumber, setLastFetchedTrackingNumber] = useState<string>('');
    const [trackingInfo, setTrackingInfo] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleTracking = async () => {
        if (!trackingNumber) return;

        if (trackingNumber === lastFetchedTrackingNumber) return;

        const encodedTrackingNumber = encodeURIComponent(trackingNumber);

        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/tracking_parcel?tracking_number=${encodedTrackingNumber}`);
            setTrackingInfo(response.data);
            setLastFetchedTrackingNumber(trackingNumber);
        } catch (error: any) {
            console.error('Error fetching tracking info:', error);
            setError('Failed to fetch tracking information. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='mt-10'>
            <Header title={"BPS Tracking"} />
            <SearchForm
                trackingNumber={trackingNumber}
                setTrackingNumber={setTrackingNumber}
                handleTracking={handleTracking}
                onSubmit={handleSubmit}
                loading={loading}
            />
            {error &&
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            }
            {trackingInfo &&
                <TrackingStatusList labels={trackingInfo['label']} items={trackingInfo['parcel_tracking_items']} />
            }
        </section >
    )
}

export default TrackingView;
