const WidgetSkeleton = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] animate-pulse bg-white overflow-hidden">
      {/* Sidebar - hidden on mobile, matches real sidebar's md:static behavior */}
      <div className="hidden md:block w-[280px] shrink-0 border-r border-gray-200 bg-white p-6">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-gray-200" />
          <div className="h-6 w-36 rounded bg-gray-200" />
        </div>

        {/* Orders heading */}
        <div className="mb-6 h-5 w-24 rounded bg-gray-200" />

        {/* Menu */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="mb-4 h-12 rounded-lg bg-gray-200" />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10">
        {/* Mobile hamburger placeholder */}
        <div className="mb-4 h-9 w-9 rounded-lg bg-gray-200 md:hidden" />

        {/* Title */}
        <div className="mb-3 h-8 w-48 rounded bg-gray-200 sm:h-10 sm:w-72" />

        {/* Subtitle */}
        <div className="mb-6 h-4 w-56 rounded bg-gray-200 sm:mb-8 sm:h-5 sm:w-80" />

        {/* Tabs - horizontal scroll on mobile instead of overflow */}
        <div className="mb-6 flex gap-3 overflow-x-auto sm:mb-8 [&::-webkit-scrollbar]:hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-9 w-28 shrink-0 rounded-lg bg-gray-200 sm:h-10 sm:w-36"
            />
          ))}
        </div>

        {/* Order cards */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="mb-4 rounded-xl border border-gray-200 p-4 sm:mb-6 sm:p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="h-24 w-full rounded bg-gray-200 sm:h-28 sm:w-20" />

              <div className="flex-1 space-y-3">
                <div className="h-5 w-3/4 rounded bg-gray-200 sm:w-48" />
                <div className="h-4 w-1/2 rounded bg-gray-200 sm:w-36" />
                <div className="mt-4 h-20 rounded-lg bg-gray-200" />
              </div>

              <div className="h-8 w-24 shrink-0 rounded-full bg-gray-200 sm:w-32" />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-0">
              <div className="h-4 w-2/3 rounded bg-gray-200 sm:w-40" />
              <div className="h-10 w-full rounded-lg bg-gray-200 sm:w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetSkeleton;