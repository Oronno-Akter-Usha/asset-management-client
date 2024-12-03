import PropTypes from "prop-types";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Button from "../Shared/Button/Button";

const Card = ({ title, description, price, list }) => {
  return (
    <div
      className="rounded-lg 
     bg-white border border-secondary hover:drop-shadow-2xl hover:shadow-2xl p-10 flex flex-col"
    >
      <div className="flex-grow">
        <h2 className=" text-2xl font-medium text-primary">{title}</h2>
        <p>{description}</p>
        <h2 className="text-3xl font-bold mt-5 text-secondary">
          Price: ${price}
        </h2>
        <div className="divider"></div>
        <ul className="space-y-1">
          {list.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <IoMdCheckmarkCircleOutline className="text-secondary" /> {item}
            </li>
          ))}
        </ul>
      </div>

      <Button className={"mt-10"}>Buy Now</Button>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  list: PropTypes.array,
};

export default Card;
