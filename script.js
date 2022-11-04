async function getData() {
	const res = await fetch("https://icanhazdadjoke.com/", {
		method: "GET", // not necessary since GET is the default, but just so you know this can be changed here too
		headers: { Accept: "application/json", "User-Agent": "Annas Dad Joke Machine" } // You can add other types of headers here too! Maybe there are some APIs out there that require other things than this one
	});
	console.log("res", res); // If you look at this response in the console, you'll see that the body value is a ReadableStream. This is the data we're after! But we can't read or use it as is
	const data = await res.json(); // This function takes the ReadableStream in res.body and transforms it into JSON for us. The function returns a promise, so we have to await it (i.e. wait for it to finish doing its thing)
	console.log(data); // And here we have our data!
	return data;
}

async function displayDadJoke() {
	let joke = "";

	try {
		// This is a try block. We're basically telling the code to try to do something. In this case, we want it to try to run the coke in getData
		joke = await getData(); // Since getData is an async function, it returns a promise. To get the returned data out of that promise, we need to await the getData call here.
		const jokeContainer = document.getElementById("joke-container");
		jokeContainer.textContent = joke.joke;
	} catch (error) {
		// If something goes wrong in the try block, it is caught by this block. In here we can check the error and do different things depending on what kind of error it is. In this example I just console.log it and display a generic error message on the page.
		console.log(error);
		jokeContainer.textContent = "No joke could be fetched :(";
	}
}

document
	.getElementById("joke-fetch-button")
	.addEventListener("click", displayDadJoke);
