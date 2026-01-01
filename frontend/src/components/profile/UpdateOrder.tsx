type UpdateOrderProps = {
  onClose: () => void;
};

const UpdateOrder = ({ onClose }: UpdateOrderProps) => {


    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal box */}
      <div className="bg-white text-gray-600 w-full max-w-md mx-4 p-6 rounded-lg shadow-xl relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Edit Order
        </h2>

        <label className="block text-sm mb-1">Email</label>
        <input
          className="w-full border border-gray-300 rounded p-2 mb-3 outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Enter your email"
        />

        <label className="block text-sm mb-1">Message</label>
        <textarea
          className="w-full border border-gray-300 rounded p-2 resize-none outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Update instructions..."
        />

        <button
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded transition"
        >
          Update Order
        </button>
      </div>
    </div>
  );
};

export default UpdateOrder;
