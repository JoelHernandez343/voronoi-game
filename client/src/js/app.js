import React from 'react';

const App = () => (
  <div>
    <h1>Welcolme world from Reacssst!</h1>
    <CustomButton></CustomButton>
  </div>
);

const makeRequest = async () => {
  const resp = await fetch('/api');
  const text = await resp.text();
  const json = JSON.parse(text);

  console.log(json);
};

const CustomButton = () => <button onClick={makeRequest}>Click me!</button>;

export default App;
