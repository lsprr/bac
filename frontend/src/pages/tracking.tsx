import React, { useState } from "react";
import axios from 'axios';

import Header from "@/components/shared/Header";
import SearchForm from "@/components/SearchForm";
import TrackingStatusItem from "@/components/TrackingStatusItem";

const TrackingView = () => {
    const [trackingNumber, setTrackingNumber] = useState<string>('');
    const [lastFetchedTrackingNumber, setLastFetchedTrackingNumber] = useState<string>('');
    const [trackingInfo, setTrackingInfo] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleTracking = async () => {

        if (!trackingNumber) {
            return;
        }

        if (trackingNumber === lastFetchedTrackingNumber) {
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3001/tracking_parcel?tracking_number=${trackingNumber}`);
            setTrackingInfo(response.data);
            setLastFetchedTrackingNumber(trackingNumber);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tracking info:', error);
        }
    };

    return (
        <section className='mt-10'>
            <Header title={"BPS Tracking"} />
            <SearchForm trackingNumber={trackingNumber} setTrackingNumber={setTrackingNumber} handleTracking={handleTracking} onHandleSubmit={handleSubmit} loading={loading} />
            {trackingInfo && <TrackingStatusItem labels={trackingInfo['label']} items={trackingInfo['parcel_tracking_items']} />}
        </section >
    )
}

export default TrackingView;