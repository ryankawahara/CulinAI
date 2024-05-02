import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import RecipeComponent from './recipe.js';


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [outputImage, setOutputImage] = useState(null);

  const [error, setError] = useState(null);
  const imageRef = useRef(null); // Create a ref for the output image


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
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

  };


  const handleOutput = async (prediction) => {
    console.log(prediction)
    var newPrompt = prediction.output.join(" ");

    const response = await fetch("/api/image_predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: newPrompt,
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
        <svg class="icon" viewBox="0 0 30 30" role="button">
          <title>Navigation Menu Icon</title>
          <line x1="8" x2="22" y1="12" y2="12" stroke="#FCE8E9" stroke-linecap="round" />
          <line x1="8" x2="22" y1="18" y2="18" stroke="#FCE8E9" stroke-linecap="round" />
          <line x1="8" x2="22" y1="24" y2="24" stroke="#FCE8E9" stroke-linecap="round" />
        </svg>
        <nav class="hidden">
          <a href="index.html">home</a>
          <a href="#">explore page</a>
          <a href="saved.html">saved recipes</a>
        </nav>
      </header>

      <p id="upload_text">show us a photo of your fridge and we will make a recipe for you!</p>
      <img id="output_image" height="50px" width="50px" alt="Preview" ref={imageRef} />

      <form className="w-full flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-grow"
          name="prompt"
          placeholder="Enter a prompt to display an image"
        />
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

      {error && <div>{error}</div>}


      {prediction && (
        <>
          {prediction.output && (
            <div className="image-wrapper mt-5">
              <p className="py-3 text-sm opacity-50">status: {prediction.output}</p>

              {/* <Image
                fill
                src={prediction.output[prediction.output.length - 1]}
                alt="output"
                sizes="100vw"
              /> */}
            </div>
          )}
          <p className="py-3 text-sm opacity-50">status: {prediction.status}</p>
        </>
      )}


      {outputImage && (
        <>
          {outputImage.output && (
            <div className="image-wrapper mt-5">

              {<Image
                fill
                src={outputImage.output[outputImage.output.length - 1]}
                alt="output"
                sizes="100vw"
              />}
            </div>
          )}
          <p className="py-3 text-sm opacity-50">status: {outputImage.status}</p>
        </>
      )}

      <div className="recipeSection">
        <RecipeComponent className="recipe" />
      </div>


    </div>

  );
}