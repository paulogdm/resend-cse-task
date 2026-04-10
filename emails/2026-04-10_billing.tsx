import { Body, Button, Container, Head, Html, Preview, Section, Text } from '@react-email/components';

interface EmailProps {
  username: string;
  teamName: string;
  amountInCents: number;
}

function formatAmount(amount: number): string {
  // Keeping it simple for now
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

/**
 * A few observations:
 *  - There should be logic in place to prevent this email from firing if the amount is below a certain threshold, like 1 USD.
 *  - I am not considering team scopes and other variables, as the focus is not on that at this time.
 * 
 */
const BillingEmail = ({
  username = 'Developer',
  teamName = 'Resend',
  amountInCents = 100,
}: EmailProps) => {
  const tittle = `Payment Failed`
  const greetingText = `Hello ${username},`

  return (
    <Html>
      <Head />
      <Preview>{tittle}</Preview>
      <Body style={{ backgroundColor: 'black', margin: 'auto', fontFamily: "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" }}>
        <Container style={{ marginBottom: '40px', marginLeft: 'auto', marginRight: 'auto', padding: '20px', width: '465px' }}>
          <Text style={{ textAlign: 'start', fontSize: '14px', color: 'white' }}>
            {greetingText}
          </Text>
          <Text style={{ textAlign: 'start', fontSize: '14px', color: 'white', lineHeight: '1.625' }}>
            {/* Ideally, some code to match scope links here */}
            We were unable to process your payment of <strong>{formatAmount(amountInCents)}</strong> for the team <a href='https://resend.com/'>{teamName}</a>.
            Please update your <a href='https://resend.com/settings/billing'>billing information</a> at your earliest convenience to avoid any interruption to your service.
          </Text>
          <Section style={{ textAlign: 'center', marginTop: '32px', marginBottom: '32px' }}>
            <Button
              style={{ padding: '10px 20px', backgroundColor: 'white', borderRadius: '6px', color: 'black', fontSize: '14px', fontWeight: 'semibold', textDecoration: 'none', textAlign: 'center' }}
              href={`https://resend.com/settings/billing`}
            >
              Update Billing Information
            </Button>
          </Section>
          <Text style={{ textAlign: 'start', fontSize: '14px', color: 'white' }}>
            If you require additional support, or if you have any questions about your bill, please reach out to us at <a href={`https://resend.com/help`}>resend.com/help</a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BillingEmail;