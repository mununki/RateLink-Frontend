import logout from "../../lib/logout";
import Link from "next/link";
import { ApolloConsumer } from "react-apollo";
import Slide from "react-reveal/Slide";

export default () => (
  <div className="contents">
    <section className="title pt-5 mx-5 mb-5">
      <div className="container">
        <h1>RateLink</h1>
      </div>
    </section>

    <section className="feature">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-8 col-lg-6 pl-5">
            <h2>Manage your Freight Rates more easily & securely</h2>
            <div className="description">
              You can easily save the freight rates by clients, liners,
              point-point, effective-date
            </div>
          </div>
          <div className="col-12 col-sm-4 col-lg-6 overflow-hidden">
            <Slide right ssrReveal>
              <img
                src="/static/intro_images/1.jpg"
                alt="manage-your-freight"
                className="shadow rounded"
              />
            </Slide>
          </div>
        </div>
      </div>
    </section>

    <section className="feature">
      <div className="container-fluid">
        <div className="row justify-content-end">
          <div className="col-12 col-sm-4 col-lg-6 overflow-hidden">
            <Slide left ssrReveal>
              <img
                src="/static/intro_images/2.jpg"
                alt="manage-your-freight"
                className="shadow rounded float-right"
              />
            </Slide>
          </div>
          <div className="col-12 col-sm-8 col-lg-6 pl-5 pr-3">
            <h2>Quick Search & Quote instantly</h2>
            <div className="description">
              Powerful search will make your decision making more quickly and
              clearly.
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="feature">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-lg-8">
            <h2>Share your rates with co-workers securely</h2>
            <div className="description">
              You can add your friends in readers list which allows your readers
              to share your data. You can share your data with co-workers,
              partners, etc.
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="feature">
      <div className="container">
        <div className="row justify-content-end">
          <div className="col col-sm-10 col-lg-8">
            <h2>Carry your data anywhere with mobile app</h2>
            <div className="description">
              Mobile app allows you to access your quotations and records
              wherever you go.
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>Footer here</section>

    <style jsx>
      {`
        .contents {
          background-color: white;
        }
        div {
          color: rgb(12, 52, 75);
          font-family: "Open Sans", sans-serif;
        }
        .description {
          font-size: 1.2rem;
        }
        section.feature {
          padding-top: 5rem;
          padding-bottom: 10rem;
        }
      `}
    </style>
  </div>
);
