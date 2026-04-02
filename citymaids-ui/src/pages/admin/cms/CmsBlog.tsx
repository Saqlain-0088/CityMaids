import AdminLayout from '../../../components/layout/AdminLayout'

export default function CMSBlog() {
  return (
    <AdminLayout>
      <div className='flex flex-col items-center justify-center min-h-[60vh] text-center'>
        <div className='w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-4'>
          <span className='text-3xl'>📝</span>
        </div>
        <h2 className='text-2xl font-extrabold text-slate-900 mb-2'>Blog</h2>
        <p className='text-slate-500 text-sm max-w-sm'>Create and manage blog posts and articles.</p>
        <span className='mt-4 inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full'>
          <svg className='w-3.5 h-3.5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
          Coming soon — editor will be built here
        </span>
      </div>
    </AdminLayout>
  )
}
