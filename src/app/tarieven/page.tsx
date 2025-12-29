import { Metadata } from 'next';
import TarievenPage from './content';

export const metadata: Metadata = {
  title: 'Tarieven & Investering | Inzicht & Ordening',
  description: 'Transparante tarieven voor kortdurende trajecten. Geen verrassingen.',
};

export default function Page() {
  return <TarievenPage />;
}
