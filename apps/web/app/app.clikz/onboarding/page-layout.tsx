import React from "react";

type PageLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
};

const PageLayout = ({ children, subtitle, title, icon }: PageLayoutProps) => {
  return (
    <div className="min-h-screen pt-12 md:pt-20 sm:px-6 lg:px-8 animate-fade-in ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex items-center flex-col">
        {icon}
        <h2 className="text-center mt-6  text-lg md:text-2xl font-extrabold">
          {title}
        </h2>
        <p className="text-center mt-1 text-sm text-gray-600 mx-auto text-pretty">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
    </div>
  );
};

export default PageLayout;
