import './developerpage.scss';
import cats from '../../assets/cats.jpg';

export const DeveloperPage = () => {
  return (
    <section className="main__developer developer">
      <div className="developer__container">
        <h2 className="developer__title">Developer</h2>
        <div className="developer__block">
          <div className="developer__cards">
            <h2 className="developer__chapter">ABOUT-US</h2>
            <div className="developer__text">
              We are a friendly team that develops and implements a playground/IDE to work with
              graphQL requests. The first item on the list of tasks is to agree on the stages and
              progress of the implementation. To do this, we used the following tools
            </div>
          </div>
          <div className="developer__cards">
            <h2 className="developer__caption">YouTrack</h2>
            <div className="developer__text">
              YouTrack is a project management tool that adapts to the needs of different teams in a
              company. In YouTrack, you can plan projects and track tasks, use Agile boards,
              organize sprints and releases, maintain a knowledge base, use a Gantt chart, track
              turnaround time, create reports and dashboards, and customize workflows. YouTrack is
              fully customizable to the business processes of various teams, from small startups to
              corporations.
            </div>
          </div>
          <div className="developer__cards">
            <h2 className="developer__caption">Figma</h2>
            <div className="developer__text">
              Figma is a cloud-based design and prototyping tool that allows users to create and
              collaborate on the design of websites, mobile apps and other digital products. It is a
              browser-based tool, meaning you can use it on any device with an Internet connection.
            </div>
          </div>
          <div className="developer__cards">
            <h2 className="developer__caption">VS Code</h2>
            <div className="developer__text">
              Visual Studio Code is a tool for layout designers and programmers that is one of the
              most popular in its niche. It's free and open, and you can make it whatever you want
              for your tasks.
            </div>
          </div>
        </div>
      </div>
      <div className="developer__fon-cats">
        <img src={cats} alt="he cat's smile" />
      </div>
    </section>
  );
};
