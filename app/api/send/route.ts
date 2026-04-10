import { Resend } from 'resend';
import BillingEmail from '@/emails/2026-04-10_billing';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json()
  const { to } = body
  if (!to) {
      return Response.json({ error: 'Please provide a payload with non-empty \'to\'.' }, { status: 500 });
  }
  try {
    const { data, error } = await resend.emails.send({
      from: 'paulogdm <me@resend-dev.paulogdm.com>',
      to,
      subject: 'Billing Email Example',
      react: BillingEmail({ username: 'John Raider', teamName: 'Raider', amountInCents: 100000 }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
