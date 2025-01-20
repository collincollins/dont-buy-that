function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md mb-8">
      <div className="px-4 py-4 flex flex-col items-center">
        <h2 
          className="
            text-5xl 
            font-bold 
            bubbly-font 
            text-primary 
            bg-gray-100 
            bg-opacity-90 
            px-6 
            py-3 
            rounded-full
          "
        >
          Don't Buy That!
        </h2>
        <p className="text-lg text-gray-700 mt-2">
        Ever wonder what your money could grow into if you skip that purchase?
        </p>
      </div>
    </nav>
  );
}

export default Navbar;