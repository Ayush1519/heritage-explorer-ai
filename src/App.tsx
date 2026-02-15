import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FloatingChatbot from "@/components/FloatingChatbot";
import Index from "./pages/Index";
import HeritagePage from "./pages/HeritagePage";
import StoriesPage from "./pages/StoriesPage";
import BiodiversityPage from "./pages/BiodiversityPage";
import QuizzesPage from "./pages/QuizzesPage";
import CommunityPage from "./pages/CommunityPage";
import NotFound from "./pages/NotFound";
import Visit from "./components/Visit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/heritage" element={<HeritagePage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/biodiversity" element={<BiodiversityPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <FloatingChatbot />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
