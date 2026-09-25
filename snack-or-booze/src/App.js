import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import Menu from "./Menu";
import Item from "./Item";
import AddItemForm from "./AddItemForm";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function getItems() {
      const snacks = await SnackOrBoozeApi.getSnacks();
      const drinks = await SnackOrBoozeApi.getDrinks();

      setSnacks(snacks);
      setDrinks(drinks);
      setIsLoading(false);
    }

    getItems();
  }, []);

  async function addItem(type, item) {
    const newItem = await SnackOrBoozeApi.addItem(type, item);

    if (type === "snacks") {
      setSnacks(snacks => [...snacks, newItem]);
    } else {
      setDrinks(drinks => [...drinks, newItem]);
    }
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <main>
          <Switch>
            <Route exact path="/">
              <Home snacks={snacks} drinks={drinks} />
            </Route>

            <Route exact path="/snacks">
              <Menu
                items={snacks}
                title="Snacks"
                route="snacks"
              />
            </Route>

            <Route exact path="/snacks/:id">
              <Item
                items={snacks}
                cantFind="/snacks"
              />
            </Route>

            <Route exact path="/drinks">
              <Menu
                items={drinks}
                title="Drinks"
                route="drinks"
              />
            </Route>

            <Route exact path="/drinks/:id">
              <Item
                items={drinks}
                cantFind="/drinks"
              />
            </Route>

            <Route exact path="/add">
              <AddItemForm addItem={addItem} />
            </Route>

            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;