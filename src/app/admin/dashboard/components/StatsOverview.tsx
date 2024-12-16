interface StatsOverviewProps {
  totalImages: number;
  totalCollections: number;
  recentUploads: number;
}

export default function StatsOverview({
  totalImages,
  totalCollections,
  recentUploads,
}: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-400">Total Images</h3>
        <p className="text-3xl font-bold text-white mt-2">{totalImages}</p>
      </div>
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-400">Total Collections</h3>
        <p className="text-3xl font-bold text-white mt-2">{totalCollections}</p>
      </div>
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-400">Recent Uploads</h3>
        <p className="text-3xl font-bold text-white mt-2">{recentUploads}</p>
      </div>
    </div>
  );
}
