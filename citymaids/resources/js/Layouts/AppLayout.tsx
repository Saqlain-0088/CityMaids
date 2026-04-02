import { useState, PropsWithChildren } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'

interface NavItem {
    label: string
    href: string
}

function getNavItems(role: string | undefined): NavItem[] {
    if (role === 'admin') {
        return [
            { label: 'Bookings', href: '/admin/bookings' },
            { label: 'Services', href: '/admin/services' },
        ]
    }
    if (role === 'staff') {
        return [{ label: 'My Jobs', href: '/staff/dashboard' }]
    }
    // customer or guest
    return [
        { label: 'Services', href: '/services' },
        { label: 'My Bookings', href: '/bookings' },
    ]
}

export default function AppLayout({ children }: PropsWithChildren) {
    const { auth, flash } = usePage<PageProps>().props
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navItems = getNavItems(auth.user?.role)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">CM</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">CityMaids</span>
                            </Link>
                        </div>

                        {/* Desktop nav links */}
                        <div className="hidden md:flex md:items-center md:space-x-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop auth */}
                        <div className="hidden md:flex md:items-center md:space-x-4">
                            {auth.user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-600">
                                        {auth.user.name}
                                        <span className="ml-1 text-xs text-gray-400 capitalize">
                                            ({auth.user.role})
                                        </span>
                                    </span>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="btn-secondary text-xs"
                                    >
                                        Logout
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link href="/login" className="btn-secondary text-sm">
                                        Login
                                    </Link>
                                    <Link href="/register" className="btn-primary text-sm">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <div className="flex md:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                                aria-expanded={mobileMenuOpen}
                                aria-label="Toggle navigation menu"
                            >
                                {mobileMenuOpen ? (
                                    /* X icon */
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    /* Hamburger icon */
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white">
                        <div className="space-y-1 px-4 pb-3 pt-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="border-t border-gray-200 px-4 py-3">
                            {auth.user ? (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">
                                        {auth.user.name}
                                        <span className="ml-1 text-xs text-gray-400 capitalize">
                                            ({auth.user.role})
                                        </span>
                                    </p>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="btn-secondary w-full text-sm"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Logout
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Link
                                        href="/login"
                                        className="btn-secondary block w-full text-center text-sm"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="btn-primary block w-full text-center text-sm"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Flash messages */}
            {(flash.message || flash.error) && (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
                    {flash.message && (
                        <div className="rounded-md bg-green-50 border border-green-200 p-4">
                            <p className="text-sm text-green-800">{flash.message}</p>
                        </div>
                    )}
                    {flash.error && (
                        <div className="rounded-md bg-red-50 border border-red-200 p-4">
                            <p className="text-sm text-red-800">{flash.error}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Main content */}
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-center text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} CityMaids. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
