import Menu from "./Menu";

export default function TopBar() {
  return (
    <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-10">
      <div className="px-4 py-3  bg-gray-50 grid md:grid-cols-6 lg:grid-cols-6 grid-cols-2  ">
        {/* Left: menu */}
        <div className="md:col-span-2 col-span-1">
          <div className="space-x-2">
            <div className="flex items-baseline space-x-2">
              <p className="text-xs text-gray-400">NIFTY 50</p>
              <p className="text-sm font-medium">100.2</p>
              <p className="text-xs text-green-500">+0.2%</p>
            </div>
            <div className="flex items-baseline space-x-2">
              <p className="text-xs text-gray-400">SENSEX</p>
              <p className="text-sm font-medium">100.2</p>
              <p className="text-xs text-green-500">+0.2%</p>
            </div>
          </div>
        </div>

        {/* Right: Menu */}
        <div className="col-span-1 md:col-span-4">
          <Menu />
        </div>
      </div>
    </div>
  );
}
