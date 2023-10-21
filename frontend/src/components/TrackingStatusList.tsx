import TrackingStatusItem from "./TrackingStatusItem";
import { TrackingStatusItemProps } from "./TrackingStatusItem";

interface TrackingStatusListProps {
    items: Array<TrackingStatusItemProps['item']>;
    labels: {
        tracking_number?: string;
        external_tracking_number?: string;
    };
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

export default TrackingStatusList;