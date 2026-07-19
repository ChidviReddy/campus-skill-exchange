import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Code2,
  GraduationCap,
  Palette,
  Sparkles,
} from "lucide-react";

function FloatingCard({
  icon: Icon,
  title,
  color,
  className,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  color: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: [0, -12, 0],
      }}
      transition={{
        opacity: { duration: 0.7, delay },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      className={`absolute flex items-center gap-3 rounded-2xl border border-white/50 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-md ${className}`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>

      <div>
        <p className="font-semibold text-gray-900">
          {title}
        </p>

        <p className="text-sm text-gray-500">
          Popular Skill
        </p>
      </div>
    </motion.div>
  );
}

function StatCard({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.06,
      }}
      className="rounded-2xl border border-white/60 bg-white/80 p-6 text-center shadow-xl backdrop-blur-md"
    >
      <h2 className="text-3xl font-bold text-violet-600">
        {value}
      </h2>

      <p className="mt-2 text-gray-600">
        {label}
      </p>
    </motion.div>
  );
}

export default function HeroIllustration() {
  return (
    <div className="relative hidden h-[700px] items-center justify-center lg:flex">
      <div className="absolute h-[520px] w-[520px] rounded-full bg-gradient-to-br from-violet-300/40 to-fuchsia-300/40 blur-3xl" />

      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex h-[420px] w-[420px] items-center justify-center rounded-full border border-white/60 bg-white/60 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-purple-600 shadow-2xl">
          <GraduationCap className="h-16 w-16 text-white" />
        </div>

        <FloatingCard
          icon={Code2}
          title="React"
          color="bg-sky-500"
          className="-left-12 top-10"
          delay={0.2}
        />

        <FloatingCard
          icon={Brain}
          title="Machine Learning"
          color="bg-pink-500"
          className="-right-16 top-24"
          delay={0.4}
        />

        <FloatingCard
          icon={Palette}
          title="UI / UX"
          color="bg-orange-500"
          className="-left-16 bottom-24"
          delay={0.6}
        />

        <FloatingCard
          icon={BookOpen}
          title="DSA"
          color="bg-emerald-500"
          className="-right-8 bottom-10"
          delay={0.8}
        />
      </motion.div>

      <div className="absolute -bottom-8 left-6">
        <StatCard value="5000+" label="Students" />
      </div>

      <div className="absolute right-4 top-6">
        <StatCard value="120+" label="Skills" />
      </div>

      <div className="absolute bottom-10 right-20">
        <StatCard value="98%" label="Successful Matches" />
      </div>

      <motion.div
        animate={{
          rotate: [0, 20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      >
        <Sparkles className="absolute left-20 top-24 h-8 w-8 text-violet-500" />
      </motion.div>

      <motion.div
        animate={{
          rotate: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <Sparkles className="absolute bottom-36 right-10 h-7 w-7 text-pink-500" />
      </motion.div>

      <motion.div
        animate={{
          rotate: [0, 25, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
      >
        <Sparkles className="absolute right-32 top-16 h-6 w-6 text-indigo-500" />
      </motion.div>
    </div>
  );
}