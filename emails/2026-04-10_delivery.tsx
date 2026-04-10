import { Body, Container, Head, Html, Preview, Text } from '@react-email/components';

interface EmailProps {
  name: string;
}

const EmailBody = ({
  name
}: EmailProps) => {
  const tittle = `Delivering the Take-home`
  const greetingText = `Hello ${name},`

  return (
    <Html>
      <Head />
      <Preview>{tittle}</Preview>
      <Body style={{ backgroundColor: '#F2F0EF', margin: 'auto', fontFamily: "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" }}>
        <Container style={{ marginBottom: '40px', marginLeft: 'auto', marginRight: 'auto', padding: '20px', width: '400px' }}>
          <Text style={{ textAlign: 'start', fontSize: '14px', color: 'black' }}>
            {greetingText}
          </Text>
          <Text style={{ textAlign: 'start', fontSize: '14px', color: 'black'}}>
            You can access the take-home at <a href="https://github.com/paulogdm/resend-cse-task">"paulogdm/resend-cse-task"</a>.
            
            Inside the <code>README.md</code> file, you will be able to see a link to a <a href="https://resend.notion.site/Customer-Success-Engineer-Take-Home-Challenge-06d07cb98e76441e933bf3b73544b728">Notion Workspace</a> containing the other deliverables.
          </Text>
          <Text style={{ textAlign: 'start', fontSize: '14px', color: 'black' }}>
            Thank you for your time, {name}! Sincerely, <a href="https://paulogdm.com">Paulo De Mitri.</a>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailBody;