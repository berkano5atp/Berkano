import abarniga from '../assets/team/abarniga.jpg';
import olu from '../assets/team/olu.jpg';
import vishmi from '../assets/team/vishmi.jpg';

/**
 * To add a photograph: put a square image (about 600 x 600 px) in src/assets/team/,
 * import it at the top of this file, and set `photo` on that member, as for Vishmi.
 * The initials placeholder is replaced automatically.
 */
export type Member = { name: string; role: string; initials: string; photo?: string };

export const TEAM: Member[] = [
  { name: 'Vishmi De Alwis', role: 'Team Leader', initials: 'VD', photo: vishmi },
  { name: 'Sivabalasundaram Abarniga', role: 'Team Member', initials: 'SA', photo: abarniga },
  { name: 'Olu Wadigasinghe', role: 'Team Member', initials: 'OW', photo: olu },
  { name: 'Hamda Dahalan', role: 'Team Member', initials: 'HD' },
  { name: 'Mohamed Aaqil Aslam', role: 'Team Member', initials: 'MA' },
];
