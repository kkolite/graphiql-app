export const Home = () => {
  return (
    <>
      <section className="main__project project __container">
        <h2 className="project__title">Project</h2>
        <div className="project__block">
          <div className="project__right">
            <div className="project__сolumn-right">
              <div className="project__about">
                <h2 className="project__chapter">ABOUT-THE-PROJECT</h2>
                <div className="project__text">
                  The task is to implement a playground/IDE to work with graphQL queries. GraphQL is
                  a query language used by client applications to manipulate data. GraphQL is
                  associated with a concept such as "schema" which is something that allows you to
                  organize the creation, reading, updating, and deleting of data in an application.
                  GraphiQL is an open source tool. In addition to creating the site itself to work
                  with graphQL queries, you need to implement authorization/authentication
                  capabilities to give access to the tool only to authorized users. As for the
                  design, the design, prototype, as well as the implementation of the application on
                  the job is up to us.
                </div>
              </div>
            </div>

            <div className="project__сolumn-left"></div>
          </div>

          <div className="project__left"></div>
        </div>
      </section>
      <section className="main__course course"></section>
      <section className="main__developer developer"></section>
    </>
  );
};
