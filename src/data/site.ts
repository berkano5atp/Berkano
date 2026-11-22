export const CONTACT_EMAIL = 'berkano5atp@gmail.com';

const mail = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const MAILTO = {
  general: mail('Hello from the Berkano website', 'Hi Berkano team,\n\n'),
  interest: mail(
    'Please add me to the Berkano interest list',
    'Hi Berkano team,\n\nPlease let me know when there is news about Berkano.\n\n(There is no need to include any health information.)\n',
  ),
  feedback: mail('Feedback on the Berkano concept', 'Hi Berkano team,\n\nI would like to share some feedback on the Berkano concept.\n\n'),
};

/**
 * Add real accounts here when the team has them, e.g. { label: 'Instagram', href: 'https://...' }.
 * The footer shows this list only when it has entries, so nothing fake is ever displayed.
 */
export const SOCIAL_LINKS: { label: string; href: string }[] = [];
