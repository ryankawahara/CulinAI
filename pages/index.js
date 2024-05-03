import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import RecipeComponent from './recipe.js';


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let recipeObj;

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [error, setError] = useState(null);
  const imageRef = useRef(null); // Create a ref for the output image


  const handleSubmit = async (e) => {
    setLoading(true); // Set loading to true when the process starts
    e.preventDefault();
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "It is very important that only output will be one JSON object, ensure that your answer is formatted all in one singular valid JSON. Analyze the provided image to identify up to 10 food ingredients and return a JSON formatted object with 'containsfood': true and a list of up to 10 ingredients under 'fooditems' if detected, or 'containsfood': false with an empty 'fooditems' list if none are found; if ingredients are identified, add a recipe field to the JSON object that contains a single recipe that uses the identified ingredients and includes a creatively titled 'title', a detailed list of 'ingredients' with the required amounts, step-by-step 'instructions' with each step separated by ',', an estimated 'cookingtime' in minutes, and a 'difficulty' rating from 1 to 5, with additional suggestions for garnishes and serving tips.",
        image: imageRef.current.src, // Access the src of the image
      }),
    });
    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);


    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
    }

    await handleOutput(prediction);

    setLoading(false);

  };





  const handleOutput = async (prediction) => {
    console.log(prediction)

    var newPrompt = prediction.output.join(" ");
    console.log(newPrompt);
    try {
      recipeObj = JSON.parse(newPrompt);
      console.log(recipeObj);
    }
    catch (error) {
      recipeObj = JSON.parse(newPrompt + "}");
      console.log(recipeObj);

    }

    let ingredients = recipeObj["fooditems"].join(" ")
    let imagePrompt = "A photorealistic photo of a " + recipeObj["recipe"]["title"] + " with " + ingredients
    console.log(imagePrompt);


    const response = await fetch("/api/image_predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: imagePrompt,
      }),
    });
    let outputImage = await response.json();
    if (response.status !== 201) {
      setError(outputImage.detail);
      return;
    }
    // Assuming the result contains the image URL
    // setOutputImage(outputImage)

    while (
      outputImage.status !== "succeeded" &&
      outputImage.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/image_predictions/" + outputImage.id);
      outputImage = await response.json();
      if (response.status !== 200) {
        setError(outputImage.detail);
        return;
      }
      setOutputImage(outputImage);
    }
    console.log("hello there ryan")
    console.log(outputImage.output);


  };

  const previewImage = (event) => {
    const reader = new FileReader();
    reader.onload = function () {
      const output = document.getElementById("output_image");
      output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  };



  return (
    <div className="container max-w-2xl mx-auto p-5">
      <Head>
        <title>Replicate + Next.js</title>
      </Head>

      <header>
        <h1>Culin<span style={{ color: "#FCE8E9" }}>AI</span></h1>
        <svg className="icon" viewBox="0 0 30 30" role="button">
          <title>Navigation Menu Icon</title>
          <line x1="8" x2="22" y1="12" y2="12" stroke="#FCE8E9" strokeLinecap="round" />
          <line x1="8" x2="22" y1="18" y2="18" stroke="#FCE8E9" strokeLinecap="round" />
          <line x1="8" x2="22" y1="24" y2="24" stroke="#FCE8E9" strokeLinecap="round" />
        </svg>

      </header>

      <header>
        <nav>
          <Link href="/">Home</Link>
          <Link href="#">Explore Page</Link>
          <Link href="/saved">Saved Recipes</Link>
        </nav>
      </header>

      <p id="upload_text">Show us a photo of your fridge and we will make a recipe for you!</p>
      <img id="output_image" height="50px" width="50px" alt="Preview" ref={imageRef} />


      <form className="w-full flex" onSubmit={handleSubmit}>

        <input
          type="file"
          className="flex-grow"
          name="image"
          placeholder="Upload an image"
          onChange={previewImage}
        />
        <button className="button" type="submit">
          Generate Recipe!
        </button>
      </form>

      {loading && <p>
        <div>
          <img src="https://raw.githubusercontent.com/ryankawahara/CulinAI/phoebelh-patch-1/htmlCodes/generating.gif" alt="Generating" />
        </div>
      </p>}


      {error && <div>{error}</div>}

      {outputImage && (
        <div className="image-wrapper mt-5">
          {outputImage.output && (
            <>
              {/* <Image
                fill
                src={outputImage.output[outputImage.output.length - 1]}
                alt="output"
                sizes="100vw"
              /> */}
              <div className="recipeSection">
                <RecipeComponent
                  className="recipe"
                  title={recipeObj["recipe"]["title"]}
                  ingredients={recipeObj["recipe"]["ingredients"]}
                  steps={recipeObj["recipe"]["instructions"]}
                  imageUrl={outputImage.output[outputImage.output.length - 1]}
                />
              </div>
            </>
          )}
          {/* <p className="py-3 text-sm opacity-50">status: {outputImage.status}</p> */}
        </div>
      )}





    </div>

  );
}