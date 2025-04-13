import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { XIcon } from "lucide-react";

export const InviteMember = ({
  inviterName = "Alex Chen",
  inviteeName = "Taylor",
  teamName = "Design Collective",
  teamImageUrl = "https://api.dicebear.com/9.x/thumbs/svg?seed=test",
  acceptUrl = "https://example.com/accept-invite",
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
            <Section className="flex items-center justify-center mb-[32px]">
              <Row>
                <Column align="right">
                  <Img
                    src={teamImageUrl}
                    width="75"
                    height="75"
                    alt="Clikz Logo"
                    className="object-cover rounded-full"
                  />
                </Column>
                <Column align="center" className="px-4">
                  <XIcon className="text-[#e5e5e5]" size={24} />
                </Column>
                <Column align="left">
                  <Img
                    src="https://www.clikz.live/logo-dark.png"
                    width="75"
                    height="75"
                    alt="Clikz Logo"
                    className="object-cover rounded-full"
                  />
                </Column>
              </Row>
            </Section>
            <Section>
              <Heading className="text-[24px] font-semibold text-[#1d1d1f] m-0 mb-[24px] text-center">
                You've been invited to join a team
              </Heading>

              <Text className="text-[16px] leading-[24px] text-[#424245] mb-[16px]">
                Hello {inviteeName},
              </Text>

              <Text className="text-[16px] leading-[24px] text-[#424245] mb-[24px]">
                You have been invited to join{" "}
                <span className="font-semibold">{teamName}</span> as a team
                member on <span className="font-semibold">Clikz</span>. Join now
                to start collaborating.
              </Text>

              <Section className="text-center my-[32px]">
                <Button
                  href={acceptUrl}
                  className="bg-[#000000] text-white rounded-[8px] py-[12px] px-[24px] text-[16px] font-medium no-underline text-center box-border"
                >
                  Accept Invitation
                </Button>
              </Section>

              <Text className="text-[14px] leading-[20px] text-[#6e6e73] mb-[24px]">
                If the button doesn't work, you can also accept the invitation
                by clicking this link:
                <br />
                <Link href={acceptUrl} className="text-[#0066cc] no-underline">
                  {acceptUrl}
                </Link>
              </Text>

              <Text className="text-[14px] leading-[20px] text-[#6e6e73] mb-[8px]">
                This invitation will expire in 14 days.
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
              © {new Date().getFullYear()} Clikz. All rights reserved.
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
