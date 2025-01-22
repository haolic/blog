import ProjectItem from "./ProjectItem";
import projectData from "./projectData";

export default function ProjectPage() {
  return (
    <div className="w-[800px] p-6">
      {projectData.map((item, index) => {
        return <ProjectItem index={index} key={index} data={item} />;
      })}
    </div>
  );
}
