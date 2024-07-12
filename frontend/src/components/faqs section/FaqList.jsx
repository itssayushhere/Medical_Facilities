import { faqs } from "../../assets/data/faqs";
import Faqitems from "./Faqitems";

const FaqList = () => {
  return (
    <>
      <ul className="mt-[38px]">
        {faqs.map((item, index) => (
          <Faqitems item={item} key={index} />
        ))}
      </ul>
    </>
  );
};

export default FaqList;
