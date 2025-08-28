exports.handler = async (event) => {
  try {
    const { message, tone, recipient } = JSON.parse(event.body);

    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "command-xlarge-nightly",
        prompt: `Rewrite this message for ${recipient} in a ${tone} tone:\n\n${message}`,
        max_tokens: 150,
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ output: data.generations[0].text })
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};


