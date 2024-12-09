/* eslint-disable react/prop-types */
const PageLayout = ({ children }) => {
  return (
    <div className="mt-10 md:mt-14 mx-auto xl:px-20 md:px-10 sm:px-2 px-4 space-y-14 md:space-y-32">
      {children}
    </div>
  );
};

export default PageLayout;
