function StatusBadge({ status }) {
  const statusClass = (status) => {
    switch (status?.toLowerCase() ?? "-") {
      case "in-progress":
      case "wip":
      case "uploaded":
      case "pending":
      case "submitted":
        return "bg-warning-bg text-warning-text";
      case "active":
      case "done":
      case "approved":
      case "accepted":
        return "bg-success-bg text-success-text";
      case "backlog":
      case "na":
        return "bg-background-alt text-heading";
      case "n/a":
        return "bg-border-subtle text-white";
      case "cancelled":
        return "bg-error-bg text-error-text";

      default:
        return "text-primary bg-[#E2E8FF]";
    }
  };
  return (
    <>
      <span
        className={`StatusBadge ${statusClass(
          status
        )} min-w-[50px] capitalize tex px-2 font-medium text-base py-1 rounded-[5px]`}
      >
        <span>{status.toLowerCase().replace("_", " ")} </span>
      </span>
    </>
  );
}

export default StatusBadge;
