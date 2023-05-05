import './projectpage.scss';

export const ProjectPage = () => {
  return (
    <section className="main__project project __container">
      <h2 className="project__title">Project</h2>
      <div className="project__block">
        <div className="project__right">
          <div className="project__cards">
            <h2 className="project__chapter">ABOUT-THE-PROJECT</h2>
            <div className="project__text">
              The task is to implement a playground/IDE to work with graphQL queries. GraphQL is a
              query language used by client applications to manipulate data. GraphQL is associated
              associated with a concept such as "schema" which is something that allows you to
              organize the creation, reading, updating, and deleting of data in an application.
              GraphiQL is an open source tool. In addition to creating the site itself to work with
              graphQL queries, you need to implement authorization/authentication capabilities to
              give access to the tool only to authorized users. As for the design, the design,
              prototype, as well as the implementation of the application on the job is up to us.
            </div>
          </div>
        </div>

        <div className="project__left">
          <div className="project__cards">
            <h2 className="project__caption">BACKEND</h2>
            <div className="project__text">
              It should also be noted that, according to the assignment, the application does not
              require a server part. We can use any GraphQL open API that supports CORS, Or we can
              create a proxy service as a part of our application and use it to make queries to any
              GraphQL API (even those that don't support CORS). Because of this, it was decided by
              the team that we will use the open API of GraphQL.
            </div>
          </div>
          <div className="project__cards">
            <h2 className="project__caption">APPLICATION-STRUCTURE</h2>
            <div className="project__text">
              <ul>
                <li>- Home Page</li>
                <li>- User Authentication</li>
                <li>- GraphiQL page</li>
                <li>- 404 page</li>
              </ul>
            </div>
          </div>
          <div className="project__cards">
            <h2 className="project__caption">STACK</h2>
            <div className="project__text">
              <ul>
                <li>- React</li>
                <li>- Redux</li>
                <li>- TypeScript</li>
                <li>- Saas</li>
                <li>- Vite</li>
                <li>- Firebase</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
