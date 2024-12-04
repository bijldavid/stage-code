const leftDivs = document.querySelectorAll('.left div');
const rightDivs = document.querySelectorAll('.right div');

// Function to calculate and create a line between two divs
function createLine(leftDiv, rightDiv) {
  // Get the bounding rectangles of the divs
  const leftRect = leftDiv.getBoundingClientRect();
  const rightRect = rightDiv.getBoundingClientRect();

  // Log the positions of the divs for debugging
  console.log('Left Rect:', leftRect);
  console.log('Right Rect:', rightRect);

  // Ensure the divs are still visible and have valid positions
  if (leftRect.width <= 0 || leftRect.height <= 0 || rightRect.width <= 0 || rightRect.height <= 0) {
    console.log('Invalid div dimensions detected. Skipping line creation.');
    return; // Exit if the divs are invalid
  }

  // Calculate the center of the left edge of the left div
  const leftEdgeCenter = {
    x: leftRect.right,
    y: leftRect.top + leftRect.height / 2
  };

  // Calculate the center of the right edge of the right div
  const rightEdgeCenter = {
    x: rightRect.left,
    y: rightRect.top + rightRect.height / 2
  };

  // Calculate the distance and angle
  const dx = rightEdgeCenter.x - leftEdgeCenter.x;
  const dy = rightEdgeCenter.y - leftEdgeCenter.y;
  const distance = Math.sqrt(dx * dx + dy * dy); // Line length
  const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Angle in degrees

  // Debug log for the specific line
  console.log(`Line distance between div ${leftDiv.dataset.index} and div ${rightDiv.dataset.index}: ${distance}`);

  // Check if the distance is valid (not negative or NaN)
  if (distance <= 0 || isNaN(distance)) {
    console.log('Invalid line distance detected. Skipping line creation.');
    return; // Exit if the line distance is invalid
  }

  // Create a new line element
  const line = document.createElement('div');
  line.classList.add('line'); // Add the "line" class to it
  document.body.appendChild(line); // Append the line to the body (or a specific container)

  // Apply styles dynamically to position and rotate the line
  line.style.width = `${distance}px`; // Set line length
  line.style.transform = `rotate(${angle}deg)`; // Rotate to match angle
  line.style.position = 'absolute';
  line.style.left = `${leftEdgeCenter.x}px`; // Position it at the left edge of the left div
  line.style.top = `${leftEdgeCenter.y}px`; // Position it at the center of the left div
}

// Example of creating lines dynamically
createLine(leftDivs[0], rightDivs[0]); // Line between the first divs
createLine(leftDivs[1], rightDivs[1]); // Line between the second divs
createLine(leftDivs[2], rightDivs[0]); // Line between the third div in left and first div in right

// Resize handler to update line positions dynamically
window.addEventListener('resize', () => {
  console.log('Window resized!');
  
  // Remove existing lines before recalculating
  const lines = document.querySelectorAll('.line');
  lines.forEach(line => line.remove()); // Remove existing lines

  // Recreate lines for all pairs
  leftDivs.forEach((leftDiv, index) => {
    if (rightDivs[index]) {
      createLine(leftDiv, rightDivs[index]); // Recreate lines based on new positions
    }
  });

  // Special debug for the problematic pair ([2] [0])
  console.log('Checking problematic pair (leftDiv[2], rightDiv[0])');
  createLine(leftDivs[2], rightDivs[0]);
});