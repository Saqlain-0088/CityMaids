import AppLayout from '@/Layouts/AppLayout'
import { Link } from '@inertiajs/react'

export default function Welcome() {
    return (
        <AppLayout>
            <div className="text-center py-16">
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                    Welcome to <span className="text-primary-600">CityMaids</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Professional home cleaning services at your fingertips. Book a cleaning, track your appointment, and enjoy a spotless home.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/services" className="btn-primary text-base px-8 py-3">
                        Browse Services
                    </Link>
                    <Link href="/register" className="btn-secondary text-base px-8 py-3">
                        Get Started
                    </Link>
                </div>
            </div>
        </AppLayout>
    )
}
