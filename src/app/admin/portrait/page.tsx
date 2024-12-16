import GalleryGrid from '../components/GalleryGrid';
import AdminLayout from '../components/AdminLayout';

export default function PortraitGallery() {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Portrait Gallery</h1>
              <p className="text-gray-400">Manage your rider portrait collection</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add New Image
            </button>
          </div>
        </header>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <GalleryGrid category="portrait" />
        </div>
      </div>
    </AdminLayout>
  );
}
