import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export const InviteMember = ({
  inviterName = "Alex Chen",
  inviteeName = "Taylor",
  teamName = "Design Collective",
  href = "https://example.com/accept-invite",
}) => {
  return (
    <Html>
      <Head />
      <Preview>
        You've been invited to join {teamName} by {inviterName}
      </Preview>
      <Tailwind>
        <Body className="bg-[#f5f5f7] font-sans py-[40px]">
          <Container className="bg-white rounded-[12px] mx-auto my-0 p-[32px] max-w-[600px] shadow-sm">
            <Section>
              <Heading className="text-[24px] font-semibold text-[#1d1d1f] m-0 mb-[24px]">
                You've been invited to join a team
              </Heading>

              <Text className="text-[16px] leading-[24px] text-[#424245] mb-[16px]">
                Hello {inviteeName},
              </Text>

              <Text className="text-[16px] leading-[24px] text-[#424245] mb-[24px]">
                <span className="font-semibold">{inviterName}</span> has invited
                you to join <span className="font-semibold">{teamName}</span> as
                a team member. Join now to start collaborating.
              </Text>

              <Section className="text-center my-[32px]">
                <Button
                  href={href}
                  className="bg-[#000000] text-white rounded-[8px] py-[12px] px-[24px] text-[16px] font-medium no-underline text-center box-border"
                >
                  Accept Invitation
                </Button>
              </Section>

              <Text className="text-[14px] leading-[20px] text-[#6e6e73] mb-[24px]">
                If the button doesn't work, you can also accept the invitation
                by clicking this link:
                <br />
                <Link href={href} className="text-[#0066cc] no-underline">
                  {href}
                </Link>
              </Text>

              <Text className="text-[14px] leading-[20px] text-[#6e6e73] mb-[8px]">
                This invitation will expire in 7 days.
              </Text>
            </Section>

            <Hr className="border-[#e5e5e5] my-[32px]" />

            <Section>
              <Text className="text-[12px] leading-[16px] text-[#86868b] m-0">
                If you weren't expecting this invitation, you can safely ignore
                this email.
              </Text>
            </Section>
          </Container>

          <Container className="max-w-[600px] mx-auto mt-[32px] text-center">
            <Text className="text-[12px] leading-[16px] text-[#86868b] m-0">
              © {new Date().getFullYear()} {teamName}. All rights reserved.
            </Text>
            <Text className="text-[12px] leading-[16px] text-[#86868b] m-0">
              123 Team Street, Suite 100, San Francisco, CA 94107
            </Text>
            <Text className="text-[12px] leading-[16px] text-[#86868b] mt-[8px]">
              <Link
                href="https://example.com/unsubscribe"
                className="text-[#86868b] underline"
              >
                Unsubscribe
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InviteMember;
