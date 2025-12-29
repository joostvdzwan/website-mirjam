import { Metadata } from 'next';
import ContactPage from './content';

export const metadata: Metadata = {
  title: 'Contact | Inzicht & Ordening',
  description: 'Neem contact op voor een kennismaking.',
};

export default function Page() {
  return <ContactPage />;
}
