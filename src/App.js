import Input from "./components/Input";
import Splotch from "./components/Splotch";
import { useState } from "react";
import styles from "./App.module.css";

export default function ColorInput() {
  // *** VARIABLES & STATE *** //
  const [calculated, setCalculated] = useState([]); //the list of calculated colors and the function to update its value
  const analgousStep = 30; //the number specifying how far apart on the color wheel analogous colors should be
  const tintshadeStep = 4; //the number specifying how much saturation and lightness should increase or decrease for tints and shades
  const [hue, setHue] = useState(153); // the inputted hue of the base color and the function to update it
  const [saturation, setSaturation] = useState(65); // the inputted saturation of the base color and the function to update it
  const [lightness, setLightness] = useState(70); // the inputted lightness of the base color and the function to update it

  // *** Update Functions *** //
  const updateHue = (value) => {
    setHue(parseInt(value));
  };

  const updateSaturation = (value) => {
    setSaturation(parseInt(value));
  };

  const updateLightness = (value) => {
    setLightness(parseInt(value));
  };

  // *** Functions *** //
  const wrapValueToRange = (range, value) => {
    let newValue = value % range[1]; //ensures that the inputed value is not larger than the maximum balue
    newValue = newValue < range[0] ? range[1] + newValue : newValue; //if the number is too small, "wraps" it around to the top
    return newValue;
  };

  const calculateComplement = () => {
    let newHue = wrapValueToRange([0, 360], hue + 180);
    setCalculated([[newHue, saturation, lightness]]);
  };

  const calculateTints = () => {
    const result = [];
    for (let i = 1; i <= 5; i++) {
      const newSat = saturation - tintshadeStep * i < 0 ? 0 : saturation - tintshadeStep * i;
      const newLight = lightness + tintshadeStep * i > 100 ? 100 : lightness + tintshadeStep * i;
      result.push([hue, newSat, newLight]);
    }
    setCalculated(result);
  };

  const calculateShades = () => {
    const result = [];
    for (let i = 1; i <= 5; i++) {
      const newSat = saturation - tintshadeStep * i < 0 ? 0 : saturation - tintshadeStep * i;
      const newLight = lightness - tintshadeStep * i < 0 ? 0 : lightness - tintshadeStep * i;
      result.push([hue, newSat, newLight]);
    }
    setCalculated(result);
  };

  const calculateAnalgous = () => {
    const result = [];
    for (let i = 1; i <= 3; i++) {
      let newHue = wrapValueToRange([0, 360], hue + analgousStep * i);
      result.push([newHue, saturation, lightness]);
    }
    setCalculated(result);
  };

  // *** UI *** //
  return (
    <>
      <main className={styles.main}>
        <div>
          <Splotch color={[hue, saturation, lightness]}></Splotch>
        </div>
        <div className={styles.inputcontainer}>
          <label>
            hue:
            <Input value={hue} range={[0, 360]} updateValue={updateHue}></Input>
            {hue}deg
          </label>
          <label>
            saturation:
            <Input value={saturation} range={[0, 100]} updateValue={updateSaturation}></Input>
            {saturation}%
          </label>
          <label>
            lightness:
            <Input value={lightness} range={[0, 100]} updateValue={updateLightness}></Input>
            {lightness}%
          </label>
        </div>
        <div>
          <button onClick={calculateComplement}>Calculate Complement</button>
          <button onClick={calculateTints}>Calculate Tints</button>
          <button onClick={calculateShades}>Calculate Shades</button>
          <button onClick={calculateAnalgous}>Calculate Analgous Colors</button>
        </div>
        <div className={styles.splotchgrid}>
          {calculated.map((color, i) => {
            return <Splotch key={`color${i}`} color={color}></Splotch>;
          })}
        </div>
      </main>
    </>
  );
}
