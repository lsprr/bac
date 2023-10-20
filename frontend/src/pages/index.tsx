import { Inter } from 'next/font/google'
import TrackingView from './tracking'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`${inter.className}`}
    >
      <TrackingView />
    </main>
  )
}
