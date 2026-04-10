import { Resend } from 'resend';
import EmailBody from '@/emails/2026-04-10_delivery';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactInfo {
  name: string;
  address: string;
}

const contacts_prod: ContactInfo[] = [
  {
    name: 'Jonni',
    address: ''
  },
  {
    name: 'Brian',
    address: ''
  }
]

const contacts_dev: ContactInfo[] = [
  {
    name: 'Paulo',
    address: 'me@paulogdm.com'
  }
]

export async function POST() {
  const contacts = process.env.RESEND_ENV === 'PROD' ? contacts_prod : contacts_dev;

  try {
  for (const contact of contacts) {

    const { error } = await resend.emails.send({
      from: 'paulogdm <me@resend-dev.paulogdm.com>',
      replyTo: 'me@paulogdm.com',
      to: contact.address,
      subject: 'Paulo De Mitri - Delivery of Take Home',
      react: EmailBody({name: contact.name}),
      // TODO: do not forget attachment.
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }
  }

    return Response.json({success: true});
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
