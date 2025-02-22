import { SidebarInset, SidebarProvider } from "@clikz/ui/components/ui/sidebar";

import MaxWidthContainer from "~/components/max-width-container";

import AccountSettingsSidebar from "./_components/account-sidebar";

type AccountSettingsLayoutProps = {
  children: React.ReactNode;
};

const AccountSettingsLayout = ({ children }: AccountSettingsLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AccountSettingsSidebar />
        <SidebarInset>
          <MaxWidthContainer className="md:mt-6 md:py-3">
            {children}
          </MaxWidthContainer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AccountSettingsLayout;
