import Confirmation from "./pages/Confirmation";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AllOrders from "./pages/AllOrders";
import NotFound from "./pages/NotFound";
import ConfirmationFooter from "@/components/confirmation/ConfirmationFooter";
import DeliveryAddressIssue from "./components/AddressEdit";

const queryClient = new QueryClient();

import TrustSupport from "./pages/TrustSupport";
import ShippingSection from "./components/ShippingSection";
import FAQSection from "./components/FAQSection";

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Confirmation />
                    <TrustSupport />
                    <ConfirmationFooter />
                  </>
                }
              />
              <Route path="/orders" element={<AllOrders />} />
              <Route path="/edit" element={<DeliveryAddressIssue />} />
              <Route path="/tracking" element={<ShippingSection />} />
              <Route path="/all-orders" element={<AllOrders />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
}
