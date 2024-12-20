// "use client"

const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-SkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">New feature release: Dark Mode!</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2024-12-30
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            We are excited to announce the release of Dark Mode. Now you can
            switch to a darker theme to reduce eye strain and save battery life
            on your devices.
          </p>
        </div>
        <div className="bg-PurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">
              Scheduled Maintenance on January 5th
            </h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2025-01-05
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Please be advised that there will be scheduled maintenance on
            January 5th. During this time, some services may be temporarily
            unavailable. We apologize for any inconvenience this may cause and
            appreciate your understanding.
          </p>
        </div>
        <div className="bg-SkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">New User Onboarding Guide</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2024-01-10
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            We have created a comprehensive onboarding guide to help new users
            get started with our platform. This guide covers all the essential
            features and provides step-by-step instructions to ensure a smooth
            onboarding experience.
          </p>
        </div>
        <div className="bg-PurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Quarterly Performance Review</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
              2024-01-15
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Our quarterly performance review is scheduled for January 15th. This
            review will cover the key achievements and areas for improvement
            over the past quarter. We encourage all team members to participate
            and provide their valuable feedback.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
