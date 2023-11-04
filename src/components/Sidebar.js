import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import CartItem from "../components/CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import EmptyIMG from "../img/empty.png";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, total, itemAmount } = useContext(CartContext);
  const cartIsEmpty = cart.length === 0;

  const handleCheckoutClick = () => {
    handleClose();
  };

  return (
    <Link
      to="/"
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-lg font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[520px] lg:h-[640px] overflow-y-auto overflow-x-hidden border-b">
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
        <div className="flex flex-col gap-y-3 py-4 mt-4">
          {cartIsEmpty ? (
            <>
              <div className="text-center mt-10">
                <img src={EmptyIMG} alt="Empty Cart" className="mx-auto" />
              </div>
              <div className="text-center text-primary text-xl mb-4">
                No items in your bag
              </div>
            </>
          ) : (
            // Individual item prices and quantities
            <div className="mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>₹ {item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
          {/* Total price */}
          <div className="flex justify-between items-center mb-4">
            <div className="font-semibold">
              <span className="mr-2 text-xl">Total :</span>
              <span className="text-xl"> ₹ {total.toFixed(2)}</span>
            </div>
          </div>
          {!cartIsEmpty && (
            <Link
              to="/checkout"
              onClick={handleCheckoutClick}
              className="bg-primary flex p-4 justify-center items-center text-white text-lg w-full font-medium transition duration-150 hover:bg-fadeCustom hover:text-black "
            >
              Checkout
            </Link>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Sidebar;
