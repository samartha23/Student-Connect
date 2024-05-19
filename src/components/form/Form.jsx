const Form = ({ children, label }) => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <form className="w-[400px] rounded-lg border border-gray-200 bg-white p-7 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-5 text-2xl font-bold text-gray-900 dark:text-white">
          {label}
        </div>
        {children}
      </form>
    </div>
  );
};

export default Form;
