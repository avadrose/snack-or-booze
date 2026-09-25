import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";

function AddItemForm({ addItem }) {
  const history = useHistory();

  const [formData, setFormData] = useState({
    type: "snacks",
    name: "",
    description: "",
    recipe: "",
    serve: ""
  });

  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    const { type, ...itemData } = formData;

    const newItem = {
      ...itemData,
      id: itemData.name.toLowerCase().replace(/\s+/g, "-")
    };

    await addItem(type, newItem);

    history.push(`/${type}`);
  }

  return (
    <section className="col-md-6">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Add a New Item
          </CardTitle>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="type">Type</Label>
              <Input
                type="select"
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="snacks">Snack</option>
                <option value="drinks">Drink</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="recipe">Recipe</Label>
              <Input
                type="text"
                name="recipe"
                id="recipe"
                value={formData.recipe}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="serve">Serve</Label>
              <Input
                type="text"
                name="serve"
                id="serve"
                value={formData.serve}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <Button color="primary" type="submit">
              Add Item
            </Button>
          </Form>
        </CardBody>
      </Card>
    </section>
  );
}

export default AddItemForm;