import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Footer } from '@/components/layout/footer/Footer';
import { HomePage } from '@/components/home/HomePage';
import { AboutPage } from '@/components/about/AboutPage';
import { PatientsPage } from '@/components/patients/PatientsPage';
import { DoctorsPage } from '@/components/doctors/DoctorsPage';
import { ResourcesPage } from '@/components/resources/ResourcesPage';
import { ChatbotPage } from '@/components/chatbot/ChatbotPage';
import { AssessmentPage } from '@/components/assessment/AssessmentPage';
import { ContactPage } from '@/components/contact/ContactPage';
import { ROUTE_PATHS } from '@/config/routes';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path={ROUTE_PATHS.HOME} element={<HomePage />} />
        <Route path={ROUTE_PATHS.ABOUT} element={<AboutPage />} />
        <Route path={ROUTE_PATHS.PATIENTS} element={<PatientsPage />} />
        <Route path={ROUTE_PATHS.DOCTORS} element={<DoctorsPage />} />
        <Route path={ROUTE_PATHS.RESOURCES} element={<ResourcesPage />} />
        <Route path={ROUTE_PATHS.AI_ASSISTANT} element={<ChatbotPage />} />
        <Route path={ROUTE_PATHS.ASSESSMENT} element={<AssessmentPage />} />
        <Route path={ROUTE_PATHS.CONTACT} element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
