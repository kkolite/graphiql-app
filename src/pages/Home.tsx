import { ProjectPage } from '../components/section/project';
import { CoursePage } from '../components/section/course';

export const Home = () => {
  return (
    <>
      <ProjectPage />
      <CoursePage />

      <section className="main__developer developer"></section>
    </>
  );
};
