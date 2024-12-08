const Packages = ({ onPackageSelect }) => {
  const packages = [
    { name: "5 Members Plan", memberLimit: 5, price: 5 },
    { name: "10 Members Plan", memberLimit: 10, price: 8 },
    { name: "20 Members Plan", memberLimit: 20, price: 15 },
  ];

  const handlePackageSelect = (pkg) => {
    if (onPackageSelect) onPackageSelect(pkg); // Notify parent component
  };

  return (
    <div>
      <p className="block mb-2 text-sm">Select a Package</p>
      <div className="bg-gray-100 border border-gray-300 rounded-md">
        {packages.map((pkg, index) => (
          <label key={index} className="block mb-4 cursor-pointer">
            <div className="flex">
              <div
                className={`w-full px-3 border-t rounded-md border-gray-300  text-gray-900  focus:outline-primary flex gap-5 items-center`}
              >
                <input
                  type="radio"
                  name="package"
                  value={pkg.name}
                  onChange={() => handlePackageSelect(pkg)}
                  required
                />
                <div className="w-full flex items-center justify-between mt-3">
                  <div>
                    <p className="font-normal text-base">{pkg.name}</p>
                    <p className="text-sm text-gray-600">
                      Member Limit: {pkg.memberLimit}
                    </p>
                  </div>
                  <p className="font-medium text-lg">${pkg.price}</p>
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Packages;
