const TailwindSizeUtil = () => {
  // eslint-disable-next-line turbo/no-undeclared-env-vars, no-undef
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <div className="fixed left-5 bottom-5 bg-foreground text-background p-2 rounded-lg text-xs font-mono z-50">
      <span className="sm:hidden">xs</span>
      <span className="hidden sm:block md:hidden">sm</span>
      <span className="hidden md:block lg:hidden">md</span>
      <span className="hidden lg:block xl:hidden">lg</span>
      <span className="hidden xl:block 2xl:hidden">xl</span>
      <span className="hidden 2xl:block">2xl</span>
    </div>
  );
};

export default TailwindSizeUtil;
