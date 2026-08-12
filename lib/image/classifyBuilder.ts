export function classifyBuilder(role: string, stack: string): string {
  const normalizedRole = role.toLowerCase();
  const normalizedStack = stack.toLowerCase();
  const combined = `${normalizedRole} ${normalizedStack}`;

  // 1. Web3 / Blockchain / Smart Contracts
  if (
    combined.includes("solidity") ||
    combined.includes("smart contract") ||
    combined.includes("web3") ||
    combined.includes("blockchain") ||
    combined.includes("ethereum") ||
    combined.includes("evm") ||
    combined.includes("rust") && (combined.includes("solana") || combined.includes("anchor"))
  ) {
    return "EVM SHAMAN";
  }

  // 2. Artificial Intelligence / Machine Learning / Data Science
  if (
    combined.includes("ai") ||
    combined.includes("ml") ||
    combined.includes("llm") ||
    combined.includes("agent") ||
    combined.includes("python") && (combined.includes("pytorch") || combined.includes("tensorflow")) ||
    combined.includes("machine learning") ||
    combined.includes("artificial intelligence")
  ) {
    return "NEURAL ARCHITECT";
  }

  // 3. Frontend / UI/UX / Design
  if (
    combined.includes("frontend") ||
    combined.includes("ui") ||
    combined.includes("ux") ||
    combined.includes("design") ||
    combined.includes("css") ||
    combined.includes("figma") ||
    combined.includes("react") ||
    combined.includes("tailwind")
  ) {
    return "PIXEL WIZARD";
  }

  // 4. Backend / DevOps / Infrastructure / Databases
  if (
    combined.includes("backend") ||
    combined.includes("database") ||
    combined.includes("infra") ||
    combined.includes("devops") ||
    combined.includes("docker") ||
    combined.includes("kubernetes") ||
    combined.includes("postgresql") ||
    combined.includes("aws")
  ) {
    return "INFRA GLADIATOR";
  }

  // 5. Fullstack / General Product Builder
  if (
    combined.includes("fullstack") ||
    combined.includes("full-stack") ||
    combined.includes("product") ||
    combined.includes("saas")
  ) {
    return "FULLSTACK COMMANDO";
  }

  // Fallback default class
  return "TERMINAL WIZARD";
}
