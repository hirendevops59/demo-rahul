/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const initialSeconds = data; // Get the initial seconds from the message
  let secondsLeft = initialSeconds;
  const intervalId = setInterval(() => {
    if (secondsLeft > 0) {
      secondsLeft--;
      postMessage(secondsLeft); // Send the updated seconds back to the main thread
    } else {
      clearInterval(intervalId); // Stop the interval when countdown reaches zero
      postMessage(-1); // Send a signal that the deadline has passed
    }
  }, 1000);

  // Cleanup function when the worker is terminated
  self.addEventListener('close', () => {
    clearInterval(intervalId);
  });
});

