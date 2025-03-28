import packageJson from "@/package.json";

export default function Version() {
  const { next, react } = packageJson.dependencies;

  let [nextV] = next.split(".");
  let [reactV] = react.split(".");

  if (nextV.startsWith("^") || nextV.startsWith("~")) {
    nextV = nextV.slice(1);
  }
  if (reactV.startsWith("^") || reactV.startsWith("~")) {
    reactV = reactV.slice(1);
  }

  return (
    <div className="fixed bottom-3 text-xs text-gray-500 flex gap-2">
      <span>nextV{nextV}</span>
      <span>ReactV{reactV}</span>
    </div>
  );
}
