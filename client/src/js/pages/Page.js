import '../../css/Page.css';

const Page = ({ children }) => {
  return (
    <div className="page-bg flex text-gray-100 quicksand">
      <div className="md:m-7 w-full page-modal">{children}</div>
    </div>
  );
};

export default Page;
