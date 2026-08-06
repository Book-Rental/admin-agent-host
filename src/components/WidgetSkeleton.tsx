const WidgetSkeleton = () => {
  return (
    <div className="animate-pulse p-6 space-y-6">
      {/* Header */}
      <div className="h-10 w-64 rounded bg-gray-200" />

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-24 rounded-lg bg-gray-200"
          />
        ))}
      </div>

      {/* Table */}
      <div className="space-y-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="h-12 rounded bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
};

export default WidgetSkeleton;