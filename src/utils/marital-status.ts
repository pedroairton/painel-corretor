export function maritalStatus(status: string | null) {
  if (!status) return "N/A";
  switch (status) {
    case "single":
      return "Solteiro(a)";

      break;
    case "married":
      return "Casado(a)";

      break;
    case "divorced":
      return "Divorciado(a)";

      break;
    case "widowed":
      return "Viúvo(a)";

      break;

    case "stable_union":
      return "União Estável";

      break;

    default:
      return "N/A";
      break;
  }
}
