import Image from 'next/image'
import backgroundImage from '../../public/assets/images/bg.jpg';

import TrackingView from '../components/TrackingView'
import LoginView from '../components/LoginView'

export default function Home() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside
          className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
        >
          <Image src={backgroundImage} alt="background cover" className="absolute inset-0 h-full w-full object-cover" />
        </aside>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl w-full">
            <h1
              className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
            >
              Bringer Parcel Services
            </h1>

            <LoginView />
            <TrackingView />
          </div>
        </main>
      </div>
    </section>

  )
}
