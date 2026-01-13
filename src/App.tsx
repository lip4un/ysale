import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardHome } from './pages/DashboardHome';
import { Campaigns } from './pages/Campaigns';
import { AiSuggestions } from './pages/AiSuggestions';
import { Connect } from './pages/Connect';
import { Subscription } from './pages/Subscription';
import { Profile } from './pages/Profile';
import { CampaignDetails } from './pages/CampaignDetails';
import { CreativeLibrary } from './pages/CreativeLibrary';
import { AudienceSegments } from './pages/AudienceSegments';
import { CompetitorAnalysis } from './pages/CompetitorAnalysis';
import { SmartRules } from './pages/SmartRules';
import { WhiteLabelSettings } from './pages/WhiteLabelSettings';
import { AdsManager } from './pages/AdsManager';
import { NotFound } from './pages/NotFound';

// Footer pages
import { Features } from './pages/Features';
import { Pricing } from './pages/Pricing';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import { Documentation } from './pages/Documentation';
import { Blog } from './pages/Blog';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { CookiePolicy } from './pages/CookiePolicy';
import { Integrations, Changelog, Careers, Guides, Support, APIReference, GDPR } from './pages/StaticPages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Footer Pages */}
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/support" element={<Support />} />
        <Route path="/api" element={<APIReference />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/gdpr" element={<GDPR />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="campaigns/:id" element={<CampaignDetails />} />
          <Route path="creatives" element={<CreativeLibrary />} />
          <Route path="audiences" element={<AudienceSegments />} />
          <Route path="competitors" element={<CompetitorAnalysis />} />
          <Route path="ai" element={<AiSuggestions />} />
          <Route path="recommendations" element={<AiSuggestions />} />
          <Route path="connect" element={<Connect />} />
          <Route path="rules" element={<SmartRules />} />
          <Route path="whitelabel" element={<WhiteLabelSettings />} />
          <Route path="manager" element={<AdsManager />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
