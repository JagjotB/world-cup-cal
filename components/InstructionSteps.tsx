export function InstructionSteps({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div>
      <h3 className="text-base font-bold text-ink">{title}</h3>
      <ol className="mt-3 grid gap-2 text-sm leading-6 text-ink/70">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
