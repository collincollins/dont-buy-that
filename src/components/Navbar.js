// src/components/Navbar.js

function Navbar() {
  return (
    <nav className="w-[90%] mx-auto bg-gray-100 mb-6 mt-6 rounded-xl border border-black shadow-pixel-lg">
      <div className="max-w-lg mx-auto px-4 py-4 flex flex-col items-center">
        <h2 
          className="
            text-2xl 
            font-bold 
            font-sans
            text-primary 
            bg-primarydark  
            bg-opacity-20
            px-10
            py-2
            rounded-lg
            border border-black shadow-pixel-sm
          "
        >
          Don't Buy That!
        </h2>
        <p className="text-xs text-gray-700 mt-4 px-6">
          Ever wonder what your money could grow into if you skip that purchase?
        </p>
      </div>
    </nav>
  );
}

export default Navbar;