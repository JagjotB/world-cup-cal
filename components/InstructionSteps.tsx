export function InstructionSteps({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div>
      <h3 className="text-base font-bold">{title}</h3>
      <ol className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-2"><span className="font-mono text-[10px] text-gold">{String(index + 1).padStart(2, "0")}</span>{step}</li>
        ))}
      </ol>
    </div>
  );
}
