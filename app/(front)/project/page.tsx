import ProjectItem from "./ProjectItem";

export default function ProjectPage() {
  return (
    <div className="max-w-[700px] p-6">
      <ProjectItem index={0} />
      <ProjectItem index={1} />
      <ProjectItem index={2} />
      <ProjectItem index={3} />
    </div>
  );
}
