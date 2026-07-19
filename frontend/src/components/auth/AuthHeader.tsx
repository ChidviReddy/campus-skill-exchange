interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center lg:text-left">
      {/* Logo */}
      <div className="mb-6 flex items-center justify-center gap-3 lg:justify-start">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-xl font-bold text-white shadow-lg">
          S
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900">
            SkillSwap
          </h1>

          <p className="text-sm text-gray-500">
            Learn • Teach • Grow
          </p>
        </div>
      </div>

      {/* Page Title */}
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>

      {/* Subtitle */}
      <p className="mt-2 text-gray-600">
        {subtitle}
      </p>
    </div>
  );
}