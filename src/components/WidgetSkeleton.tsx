const WidgetSkeleton = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] animate-pulse bg-white">
      {/* Sidebar */}
      <div className="w-[280px] border-r border-gray-200 bg-white p-6">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-gray-200" />
          <div className="h-6 w-36 rounded bg-gray-200" />
        </div>

        {/* Orders heading */}
        <div className="mb-6 h-5 w-24 rounded bg-gray-200" />

        {/* Menu */}
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="mb-4 h-12 rounded-lg bg-gray-200"
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* Title */}
        <div className="mb-3 h-10 w-72 rounded bg-gray-200" />

        {/* Subtitle */}
        <div className="mb-8 h-5 w-80 rounded bg-gray-200" />

        {/* Tabs */}
        <div className="mb-8 flex gap-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-36 rounded-lg bg-gray-200"
            />
          ))}
        </div>

        {/* Order cards */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="mb-6 rounded-xl border border-gray-200 p-5"
          >
            <div className="flex gap-4">
              <div className="h-28 w-20 rounded bg-gray-200" />

              <div className="flex-1 space-y-3">
                <div className="h-5 w-48 rounded bg-gray-200" />
                <div className="h-4 w-36 rounded bg-gray-200" />
                <div className="mt-4 h-20 rounded-lg bg-gray-200" />
              </div>

              <div className="h-8 w-32 rounded-full bg-gray-200" />
            </div>

            <div className="mt-6 flex justify-between">
              <div className="h-4 w-40 rounded bg-gray-200" />
              <div className="h-10 w-32 rounded-lg bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetSkeleton;