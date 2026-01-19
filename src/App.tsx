import { RoomsProvider } from "./context/RoomsContext";
import { AddRoomForm } from "./components/AddRoomForm";
import { RoomList } from "./components/RoomList";
import { SearchAllocate } from "./components/SearchAllocate";

function App() {
  return (
    <RoomsProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-center">
                  Hostel Room Manager
                </h1>
                <p className="text-purple-100 text-sm mt-1">
                  Smart Room Allocation System
                </p>
              </div>
              <div className="hidden md:block text-right text-purple-100 text-sm">
                <p>Manage your hostel rooms efficiently</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <AddRoomForm />
            </div>
            <div>
              <SearchAllocate />
            </div>
          </div>
          <RoomList />
        </main>

        {/* Footer */}
        <footer className="bg-slate-800 text-slate-300 text-center py-8 mt-16 border-t border-slate-700">
          <p className="text-sm">
            © {new Date().getFullYear()} Hostel Room Manager • Smart Allocation
            System
          </p>
        </footer>
      </div>
    </RoomsProvider>
  );
}

export default App;
