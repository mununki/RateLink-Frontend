import Link from "next/link";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import { IGraphQLResponse } from "../../types/custom";

interface IInitialProps {
  loggedInUser: IGraphQLResponse;
}
export default ({ loggedInUser }: IInitialProps) => (
  <div className="contents">
    <section className="title pt-5 mx-5 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 title-header">
            <h1>RateLink</h1>
          </div>
          <div className="col-12 col-sm-6 title-menu">
            <ul className="h-100 d-flex align-items-end justify-content-end">
              {loggedInUser.ok ? null : (
                <li className="mx-2">
                  <Link href="/login">
                    <a className="login">Log In</a>
                  </Link>
                </li>
              )}
              {loggedInUser.ok ? null : (
                <li className="mx-2">
                  <Link href="/signup">
                    <a className="signup">Sign Up</a>
                  </Link>
                </li>
              )}
              {loggedInUser.ok ? (
                <li className="badge badge-primary text-wrap p-2 mx-2">
                  <Link href="/rates">
                    <a className="welcome">Welcome, {loggedInUser.data.profile.profile_name}</a>
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section className="feature management">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-8 col-lg-6">
            <h2>Manage your Freight Rates more easily & securely</h2>
            <div className="description">
              You can easily save the freight rates by clients, liners, point-point, effective-date
            </div>
          </div>
          <div className="col-12 col-sm-4 col-lg-6">
            <Slide right ssrReveal>
              <img
                id="img-management"
                src="/static/intro_images/1.jpg"
                alt="manage-your-freight"
                className="shadow rounded"
              />
            </Slide>
          </div>
        </div>
      </div>
    </section>

    <section className="feature search">
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-12 col-sm-4 col-lg-6 overflow-hidden">
            <Slide left ssrReveal>
              <img src="/static/intro_images/2.jpg" alt="manage-your-freight" className="shadow rounded float-right" />
            </Slide>
          </div>
          <div className="col-12 col-sm-8 col-lg-6 pl-5">
            <h2>
              Quick Search &<br /> Quote instantly
            </h2>
            <div className="description">Powerful search will make your decision making more quickly and clearly.</div>
          </div>
        </div>
      </div>
    </section>

    <section className="feature share">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-lg-8">
            <h2>Share your rates with co-workers securely</h2>
            <div className="description">
              You can add your friends in readers list which allows your readers to share your data. You can share your
              data with co-workers, partners, etc.
            </div>
          </div>
          <div className="col-12 mt-5 overflow-hidden">
            <Fade bottom ssrReveal>
              <img
                src="/static/intro_images/3.jpg"
                alt="share-your-freight"
                className="shadow rounded mx-auto d-block"
              />
            </Fade>
          </div>
        </div>
      </div>
    </section>

    <section className="feature mobile">
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-12 col-sm-2 col-lg-4 overflow-hidden">
            <Slide left ssrReveal>
              <img src="/static/intro_images/4.png" alt="mobile" className="rounded float-right" height="300px" />
            </Slide>
          </div>
          <div className="col-12 col-sm-10 col-lg-8 d-flex align-items-end">
            <div className="mb-5">
              <h2>Carry your data anywhere with mobile app</h2>
              <div className="description">
                Mobile app allows you to access your quotations and records wherever you go.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="footer text-center p-4">
      <div>Copyright &copy; 2019 RateLink.</div>
      <div>All Rights Reserved</div>
    </section>

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
        .title-menu ul {
          margin: 0;
        }
        .title-menu li {
          display: inline-block;
          margin-bottom: 16px;
          font-size: 1rem;
        }
        .title-menu li .login,
        .title-menu li .signup {
          color: rgb(12, 52, 75);
        }
        .title-menu li .welcome {
          color: white;
        }
        section.feature.management {
          padding-top: 3rem;
        }
        #img-management {
          position: relative;
          margin-bottom: -50px;
        }
        section.feature.search {
          background-color: #eff3f5;
          padding-top: 10rem;
          padding-bottom: 10rem;
        }
        section.feature.share {
          padding-top: 10rem;
          padding-bottom: 10rem;
        }
        section.feature.mobile {
          padding-top: 10rem;
          padding-bottom: 10rem;
          background-color: #eff3f5;
        }
        .footer {
          background-color: #053f5c;
        }
        .footer div {
          color: white;
        }
      `}
    </style>
  </div>
);
