## What Is This?

This repository contains a small demo of `react-email` and [Resend.com](https://resend.com) in a Next.js app with Pages Router.

You can also check the tickets deliverable 🔐 [in this link](https://www.notion.so/paulogdm/Paulo-De-Mitri-Resend-CSE-Take-Home-Challenge-33d9ff9fd6ce80088953d13e7d28f9a7?source=copy_link).

## Tutorial

> [!NOTE]  
> Before starting, please ensure that `node` ([how do I install Node?](https://nodejs.org/en/download)) and `pnpm` ([how do I install PNPM?](https://pnpm.io/installation)) are installed in your system.

**Creating the Next.js app**

Run the following command to create your Next.js application:

```sh
pnpm create-next-app
```

The code generated will be the foundation for our web app, which can be deployed later if you'd like. Next.js also contains [many examples](https://github.com/vercel/next.js/tree/canary/examples) that can be used as a starting point, depending on your specific needs.

**Setting Up `react-email`**

Now it is time to install [`react-email`](https://react.email/), a library to easily style emails and manage your content. While it contains a method to [automatically set everything up](https://react.email/docs/getting-started/automatic-setup), we are going to do a [manual installation](https://react.email/docs/getting-started/manual-setup) and break down the process. Let's run:

```sh
pnpm add react-email @react-email/preview-server -D -E
```

This command will install the libraries `react-email` and `react-email/preview-server` to your Next.js project. They will be saved in the `development` key of your `package.json` (`-D`), while saving the exact version (`-E`).

Now let's do the same for `react-email/components`:

```sh
pnpm add @react-email/components -E
```

The last step is to add an script to your `package.json` file to help with development:

```json
{
  "scripts": {
    "email:dev": "email dev"
  }
}
```

The script will give you the ability to run `pnpm email:dev` to preview the emails locally, which is very useful for previewing your work.

**Creating your First Email**

Create a new folder at the root of your Next.js projects with the name `email`. Inside this folder, you will be able to create `.tsx` files with the content of your email. Let's add one. Create a file `example.tsx` and then paste the following:

```
const HelloEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>{tittle}</Preview>
      <Body>
          <Text style={{ textAlign: 'start', fontSize: '14px'}}>
            Hello there
          </Text>
      </Body>
    </Html>
  );
};

export default HelloEmail;
```

In this example, we will be using a billing email going forward, which is a slightly advanced improvement over the email above, as it contains variables and other content structures. Feel free to pick more examples at [demo.react.email](https://demo.react.email).

**Creating a Next.js API Route**

Now navigate to your pages router folder (`app/`), and create a new folder called `api`. For the sake of organization, we will create a new folder `send`, and Inside it, create a `route.ts` file. Notice the final path should be `app/api/send/route.ts`. Now let's place the following content:

```typescript
import { Resend } from 'resend';
import HelloEmail from '@/emails/example.tsx';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json()
  const { to } = body
  if (!to) {
      return Response.json({ error: 'Please provide a payload with non-empty \'to\'.' }, { status: 500 });
  }
  try {
    const { data, error } = await resend.emails.send({
      // customize with your own
      from: 'paulogdm <me@resend-dev.paulogdm.com>',
      to,
      subject: 'Email Example',
      react: EmailExample(),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

```

<details>

<summary>Example with the billing email in this repository</summary>

```typescript
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
```

</details>


Now let's test this route!

**Preparing Resend**

Create a `.env` file at the root of your Next.js project if that file does not exist already. Now paste the following: `RESEND_API_KEY=replace_later`.
Go to your [API Keys](https://resend.com/api-keys) page and click in "Create API Key". Pick a good name that you will be able to remember later. After creating your token, copy it and replace `replace_later` with it. Check [this video](./tutorial/creating_key.mp4) as an example.

**Sending Your First Email**

We should be all set to test our first Next.js application with Resend. Run `pnpm dev`, and if no errors are reported, you can run the following in another terminal window to send your first email:

```sh
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"to":"me@paulogdm.com"}' \
  http://localhost:3000/api/send
```
 *Note: the use of `--data` is optional.*
