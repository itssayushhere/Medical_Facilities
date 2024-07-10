import { useNavigate } from "react-router-dom";
const Success = () => {
  const navigate = useNavigate();

  return (
    <div className=" mx-auto">
      <div className=" mt-2 flex flex-col items-center justify-center gap-3">
        <span className=" text-4xl font-semibold font-mono">THANK YOU!</span>
        <span className=" text-center">
          we are getting started on your order right away, and you will receive
          on order confirmation email shortly.In the meantime ,explore the page
          for ordering anthing else.
        </span>
        <button
          className="bg-gray-800 text-white p-3 rounded"
          onClick={() => navigate("/orders")}
        >
          Check Order status
        </button>
      </div>
    </div>
  );
};

export default Success;
