import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerifyEmailProps {
  name: string;
  verificationCode: string;
  verificationLink: string;
}

const VerifyEmail = ({
  name = "User",
  verificationCode,
  verificationLink,
}: VerifyEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verify your email to get started with Clikz</title>
      </Head>
      <Preview>Verify your email to complete signup</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto p-[24px] max-w-[600px]">
            <Img
              src="https://www.clikz.live/logo-dark.png"
              width="75"
              height="75"
              alt="Clikz Logo"
              className="object-cover rounded-full mx-auto"
            />

            <Section className="mb-[32px]">
              <Heading className="text-[20px] font-bold text-gray-800 mb-[16px] text-center">
                Verify your email to complete signup
              </Heading>

              <Text className="text-[16px] text-gray-600 mb-[24px]">
                Hello {name},
              </Text>

              <Text className="text-[16px] text-gray-600 mb-[24px]">
                Thanks for signing up for Clikz! To complete your account setup,
                click the button below or use the verification code. The code is
                valid for the next 10 minutes.
              </Text>

              <Section className="text-center mb-[24px]">
                <Button
                  href={verificationLink}
                  className="bg-[#000000] text-white rounded-[8px] py-[12px] px-[24px] text-[16px] font-medium no-underline text-center box-border"
                >
                  Verify Email
                </Button>
              </Section>

              <Text className="text-[16px] text-gray-600 mb-[16px] text-center">
                Or use this verification code:
              </Text>

              <Section className="border-2 border-gray-200 rounded-[8px] py-[24px] px-[16px] mb-[24px] text-center">
                <Text className="text-[32px] font-bold tracking-[4px] text-gray-800">
                  {verificationCode}
                </Text>
              </Section>

              <Text className="text-[14px] text-gray-500 mb-[32px]">
                If you didn't request this code, you can ignore this email.
              </Text>
            </Section>

            <Section className="border-t border-gray-200 pt-[24px] text-center">
              <Text className="text-[12px] text-gray-500 m-0">
                © 2025 Clikz. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

VerifyEmail.PreviewProps = {
  name: "John",
  verificationCode: "000000",
  verificationLink: "https://clikz.com/verify?code=000000",
};

export default VerifyEmail;
