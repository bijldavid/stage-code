document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------
  // Initial state setup
  // ---------------------------------------------------------
  const infoContainers = document.querySelectorAll('.inner-grid .info');

  // Add 'p-minimized' class to all paragraphs initially
  infoContainers.forEach(container => {
    const paragraph = container.querySelector('p');
    const infoIcon = container.querySelector('svg');

    // Add 'p-minimized' class to paragraphs
    paragraph.classList.add('p-minimized');

    // Show info icon when paragraph is minimized
    if (infoIcon) {
      infoIcon.classList.remove('invisible'); // Ensure the icon is visible
    }
  });


  // ---------------------------------------------------------
  // Expand/Collapse functionality for columns
  // ---------------------------------------------------------
  const expandIcons = document.querySelectorAll('.SO-titel img');

  expandIcons.forEach((icon) => {
    icon.onclick = function () {
      const closestDiv = this.closest('div');
      const nextSibling = closestDiv.nextElementSibling;
      const parentClass = nextSibling.classList[1];

      const infoContainers = document.querySelectorAll(`.subgrid.${parentClass} .info`);

      // Toggle expanded and p-minimized classes
      infoContainers.forEach(container => {
        const paragraph = container.querySelector('p');
        const infoIcon = container.querySelector('svg');
        const infoIconContainer = container.querySelector('.svg-container');

        // Toggle container expansion
        container.classList.toggle('expanded');

        // Toggle paragraph minimization
        const isExpanded = container.classList.contains('expanded');
        paragraph.classList.toggle('p-minimized', !isExpanded);

        // Toggle info icon visibility if icon exists
        if (infoIcon) {
          infoIcon.classList.toggle('invisible', isExpanded);
        }

        if (infoIconContainer) {
          infoIconContainer.classList.toggle('invisible', isExpanded);
        }
      });
    };
  });


  // ---------------------------------------------------------
  // Handle the invisible class toggling on checkboxes
  // ---------------------------------------------------------
  const checkBoxes = document.querySelectorAll('.SO-titel > div');

  checkBoxes.forEach(checkbox => {
    checkbox.addEventListener('click', function () {
      // Find the related subgrid
      const subgrid = this.closest('.inner-grid > div').querySelector('.subgrid');

      if (subgrid) {
        // Toggle the 'invisible' class on the subgrid
        subgrid.classList.toggle('invisible');

        // Hide or show expand icons
        const relatedIcon = this.closest('.inner-grid > div').querySelector('.SO-titel img');
        if (relatedIcon) {
          relatedIcon.classList.toggle('invisible');
        }

        const relatedCheckbox = this.closest('.inner-grid > div').querySelector('.SO-titel > div span');
        if (relatedCheckbox) {
          if (relatedCheckbox.classList.contains('unchecked')) {
            relatedCheckbox.classList.remove('unchecked');
            relatedCheckbox.classList.add('checked');
          } else {
            relatedCheckbox.classList.remove('checked');
            relatedCheckbox.classList.add('unchecked');
          }
        }
      }
    });
  });

  // ---------------------------------------------------------
  // Handle checkbox initial checked state
  // ---------------------------------------------------------
  const checkboxSpans = document.querySelectorAll('.SO-titel > div span');

  checkboxSpans.forEach(checkbox => {
    if (!checkbox.classList.contains('checked') && !checkbox.classList.contains('unchecked')) {
      checkbox.classList.add('checked');
    }
  });

  // ---------------------------------------------------------
  // Create and map .marked divs to verbeterinitiatieven
  // ---------------------------------------------------------

  const verbeterinitiatieven = document.querySelectorAll('.verbeterinitiatief');
  const subgrids = document.querySelectorAll('.subgrid');

  // Define a manual mapping between verbeterinitiatieven and .marked div indices
  const markedConnectionMap = [
    [0, 5, 45],
    [6, 16, 76],
    [17, 47, 67],
    [28, 38],
    [69, 89],
    [9],
    [10]
  ];

  // Generate .marked divs dynamically inside each subgrid
  const allMarkedDivs = [];
  subgrids.forEach(subgrid => {
    // Get all containers in the subgrid
    const containers = Array.from(subgrid.querySelectorAll(':scope > div'));

    // Sort containers explicitly from left to right
    containers.sort((a, b) => {
      const rectA = a.getBoundingClientRect();
      const rectB = b.getBoundingClientRect();
      return rectA.left - rectB.left;
    });

    // Flatten and create marked divs in the sorted order
    containers.forEach(container => {
      const existingMarked = container.querySelectorAll('.marked');
      existingMarked.forEach(el => el.remove()); // Remove old .marked divs

      for (let i = 0; i < verbeterinitiatieven.length; i++) {
        const markedDiv = document.createElement('div');
        markedDiv.classList.add('marked');
        container.appendChild(markedDiv);

        // Add to the global array for indexing
        allMarkedDivs.push(markedDiv);
      }
    });
  });

  // ---------------------------------------------------------
  // Add click logic for verbeterinitiatieven
  // ---------------------------------------------------------

  verbeterinitiatieven.forEach((verbeterInitiatief, viIndex) => {
    verbeterInitiatief.addEventListener('click', () => {
      const isSelected = verbeterInitiatief.classList.toggle('VI-selected');

      // Get the indices of .marked divs related to this verbeterinitiatief
      const relatedMarkedIndices = markedConnectionMap[viIndex];

      // Get the background color of the ::before pseudo-element
      const backgroundColor = isSelected
        ? window.getComputedStyle(verbeterInitiatief, '::before').backgroundColor
        : '';

      // Loop through the related indices and update the class and background color of each .marked div
      relatedMarkedIndices.forEach(index => {
        const markedDiv = allMarkedDivs[index];
        if (markedDiv) {
          if (isSelected) {
            markedDiv.classList.add('marked-highlight');
            markedDiv.style.backgroundColor = backgroundColor;
          } else {
            markedDiv.classList.remove('marked-highlight');
            markedDiv.style.backgroundColor = '';
          }
        }
      });
    });
  });



  // ---------------------------------------------------------
  // Line creator
  // ---------------------------------------------------------
  const leftDivs = document.querySelectorAll(".pijnpunt-container .pijnpunt");
  const rightDivs = document.querySelectorAll(".verbeterinitiatief-container .verbeterinitiatief");

  function createLine(leftDiv, rightDiv) {
    const leftRect = leftDiv.getBoundingClientRect();
    const rightRect = rightDiv.getBoundingClientRect();

    // Validation checks
    if (
      leftRect.width <= 0 ||
      leftRect.height <= 0 ||
      rightRect.width <= 0 ||
      rightRect.height <= 0
    ) {
      return;
    }

    const leftEdgeCenter = {
      x: leftRect.right,
      y: leftRect.top + leftRect.height / 2
    };

    const rightEdgeCenter = {
      x: rightRect.left,
      y: rightRect.top + rightRect.height / 2
    };

    const dx = rightEdgeCenter.x - leftEdgeCenter.x;
    const dy = rightEdgeCenter.y - leftEdgeCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    if (distance <= 0 || isNaN(distance)) {
      return;
    }

    const line = document.createElement("div");
    line.classList.add("line");

    // Add a class to indicate connection between specific elements
    const leftIndex = Array.from(leftDiv.parentElement.children).indexOf(leftDiv);
    const rightIndex = Array.from(rightDiv.parentElement.children).indexOf(rightDiv);
    line.classList.add(`line-${leftDiv.parentElement.children.length - leftIndex - 1}-${rightIndex}`);

    // Check if the corresponding divs are selected
    if (leftDiv.classList.contains('pain-selected')) {
      line.classList.add('line-pain-selected');
    }

    document.body.appendChild(line);

    line.style.width = `${distance}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.position = "absolute";
    line.style.left = `${leftEdgeCenter.x}px`;
    line.style.top = `${leftEdgeCenter.y}px`;
  }

  // Modify the drawLines function to use the new line creation logic
  function drawLines() {
    const lines = document.querySelectorAll(".line");
    lines.forEach((line) => line.remove());

    // Ensure we don't try to create lines if there aren't enough elements
    if (leftDivs.length > 5 && rightDivs.length > 0) {
      createLine(leftDivs[0], rightDivs[0]);
      createLine(leftDivs[1], rightDivs[1]);
      createLine(leftDivs[2], rightDivs[0]);
      createLine(leftDivs[3], rightDivs[4]);
      createLine(leftDivs[4], rightDivs[0]);
      createLine(leftDivs[5], rightDivs[1]);
      createLine(leftDivs[6], rightDivs[4]);
    }
  }


  // ---------------------------------------------------------
  // VI/Pain selection logic
  // ---------------------------------------------------------
  const pijnPuntContainer = document.querySelector('.pijnpunt-container');
  const pijnPunten = pijnPuntContainer.querySelectorAll('.pijnpunt');
  const verbeterInitiatiefContainer = document.querySelector('.verbeterinitiatief-container');
  const verbeterInitiatieven = verbeterInitiatiefContainer.querySelectorAll('.verbeterinitiatief');

  // Mapping of pijnpunt indices to verbeterinitiatief indices
  const connectionMap = [
    [0, 0],
    [1, 1],
    [2, 0],
    [3, 4],
    [4, 0],
    [5, 1],
    [6, 4]
  ];

  // Helper function to check if any 'pijnpunt' connected to a 'verbeterinitiatief' is still selected
  function isAnyPijnpuntSelected(verbeterIndex) {
    return connectionMap.some(([pijnpuntIndex, verbeterIndexConnected]) => {
      return verbeterIndexConnected === verbeterIndex && pijnPunten[pijnpuntIndex].classList.contains('pain-selected');
    });
  }

  // Initialize classes based on the current state of selected pijnpunten
  function initializeVerbeterinitiatiefState() {
    verbeterInitiatieven.forEach((verbeterInitiatief, index) => {
      // Check if any connected 'pijnpunt' is selected
      if (isAnyPijnpuntSelected(index)) {
        verbeterInitiatief.classList.add('pain-selected');
      } else {
        verbeterInitiatief.classList.add('unselected');
      }
    });
  }

  pijnPunten.forEach((pijnpunt, pijnpuntIndex) => {
    pijnpunt.addEventListener('click', function () {
      // Toggle between selected and unselected for pijnpunt
      if (this.classList.contains('unselected')) {
        this.classList.remove('unselected');
        this.classList.add('pain-selected');
      } else {
        this.classList.remove('pain-selected');
        this.classList.add('unselected');
      }

      // Now check if the related 'verbeterinitiatief' needs its class updated
      connectionMap.forEach(([leftIndex, rightIndex]) => {
        if (leftIndex === pijnpuntIndex) {
          const correspondingVerbeterInitiatief = verbeterInitiatieven[rightIndex];
          if (correspondingVerbeterInitiatief) {
            // Add 'pain-selected' to the related 'verbeterinitiatief' if any connected 'pijnpunt' is selected
            if (isAnyPijnpuntSelected(rightIndex)) {
              correspondingVerbeterInitiatief.classList.add('pain-selected');
            } else {
              correspondingVerbeterInitiatief.classList.remove('pain-selected');
            }
          }
        }
      });

      drawLines(); // Recalculate lines
    });
  });





  verbeterInitiatieven.forEach((verbeterInitiatief, viIndex) => {
    verbeterInitiatief.addEventListener('click', () => {
        console.log('--- Click Event Triggered ---');
        console.log('Verbeter Element:', verbeterInitiatief);
        console.log('Current Classes:', verbeterInitiatief.className);

        // Toggle selection state
        const isSelected = verbeterInitiatief.classList.toggle('VI-selected');
        console.log('Is Selected:', isSelected);

        // Attempt to retrieve the CSS variable for the full color
        const lineColor = isSelected
            ? window.getComputedStyle(verbeterInitiatief).getPropertyValue(`--VI-${viIndex + 1}-full`).trim()
            : '';
        console.log(`Retrieved Line Color for --VI-${viIndex + 1}-full:`, lineColor);

        // Log if no color is retrieved
        if (!lineColor && isSelected) {
            console.warn(`No color found for --VI-${viIndex + 1}-full. Check CSS definitions.`);
        }

        // Find all related lines
        const relatedLines = document.querySelectorAll(`.line-${viIndex}`);
        console.log(`Related Lines for Index ${viIndex}:`, relatedLines);

        // Update line styles
        relatedLines.forEach((line, lineIndex) => {
            console.log(`Updating Line ${lineIndex}:`, line);

            if (isSelected) {
                line.style.setProperty('background-color', lineColor, 'important');
                console.log(`Set Line ${lineIndex} Background Color to:`, lineColor);
            } else {
                line.style.removeProperty('background-color');
                console.log(`Removed Background Color for Line ${lineIndex}`);
            }
        });

        console.log('--- End of Click Event ---\n');
    });
});












  verbeterInitiatieven.forEach((verbeterInitiatief, index) => {
    verbeterInitiatief.addEventListener('click', function () {
      // Toggle between selected and unselected for verbeterinitiatief
      if (this.classList.contains('unselected')) {
        this.classList.remove('unselected');
        this.classList.add('pain-selected');
        this.classList.add('VI-selected'); // Add the VI-selected class only when the verbeterinitiatief is clicked

        // Find corresponding pijnpunt and select it
        connectionMap.forEach(([leftIndex, rightIndex]) => {
          if (rightIndex === index) {
            const correspondingPijnpunt = pijnPunten[leftIndex];
            if (correspondingPijnpunt) {
              correspondingPijnpunt.classList.remove('unselected');
              correspondingPijnpunt.classList.add('pain-selected');
            }
          }
        });
      } else {
        this.classList.remove('pain-selected');
        this.classList.add('unselected');
        this.classList.remove('VI-selected'); // Remove the VI-selected class here

        // Deselect corresponding pijnpunt
        connectionMap.forEach(([leftIndex, rightIndex]) => {
          if (rightIndex === index) {
            const correspondingPijnpunt = pijnPunten[leftIndex];
            if (correspondingPijnpunt) {
              correspondingPijnpunt.classList.remove('pain-selected');
              correspondingPijnpunt.classList.add('unselected');
            }
          }
        });
      }
      drawLines();
    });
  });

  drawLines();  // Ensure lines are drawn on load

  // Initialize the state of the verbeterinitiatief divs on load
  initializeVerbeterinitiatiefState();

  // Listen for window resizing and redraw lines
  window.addEventListener('resize', drawLines);
});


// ---------------------------------------------------------
// p data-tooltip getter  
// ---------------------------------------------------------

document.querySelectorAll('.info').forEach(info => {
  const svgContainer = info.querySelector('.svg-container');
  const text = info.querySelector('p').textContent;
  svgContainer.setAttribute('data-tooltip', text);
});