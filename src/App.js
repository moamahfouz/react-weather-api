import React, { useCallback, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useFetchWeather } from "./hooks/useFetchWeather";
import { Jumboweather } from "./components/Jumboweather";
import Form from "./components/Form";

export const App = () => {
  const [city, setCity] = useState("London");
  const [finalCity, setFinalCity] = useState("London");

  const { data, isLoaded, isError } = useFetchWeather(finalCity);
  console.log(data);

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      setFinalCity(city);
    },
    [city]
  );

  const handleChange = useCallback((e) => {
    setCity(e.target.value);
  }, []);

  const style = { position: "fixed", top: "30%", left: "50%" };
  let output;
  if (!isLoaded) {
    output = <Spinner style={style} animation="border" />;
  } else {
    if (isError) {
      output = <div style={style}>Invalid City</div>;
    } else {
      output = (
        <Row>
          <Col xs={12}>
            <Jumboweather data={data} />
          </Col>
        </Row>
      );
    }
  }

  return (
    <Container className="p-5">
      <Row>
        <Col xs={12}>
          <Form
            city={city}
            handleChange={handleChange}
            handleClick={handleClick}
          />
        </Col>
      </Row>
      {output}
    </Container>
  );
};
