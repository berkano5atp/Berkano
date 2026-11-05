/**
 * To add a photograph: put the image in public/team/ (square, about 800 x 800 px)
 * and set `photo`, for example photo: '/team/vishmi.jpg'. The placeholder is replaced automatically.
 */
export type Member = { name: string; role: string; initials: string; photo?: string };

export const TEAM: Member[] = [
  { name: 'Vishmi De Alwis', role: 'Team Leader', initials: 'VD' },
  { name: 'Sivabalasundaram Abarniga', role: 'Team Member', initials: 'SA' },
  { name: 'Olu Wadigasinghe', role: 'Team Member', initials: 'OW' },
  { name: 'Hamda Dahalan', role: 'Team Member', initials: 'HD' },
  { name: 'Mohamed Aaqil Aslam', role: 'Team Member', initials: 'MA' },
];
