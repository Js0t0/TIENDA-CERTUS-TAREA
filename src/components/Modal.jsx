import { useContext, useState } from "react";
import { ContextCart } from "../context/ContextCart";

export const Modal = () => {
  const [active, setActive] = useState(false);

  const { cartShopping, setCartShopping } = useContext(ContextCart);

  const deleteProduct = (product) => {
    const results = cartShopping.filter((item) => item.id !== product.id);
    setCartShopping(results);
  };

  const deleteAll = () =>{
    setCartShopping([]);
  }

  return (
    <>
      <div className=" flex flex-row cursor-pointer truncate p-2 px-4  rounded ">
        <div className="flex flex-row-reverse ml-2 w-full">
          <div
            slot="icon"
            className="relative"
            onClick={() => setActive(!active)}
          >
            <div className="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-red-700 text-white">
              {cartShopping.length}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-shopping-cart w-6 h-6 mt-2"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
        </div>
      </div>

      <div
        className="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="false"
      >
        <div
          className={`  bg-gray-500 border bg-opacity-75 transition-opacity ${
            active ? "" : "hidden cart"
          }`}
        ></div>

        <div className={` ${active ? "" : "hidden cart"} `}>
          <div className="absolute inset-0 overflow-hidden mr-20 ">
            <div className="pointer-events-none fixed right-72 top-16  flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md ">
                <div className=" border flex h-96 mt-2 max-w-md flex-col  bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between ">
                      <h2
                        className="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Carrito de Compras
                      </h2>
                      <div className="ml-3 flex h-7 items-center ">
                        <button
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setActive(!active)}
                        >
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {cartShopping.length ? (
                      <>
                        <div className="mt-4">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartShopping.map((product) => (
                                <li className="flex py-6" key={product.id}>
                                  <div className="h-24 w-26 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image}
                                      alt="image"
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href="#">{product.title}</a>
                                        </h3>
                                        <p className="ml-4">
                                          S/.{product.price}
                                        </p>
                                      </div>
                                      <p className="mt-2 text-sm text-gray-500">
                                        {product.category}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="font-bold text-gray-600">
                                        Cantidad: {product.quantity}
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => deleteProduct(product)}
                                        >
                                          Eliminar
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                            <div className="border-t border-gray-200 mt-3 px-4 py-6 sm:px-6">
                              <div className="flex justify-between text-base font-bold text-gray-900">
                                <p>TOTAL</p>
                                <p>
                                  S/.
                                  {cartShopping
                                    .reduce((acumulador, product) => {
                                      return (
                                        acumulador +
                                        product.price * product.quantity
                                      );
                                    }, 0)
                                    .toFixed(2)}
                                </p>
                              </div>

                              <div className="mt-6">
                                <a
                                  href="#"
                                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                  Checkout
                                </a>
                              </div>
                              <button
                                type="button"
                                className="font-bold mt-2 ml-52 text-indigo-600 hover:text-indigo-500"
                                onClick={()=>deleteAll()}
                              >
                                Eliminar Todo
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <h3 className="text-lg mt-5 ml-20 font-extrabold text-gray-600 ">
                        Aun no se a añadido productos{" "}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
