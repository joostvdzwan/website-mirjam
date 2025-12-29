import { Metadata } from 'next';
import VoorWiePage from './content';

export const metadata: Metadata = {
  title: 'Voor Wie | Inzicht & Ordening',
  description: 'Voor wie is deze begeleiding? Kinderen, ouders, jongeren en zwangere vrouwen.',
};

export default function Page() {
  return <VoorWiePage />;
}
