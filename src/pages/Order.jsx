import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../services/apiOrder";
import Spinner from "../components/Spinner";
import OrderItem from "../components/OrderItem";
import Modal from "../components/Modal";
import Error from "../components/Error";
import OrderForm from "../components/OrderForm";
import { userPassword as getUserPassword } from "../services/storage";
import { useMyContext } from "../services/useMyContext";
const style = {
  display: "grid",
  gridTemplateColumns: "1.8fr .6fr 1fr 1fr .6fr  1fr .8fr .2fr",
  alignItems: "center",
  justifyItems: "center",
  marginBottom: ".8rem",
};

function Order() {
  const password = getUserPassword();

  const { openModal, itemData, openForm } = useMyContext();

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrder(password),
  });

  if (isLoading && !isFetching)
    return (
      <Error>
        Unable to connect to our servers. Check your internet connection
      </Error>
    );
  if (isLoading) return <Spinner />;
  if (isError) return <Error>{error.message}</Error>;
  if (!data.length)
    return (
      <p className="text-center">
        No order placed yet. Go to menu to place an order
      </p>
    );

  return (
    <div>
      {openModal && <Modal deleteId={itemData.id} />}
      {openForm && <OrderForm itemData={itemData} />}
      <ul style={style} className="font-semibold">
        <li className="md:text-base lg:text-lg text-[12px]">Type of meal</li>
        <li className="md:text-base lg:text-lg text-[12px]">Price</li>
        <li className="md:text-base lg:text-lg text-[12px]">
          Number of plates{" "}
        </li>
        <li className="md:text-base lg:text-lg text-[12px]">Type of drink</li>
        <li className="md:text-base lg:text-lg text-[12px]">Price</li>
        <li className="md:text-base lg:text-lg text-[12px]">
          Number of drinks
        </li>
        <li className="md:text-base lg:text-lg text-[12px]">Total</li>
      </ul>

      <div>
        {data.map((order) => (
          <OrderItem order={order} key={order.id} />
        ))}
      </div>
    </div>
  );
}

export default Order;
