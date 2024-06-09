import InsightRoll from "@/src/components/About/InsightRoll";

const insights = [
  "20+ Projects Completed",
  "AWS Cloud Practitioner Certified",
  "3+ Years of Freelancing",
  "99% Client Satisfaction",
  "Contributed to training AI LLMs 📝",
  "Recipient of Bachelor's in Engineering from University of Michigan 🏆",
];

export default function AboutLayout({ children }) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}
