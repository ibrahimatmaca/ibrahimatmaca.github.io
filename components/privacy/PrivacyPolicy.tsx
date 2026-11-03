import React from 'react';
import LegalShell from './LegalShell';
import { usePageTitle } from '../../hooks/usePageTitle';

interface PrivacyPolicyProps {
  title: string;
  htmlContent: string;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ title, htmlContent }) => {
  usePageTitle(`${title} | İbrahim Atmaca`);

  return <LegalShell title={title} html={htmlContent} />;
};

export default PrivacyPolicy;
