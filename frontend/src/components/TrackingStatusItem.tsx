export interface TrackingStatusItemProps {
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

export default TrackingStatusItem;