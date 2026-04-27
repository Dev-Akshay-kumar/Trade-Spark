import { createContext, useState } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./sellActionWindow";
const GeneralContext = createContext({
  openBuyWindow: (uid) => {},
  closeWindow: () => {},
  openSellWindow:()=>{},
});

export const GeneralContextProvider = ({ children }) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);

  const openBuyWindow = (uid) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const closeWindow = () => {
    setIsBuyWindowOpen(false);
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
  };

   const openSellWindow = (uid) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(uid);
  };

  return (
    <GeneralContext.Provider
      value={{ openBuyWindow, closeWindow , openSellWindow }}
    >
      {children}

      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} />
      )}
      {
        isSellWindowOpen && (
          <SellActionWindow uid={selectedStockUID} />
        )
      }
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
