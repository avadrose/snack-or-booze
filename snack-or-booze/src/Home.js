import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function Home({ snacks, drinks }) {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Snack or Booze!
            </h3>
          </CardTitle>

          <CardText>
            We have {snacks.length} snacks and {drinks.length} drinks available.
          </CardText>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;