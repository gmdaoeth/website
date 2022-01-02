const BrandButton = ({ text }: { text: string }) => {
  return (
    <button className="bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-sm focus:outline-none focus:shadow-outline">
      {text}
    </button>
  );
};

export default BrandButton;
