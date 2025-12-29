import { Metadata } from 'next';
import WerkwijzePage from './content';

export const metadata: Metadata = {
  title: 'Werkwijze | Inzicht & Ordening',
  description: 'Mijn werkwijze: kortdurend, nuchter en gericht op autonomie. Narratief werken en psychosociale begeleiding.',
};

export default function Page() {
  return <WerkwijzePage />;
}
