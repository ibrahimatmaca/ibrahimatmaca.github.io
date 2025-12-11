import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Support from './components/Support';
import ElevanaPrivacy from './components/privacy/ElevanaPrivacy';
import KidTalesPrivacy from './components/privacy/KidTalesPrivacy';
import GeneralPrivacy from './components/privacy/GeneralPrivacy';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/support" element={<Support />} />
      <Route path="/elevana-privacy" element={<ElevanaPrivacy />} />
      <Route path="/kidtales-privacy" element={<KidTalesPrivacy />} />
      <Route path="/privacy-policy" element={<GeneralPrivacy />} />
    </Routes>
  );
};