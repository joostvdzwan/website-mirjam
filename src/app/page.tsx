import { Metadata } from 'next';
import HomePage from './home-content';

export const metadata: Metadata = {
  title: 'Praktijk Inzicht & Ordening | Psychologische Begeleiding',
  description: 'Onafhankelijk & Psychologisch. Kortdurende begeleiding voor wie regie zoekt in een overweldigende fase.',
};

export default function Page() {
  return <HomePage />;
}
