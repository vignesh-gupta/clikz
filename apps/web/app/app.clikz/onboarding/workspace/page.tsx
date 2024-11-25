import WorkspaceForm from "~/components/onboarding/workspace-form";

const OnboardingWorkspacePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold">
          Welcome to Clikz
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w-xs mx-auto">
          Create your first workspace and start managing your links efficiently
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <WorkspaceForm />
      </div>
    </div>
  );
};

export default OnboardingWorkspacePage;
