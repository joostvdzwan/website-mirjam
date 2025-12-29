import { Metadata } from 'next';
import FAQPage from './content';

export const metadata: Metadata = {
  title: 'Kennis & Vragen | Inzicht & Ordening',
  description: 'Veelgestelde vragen en psycho-educatie zoeker.',
};

export default function Page() {
  return <FAQPage />;
}
