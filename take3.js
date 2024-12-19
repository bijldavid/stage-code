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

  // Initialize bottom section widths
  initializeWidths();






  // ---------------------------------------------------------
  // Expand/Collapse functionality for columns
  // ---------------------------------------------------------
  // Add click event listener for expanding/collapsing icons
  document.querySelectorAll('.SO-titel img').forEach((icon) => {
    icon.onclick = function () {
      const closestDiv = this.closest('div');
      const nextSibling = closestDiv?.nextElementSibling;
      if (!nextSibling) return; // Safeguard against null

      const parentClass = nextSibling.classList[1];
      const infoContainers = document.querySelectorAll(`.subgrid.${parentClass} .info`);

      infoContainers.forEach(toggleContainerExpansion);

      adjustBottomSectionWidth(parentClass);
    };
  });

  // Helper function to toggle expansion of an info container
  function toggleContainerExpansion(container) {
    const paragraph = container.querySelector('p');
    const infoIcon = container.querySelector('svg');
    const infoIconContainer = container.querySelector('.svg-container');

    // Toggle container expanded state
    container.classList.toggle('expanded');
    const isExpanded = container.classList.contains('expanded');

    // Update paragraph and icons based on the state
    paragraph?.classList.toggle('p-minimized', !isExpanded);
    infoIcon?.classList.toggle('invisible', isExpanded);
    infoIconContainer?.classList.toggle('invisible', isExpanded);
  }


  // ---------------------------------------------------------
  // Function to initialize bottom section widths
  // ---------------------------------------------------------
  function initializeWidths() {
    // Iterate over all top sections and set their corresponding bottom section widths
    const topSections = document.querySelectorAll('.subgrid');
    topSections.forEach(section => {
      const parentClass = section.classList[1];
      adjustBottomSectionWidth(parentClass);
    });
  }

  function adjustBottomSectionWidth(parentClass) {
    // Find the expanded section in the top part
    const topSection = document.querySelector(`.subgrid.${parentClass}`);
    const topSectionWidth = topSection.offsetWidth;

    // Apply the width to the corresponding bottom section
    const widthThema2 = document.querySelector(`.thema-2.marked-container .${parentClass}`);
    if (widthThema2) {
      widthThema2.style.width = `${topSectionWidth}px`;
    }

    const widthThema3 = document.querySelector(`.thema-3.marked-container .${parentClass}`);
    if (widthThema3) {
      widthThema3.style.width = `${topSectionWidth}px`;
    }
  }




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

        // Toggle the checkbox state
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

        // Find and toggle the corresponding marked group
        const subgridClass = Array.from(subgrid.classList).find(cls => cls !== 'subgrid');

        if (subgridClass) {
          // Handle Thema-2
          const markedGroupThema2 = document.querySelector(`.thema-2.marked-container .${subgridClass}.marked-group`);
          if (markedGroupThema2) {
            markedGroupThema2.classList.toggle('invisible');

            // Handle placeholder div
            if (markedGroupThema2.classList.contains('invisible')) {
              // Add placeholder div
              let placeholder = document.querySelector(`.thema-2 .placeholder-${subgridClass}`);
              if (!placeholder) {
                placeholder = document.createElement('div');
                placeholder.classList.add(`placeholder-${subgridClass}`, 'placeholder', 'thema-2');
                // Copy the width of the SO-titel div
                const relatedTitle = this.closest('.SO-titel');
                if (relatedTitle) {
                  const computedStyle = getComputedStyle(relatedTitle);
                  placeholder.style.width = computedStyle.width;
                }
                placeholder.style.visibility = 'hidden'; // Invisible but still takes up space
                placeholder.style.height = '0px'; // Keep it flat
                placeholder.style.display = 'inline-block'; // Matches display behavior
                markedGroupThema2.parentNode.insertBefore(placeholder, markedGroupThema2);
              }
            } else {
              // Remove placeholder div when group is visible
              const placeholder = document.querySelector(`.thema-2 .placeholder-${subgridClass}`);
              if (placeholder) {
                placeholder.remove();
              }
            }
          }

          // Handle Thema-3
          const markedGroupThema3 = document.querySelector(`.thema-3.marked-container .${subgridClass}.marked-group`);
          if (markedGroupThema3) {
            markedGroupThema3.classList.toggle('invisible');

            // Handle placeholder div
            if (markedGroupThema3.classList.contains('invisible')) {
              // Add placeholder div
              let placeholder = document.querySelector(`.thema-3 .placeholder-${subgridClass}`);
              if (!placeholder) {
                placeholder = document.createElement('div');
                placeholder.classList.add(`placeholder-${subgridClass}`, 'placeholder', 'thema-3');
                // Copy the width of the SO-titel div
                const relatedTitle = this.closest('.SO-titel');
                if (relatedTitle) {
                  const computedStyle = getComputedStyle(relatedTitle);
                  placeholder.style.width = computedStyle.width;
                }
                placeholder.style.visibility = 'hidden'; // Invisible but still takes up space
                placeholder.style.height = '0px'; // Keep it flat
                placeholder.style.display = 'inline-block'; // Matches display behavior
                markedGroupThema3.parentNode.insertBefore(placeholder, markedGroupThema3);
              }
            } else {
              // Remove placeholder div when group is visible
              const placeholder = document.querySelector(`.thema-3 .placeholder-${subgridClass}`);
              if (placeholder) {
                placeholder.remove();
              }
            }
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
  // Create and map .marked divs to verbeterinitiatieven --- thema-1
  // ---------------------------------------------------------

  const verbeterinitiatievenThema1 = document.querySelectorAll('.thema-1 .verbeterinitiatief');
  const subgrids = document.querySelectorAll('.subgrid');

  // Define a manual mapping between verbeterinitiatieven and .marked div indices
  const markedConnectionMapThema1 = [
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

    // Flatten and create marked divs in the sorted order
    containers.forEach(container => {
      const existingMarked = container.querySelectorAll('.marked');
      existingMarked.forEach(el => el.remove()); // Remove old .marked divs

      for (let i = 0; i < verbeterinitiatievenThema1.length; i++) {
        const markedDiv = document.createElement('div');
        markedDiv.classList.add('marked');
        container.appendChild(markedDiv);

        // Add to the global array for indexing
        allMarkedDivs.push(markedDiv);
      }
    });
  });

  verbeterinitiatievenThema1.forEach((verbeterInitiatief, viIndex) => {
    verbeterInitiatief.addEventListener('click', () => {
      const isSelected = verbeterInitiatief.classList.toggle('VI-selected');

      // Get the indices of .marked divs related to this verbeterinitiatief
      const relatedMarkedIndices = markedConnectionMapThema1[viIndex];

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
  // Create and map .marked divs to verbeterinitiatieven --- thema-2
  // ---------------------------------------------------------
  const verbeterinitiatievenThema2 = document.querySelectorAll('.thema-2 .verbeterinitiatief');

  const markedConnectionMapThema2 = [
    [0, 5, 10],
    [1, 31],
    [2, 12],
    [3, 13],
    [4, 14]
  ];

  const thema2Container = document.querySelector('.thema-2.marked-container');

  verbeterinitiatievenThema2.forEach((verbeterInitiatief, viIndex) => {
    verbeterInitiatief.addEventListener('click', () => {
      const relatedMarkedIndices = markedConnectionMapThema2[viIndex];

      // Check if the verbeterinitiatief is currently selected
      const isSelected = verbeterInitiatief.classList.contains('VI-selected');

      // Get the color from the ::before pseudo-element
      const selectedColor = isSelected
        ? window.getComputedStyle(verbeterInitiatief, '::before').backgroundColor
        : '';

      relatedMarkedIndices.forEach(index => {
        const markedDiv = thema2Container.querySelectorAll('.marked')[index];

        if (markedDiv) {
          if (isSelected) {
            markedDiv.classList.add('marked-highlight');
            markedDiv.style.backgroundColor = selectedColor;
          } else {
            markedDiv.classList.remove('marked-highlight');
            markedDiv.style.backgroundColor = ''; // Reset background
          }
        }
      });
    });
  });


  // Update marked containers for .thema-2
  document.querySelectorAll('.thema-2.marked-container .marked-group').forEach((markedGroup) => {
    markedGroup.querySelectorAll('.marked-row').forEach((row) => {
      // Clear and add marked divs
      updateMarkedRows(row, verbeterinitiatievenThema2.length);
    });
  });

  // Helper function to update marked rows
  function updateMarkedRows(row, count) {
    // Clear existing marked divs
    row.querySelectorAll('.marked').forEach(el => el.remove());

    // Add new marked divs
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const markedDiv = document.createElement('div');
      markedDiv.classList.add('marked');
      fragment.appendChild(markedDiv);
    }
    row.appendChild(fragment);
  }

  // ---------------------------------------------------------
  // Create and map .marked divs to verbeterinitiatieven --- thema-3
  // ---------------------------------------------------------
  const verbeterinitiatievenThema3 = document.querySelectorAll('.thema-3 .verbeterinitiatief');

  const markedConnectionMapThema3 = [
    [0, 3, 30],
    [1, 19, 25],
    [8, 17, 44]
  ];

  const thema3Container = document.querySelector('.thema-3.marked-container');

  verbeterinitiatievenThema3.forEach((verbeterInitiatief, viIndex) => {
    verbeterInitiatief.addEventListener('click', () => {
      const relatedMarkedIndices = markedConnectionMapThema3[viIndex];

      // Check if the verbeterinitiatief is currently selected
      const isSelected = verbeterInitiatief.classList.contains('VI-selected');

      // Get the color from the ::before pseudo-element
      const selectedColor = isSelected
        ? window.getComputedStyle(verbeterInitiatief, '::before').backgroundColor
        : '';

      relatedMarkedIndices.forEach(index => {
        const markedDiv = thema3Container.querySelectorAll('.marked')[index];

        if (markedDiv) {
          if (isSelected) {
            markedDiv.classList.add('marked-highlight');
            markedDiv.style.backgroundColor = selectedColor;
          } else {
            markedDiv.classList.remove('marked-highlight');
            markedDiv.style.backgroundColor = ''; // Reset background
          }
        }
      });
    });
  });


  // Update marked containers for .thema-3
  document.querySelectorAll('.thema-3.marked-container .marked-group').forEach((markedGroup) => {
    markedGroup.querySelectorAll('.marked-row').forEach((row) => {
      // Clear and add marked divs
      updateMarkedRows(row, verbeterinitiatievenThema3.length);
    });
  });

  // Helper function to update marked rows
  function updateMarkedRows(row, count) {
    // Clear existing marked divs
    row.querySelectorAll('.marked').forEach(el => el.remove());

    // Add new marked divs
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const markedDiv = document.createElement('div');
      markedDiv.classList.add('marked');
      fragment.appendChild(markedDiv);
    }
    row.appendChild(fragment);
  }




  // ---------------------------------------------------------
  // Create decorative divs
  // ---------------------------------------------------------

  function updateDecorativeDivsForTheme(themeSelector) {
    // Function to update a specific decorative container
    function updateDecorativeContainer(containerSelector, count) {
      const decorativeContainer = document.querySelector(`${themeSelector} ${containerSelector}`);

      if (decorativeContainer) {
        // Clear existing divs in the decorative container
        decorativeContainer.innerHTML = '';

        // Add the specified number of decorative divs
        for (let i = 0; i < count; i++) {
          const decorativeDiv = document.createElement('div');
          decorativeDiv.classList.add('decorative'); // Optional class for styling
          decorativeContainer.appendChild(decorativeDiv);
        }
      }
    }

    // Count the number of .verbeterinitiatief divs inside the theme
    const verbeterinitiatieven = document.querySelectorAll(`${themeSelector} .verbeterinitiatief`);
    const count = verbeterinitiatieven.length;

    // Update decorative containers within the theme
    updateDecorativeContainer(`.inner-grid-decoration`, count);
    updateDecorativeContainer(`.marked-grid-decoration`, count);
    updateDecorativeContainer(`.verbeterinitiatief-container-decoration`, count);
  }

  // Call the function for thema-1, thema-2, and thema-3
  updateDecorativeDivsForTheme('.thema-1');
  updateDecorativeDivsForTheme('.thema-2');
  updateDecorativeDivsForTheme('.thema-3');



  // ---------------------------------------------------------
  // VI/Pain selection logic --- thema 1
  // ---------------------------------------------------------
  const pijnPuntContainer = document.querySelector('.pijnpunt-container');
  const pijnPunten = pijnPuntContainer.querySelectorAll('.pijnpunt');
  const verbeterInitiatiefContainer = document.querySelector('.verbeterinitiatief-container');
  const verbeterInitiatieven = verbeterInitiatiefContainer.querySelectorAll('.verbeterinitiatief');

  // Mapping of pijnpunt indices to verbeterinitiatief indices
  const connectionMapThema1 = [
    [2, 4],
    [3, 3],
    [5, 0],
    [5, 1],
    [5, 2]
  ];

  // Helper function to check if any 'verbeterinitiatief' connected to a 'pijnpunt' is selected
  function isAnyVerbeterInitiatiefSelected(pijnpuntIndex) {
    return connectionMapThema1.some(([leftIndex, rightIndex]) => {
      return leftIndex === pijnpuntIndex && (verbeterInitiatieven[rightIndex].classList.contains('pain-selected') || verbeterInitiatieven[rightIndex].classList.contains('VI-selected'));
    });
  }

  // Initialize classes based on the current state of selected pijnpunten
  function initializeVerbeterinitiatiefState() {
    verbeterInitiatieven.forEach((verbeterInitiatief, index) => {
      // Check if any connected 'pijnpunt' is selected
      if (isAnyVerbeterInitiatiefSelected(index)) {
        verbeterInitiatief.classList.add('pain-selected');
      } else {
        verbeterInitiatief.classList.add('unselected');
      }
    });
  }

  // Function to check if a pijnpunt should remain selected (only if other 'verbeterinitiatieven' are selected)
  function shouldPijnpuntRemainSelected(pijnpuntIndex) {
    return connectionMapThema1.some(([leftIndex, rightIndex]) => {
      return leftIndex === pijnpuntIndex && (verbeterInitiatieven[rightIndex].classList.contains('VI-selected') || verbeterInitiatieven[rightIndex].classList.contains('pain-selected'));
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
      connectionMapThema1.forEach(([leftIndex, rightIndex]) => {
        if (leftIndex === pijnpuntIndex) {
          const correspondingVerbeterInitiatief = verbeterInitiatieven[rightIndex];
          if (correspondingVerbeterInitiatief) {
            // Add 'pain-selected' to the related 'verbeterinitiatief' if the 'pijnpunt' is selected
            if (pijnpunt.classList.contains('pain-selected')) {
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

  verbeterInitiatieven.forEach((verbeterInitiatief, index) => {
    verbeterInitiatief.addEventListener('click', function () {
      const wasPainSelected = this.classList.contains('pain-selected');
      const wasVISelected = this.classList.contains('VI-selected');

      // Toggle between selected and unselected for verbeterinitiatief
      if (this.classList.contains('unselected')) {
        this.classList.remove('unselected');
        this.classList.add('pain-selected');
        this.classList.add('VI-selected'); // Add the VI-selected class only when the verbeterinitiatief is clicked

        // Find corresponding pijnpunt and select it
        connectionMapThema1.forEach(([leftIndex, rightIndex]) => {
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

        // Deselect corresponding pijnpunt only if no other 'verbeterinitiatieven' are selected
        connectionMapThema1.forEach(([leftIndex, rightIndex]) => {
          if (rightIndex === index) {
            const correspondingPijnpunt = pijnPunten[leftIndex];
            if (correspondingPijnpunt) {
              // If there are still other 'verbeterinitiatieven' selected for this 'pijnpunt', keep the class on 'pijnpunt'
              const otherVerbeterSelected = connectionMapThema1.some(([checkLeftIndex, checkRightIndex]) => {
                return checkLeftIndex === leftIndex && checkRightIndex !== index &&
                  (verbeterInitiatieven[checkRightIndex].classList.contains('pain-selected') || verbeterInitiatieven[checkRightIndex].classList.contains('VI-selected'));
              });

              if (!otherVerbeterSelected) {
                correspondingPijnpunt.classList.remove('pain-selected');
                correspondingPijnpunt.classList.add('unselected');
              }
            }
          }
        });
      }

      drawLines(); // Recalculate lines
    });
  });

  // Initialize the state of the verbeterinitiatief divs on load
  initializeVerbeterinitiatiefState();

  // Listen for window resizing and redraw lines
  window.addEventListener('resize', drawLines);
});



// ---------------------------------------------------------
// VI/Pain selection logic --- thema 2
// ---------------------------------------------------------

// Define the mapping for thema-2 .pijnpunt to .verbeterinitiatief indices
const connectionMapThema2 = [
  [0, 0],
  [1, 0],
  [2, 2],
  [5, 2]
];

// Get the .pijnpunt and .verbeterinitiatief elements for thema-2
const thema2PijnPunten = document.querySelectorAll('.thema-2 .pijnpunt');
const thema2VerbeterInitiatieven = document.querySelectorAll('.thema-2 .verbeterinitiatief');

// Helper function to check if any connected .pijnpunt is still selected
function isAnyPijnpuntSelectedThema2(verbeterIndex) {
  return connectionMapThema2.some(([pijnpuntIndex, verbeterIndexConnected]) => {
    return verbeterIndexConnected === verbeterIndex && thema2PijnPunten[pijnpuntIndex].classList.contains('pain-selected');
  });
}

// Initialize classes based on the current state of selected pijnpunten (for thema-2)
function initializeVerbeterinitiatiefStateThema2() {
  thema2VerbeterInitiatieven.forEach((verbeterInitiatief, index) => {
    // Check if any connected 'pijnpunt' is selected
    if (isAnyPijnpuntSelectedThema2(index)) {
      verbeterInitiatief.classList.add('pain-selected');
      verbeterInitiatief.classList.remove('unselected');
    } else {
      verbeterInitiatief.classList.remove('pain-selected');
      verbeterInitiatief.classList.add('unselected');
    }
  });

  thema2PijnPunten.forEach((pijnpunt, index) => {
    const isConnectedToSelected = connectionMapThema2.some(([pijnpuntIndex, verbeterIndex]) =>
      pijnpuntIndex === index && thema2VerbeterInitiatieven[verbeterIndex].classList.contains('pain-selected')
    );

    if (isConnectedToSelected) {
      pijnpunt.classList.add('pain-selected');
      pijnpunt.classList.remove('unselected');
    } else {
      pijnpunt.classList.remove('pain-selected');
      pijnpunt.classList.add('unselected');
    }
  });
}

// Call the initialization function for thema-2 on page load
initializeVerbeterinitiatiefStateThema2();

// Add click event listener to each .pijnpunt in thema-2
thema2PijnPunten.forEach((pijnpunt, pijnpuntIndex) => {
  pijnpunt.addEventListener('click', function () {
    // Toggle the 'pain-selected' class on the clicked .pijnpunt
    this.classList.toggle('pain-selected');

    // Update related .verbeterinitiatief divs
    connectionMapThema2.forEach(([mappedPijnpuntIndex, verbeterIndex]) => {
      if (mappedPijnpuntIndex === pijnpuntIndex) {
        const correspondingVerbeterInitiatief = thema2VerbeterInitiatieven[verbeterIndex];
        if (correspondingVerbeterInitiatief) {
          // Add or remove 'pain-selected' based on .pijnpunt state
          if (isAnyPijnpuntSelectedThema2(verbeterIndex)) {
            correspondingVerbeterInitiatief.classList.add('pain-selected');
          } else {
            correspondingVerbeterInitiatief.classList.remove('pain-selected');
          }
        }
      }
    });

    // After updating the .verbeterinitiatief divs, check if the .pijnpunt should be unselected
    const connectedVerbeterinitiatieven = connectionMapThema2.filter(([pijnpuntIndex, verbeterIndex]) => {
      return pijnpuntIndex === this.dataset.index;
    });

    const anyConnectedSelectedVerbeterinitiatieven = connectedVerbeterinitiatieven.some(([_, verbeterIndex]) => {
      return thema2VerbeterInitiatieven[verbeterIndex].classList.contains('pain-selected') ||
        thema2VerbeterInitiatieven[verbeterIndex].classList.contains('VI-selected');
    });

    // If no other .verbeterinitiatief divs are selected, mark the .pijnpunt as unselected
    if (!anyConnectedSelectedVerbeterinitiatieven && !this.classList.contains('pain-selected')) {
      this.classList.remove('pain-selected');
      this.classList.add('unselected');
    }

    // Call the drawLines function after the class changes are complete
    drawLines();
  });
});



// Add click event listener to each .verbeterinitiatief in thema-2
thema2VerbeterInitiatieven.forEach((verbeterInitiatief, verbeterIndex) => {
  verbeterInitiatief.addEventListener('click', function () {
    const wasPainSelected = this.classList.contains('pain-selected');
    const wasVISelected = this.classList.contains('VI-selected');

    // Toggle between selected and unselected for verbeterinitiatief
    if (this.classList.contains('unselected')) {
      this.classList.remove('unselected');
      this.classList.add('pain-selected');
      this.classList.add('VI-selected'); // Add the VI-selected class only when the verbeterinitiatief is clicked

      // Find and select all connected .pijnpunt elements
      connectionMapThema2.forEach(([pijnpuntIndex, mappedVerbeterIndex]) => {
        if (mappedVerbeterIndex === verbeterIndex) {
          const correspondingPijnpunt = thema2PijnPunten[pijnpuntIndex];
          if (correspondingPijnpunt) {
            correspondingPijnpunt.classList.remove('unselected');
            correspondingPijnpunt.classList.add('pain-selected');
          }
        }
      });
    } else {
      this.classList.remove('pain-selected', 'VI-selected');
      this.classList.add('unselected');

      // Deselect all connected .pijnpunt elements, but only if no other .verbeterinitiatief divs are selected for them
      connectionMapThema2.forEach(([pijnpuntIndex, mappedVerbeterIndex]) => {
        if (mappedVerbeterIndex === verbeterIndex) {
          const correspondingPijnpunt = thema2PijnPunten[pijnpuntIndex];
          if (correspondingPijnpunt) {
            // Check if the corresponding pijnpunt is connected to other selected verbeterinitiatieven
            const otherConnections = connectionMapThema2.filter(([otherPijnpuntIndex, otherVerbeterIndex]) =>
              otherPijnpuntIndex === pijnpuntIndex && otherVerbeterIndex !== verbeterIndex
            );

            const hasOtherSelectedConnections = otherConnections.some(([_, otherVerbeterIndex]) =>
              thema2VerbeterInitiatieven[otherVerbeterIndex].classList.contains('VI-selected') || thema2VerbeterInitiatieven[otherVerbeterIndex].classList.contains('pain-selected')
            );

            if (!hasOtherSelectedConnections) {
              correspondingPijnpunt.classList.remove('pain-selected');
              correspondingPijnpunt.classList.add('unselected');
            }
          }
        }
      });
    }

    // Refresh the lines to reflect any updates
    drawLines();
  });
});

// ---------------------------------------------------------
// VI/Pain selection logic --- thema 3
// ---------------------------------------------------------

const connectionMapThema3 = [
  [0, 0],
  [0, 1],
  [0, 2]
];

// Get the .pijnpunt and .verbeterinitiatief elements for thema-3
const thema3PijnPunten = document.querySelectorAll('.thema-3 .pijnpunt');
const thema3VerbeterInitiatieven = document.querySelectorAll('.thema-3 .verbeterinitiatief');

// Helper function to check if any connected .pijnpunt is still selected
function isAnyPijnpuntSelectedThema3(verbeterIndex) {
  return connectionMapThema3.some(([pijnpuntIndex, verbeterIndexConnected]) => {
    return verbeterIndexConnected === verbeterIndex && thema3PijnPunten[pijnpuntIndex].classList.contains('pain-selected');
  });
}

// Initialize classes based on the current state of selected pijnpunten (for thema-3)
function initializeVerbeterinitiatiefStateThema3() {
  thema3VerbeterInitiatieven.forEach((verbeterInitiatief, index) => {
    // Check if any connected 'pijnpunt' is selected
    if (isAnyPijnpuntSelectedThema3(index)) {
      verbeterInitiatief.classList.add('pain-selected');
      verbeterInitiatief.classList.remove('unselected');
    } else {
      verbeterInitiatief.classList.remove('pain-selected');
      verbeterInitiatief.classList.add('unselected');
    }
  });

  thema3PijnPunten.forEach((pijnpunt, index) => {
    const isConnectedToSelected = connectionMapThema3.some(([pijnpuntIndex, verbeterIndex]) =>
      pijnpuntIndex === index && thema3VerbeterInitiatieven[verbeterIndex].classList.contains('pain-selected')
    );

    if (isConnectedToSelected) {
      pijnpunt.classList.add('pain-selected');
      pijnpunt.classList.remove('unselected');
    } else {
      pijnpunt.classList.remove('pain-selected');
      pijnpunt.classList.add('unselected');
    }
  });
}

// Call the initialization function for thema-3 on page load
initializeVerbeterinitiatiefStateThema3();

// Add click event listener to each .pijnpunt in thema-3
thema3PijnPunten.forEach((pijnpunt, pijnpuntIndex) => {
  pijnpunt.addEventListener('click', function () {
    // Toggle the 'pain-selected' class on the clicked .pijnpunt
    this.classList.toggle('pain-selected');

    // Update related .verbeterinitiatief divs
    connectionMapThema3.forEach(([mappedPijnpuntIndex, verbeterIndex]) => {
      if (mappedPijnpuntIndex === pijnpuntIndex) {
        const correspondingVerbeterInitiatief = thema3VerbeterInitiatieven[verbeterIndex];
        if (correspondingVerbeterInitiatief) {
          // Add or remove 'pain-selected' based on .pijnpunt state
          if (isAnyPijnpuntSelectedThema3(verbeterIndex)) {
            correspondingVerbeterInitiatief.classList.add('pain-selected');
          } else {
            correspondingVerbeterInitiatief.classList.remove('pain-selected');
          }
        }
      }
    });

    // After updating the .verbeterinitiatief divs, check if the .pijnpunt should be unselected
    const connectedVerbeterinitiatieven = connectionMapThema3.filter(([pijnpuntIndex, verbeterIndex]) => {
      return pijnpuntIndex === this.dataset.index;
    });

    const anyConnectedSelectedVerbeterinitiatieven = connectedVerbeterinitiatieven.some(([_, verbeterIndex]) => {
      return thema3VerbeterInitiatieven[verbeterIndex].classList.contains('pain-selected') ||
        thema3VerbeterInitiatieven[verbeterIndex].classList.contains('VI-selected');
    });

    // If no other .verbeterinitiatief divs are selected, mark the .pijnpunt as unselected
    if (!anyConnectedSelectedVerbeterinitiatieven && !this.classList.contains('pain-selected')) {
      this.classList.remove('pain-selected');
      this.classList.add('unselected');
    }

    // Call the drawLines function after the class changes are complete
    drawLines();
  });
});

// Add click event listener to each .verbeterinitiatief in thema-3
thema3VerbeterInitiatieven.forEach((verbeterInitiatief, verbeterIndex) => {
  verbeterInitiatief.addEventListener('click', function () {
    const wasPainSelected = this.classList.contains('pain-selected');
    const wasVISelected = this.classList.contains('VI-selected');

    // Toggle between selected and unselected for verbeterinitiatief
    if (this.classList.contains('unselected')) {
      this.classList.remove('unselected');
      this.classList.add('pain-selected');
      this.classList.add('VI-selected'); // Add the VI-selected class only when the verbeterinitiatief is clicked

      // Find and select all connected .pijnpunt elements
      connectionMapThema3.forEach(([pijnpuntIndex, mappedVerbeterIndex]) => {
        if (mappedVerbeterIndex === verbeterIndex) {
          const correspondingPijnpunt = thema3PijnPunten[pijnpuntIndex];
          if (correspondingPijnpunt) {
            correspondingPijnpunt.classList.remove('unselected');
            correspondingPijnpunt.classList.add('pain-selected');
          }
        }
      });
    } else {
      this.classList.remove('pain-selected', 'VI-selected');
      this.classList.add('unselected');

      // Deselect all connected .pijnpunt elements, but only if no other .verbeterinitiatief divs are selected for them
      connectionMapThema3.forEach(([pijnpuntIndex, mappedVerbeterIndex]) => {
        if (mappedVerbeterIndex === verbeterIndex) {
          const correspondingPijnpunt = thema3PijnPunten[pijnpuntIndex];
          if (correspondingPijnpunt) {
            // Check if the corresponding pijnpunt is connected to other selected verbeterinitiatieven
            const otherConnections = connectionMapThema3.filter(([otherPijnpuntIndex, otherVerbeterIndex]) =>
              otherPijnpuntIndex === pijnpuntIndex && otherVerbeterIndex !== verbeterIndex
            );

            const hasOtherSelectedConnections = otherConnections.some(([_, otherVerbeterIndex]) =>
              thema3VerbeterInitiatieven[otherVerbeterIndex].classList.contains('VI-selected') || thema3VerbeterInitiatieven[otherVerbeterIndex].classList.contains('pain-selected')
            );

            if (!hasOtherSelectedConnections) {
              correspondingPijnpunt.classList.remove('pain-selected');
              correspondingPijnpunt.classList.add('unselected');
            }
          }
        }
      });
    }

    // Refresh the lines to reflect any updates
    drawLines();
  });
});




// ---------------------------------------------------------
// p data-tooltip getter  
// ---------------------------------------------------------

document.querySelectorAll('.info').forEach(info => {
  const svgContainer = info.querySelector('.svg-container');
  const text = info.querySelector('p').textContent;
  svgContainer.setAttribute('data-tooltip', text);
});


// ---------------------------------------------------------
// Line creator
// ---------------------------------------------------------
const leftDivsThema1 = document.querySelectorAll(".thema-1.pijnpunt-container .pijnpunt");
const rightDivsThema1 = document.querySelectorAll(".thema-1.verbeterinitiatief-container .verbeterinitiatief");
const leftDivsThema2 = document.querySelectorAll(".thema-2.pijnpunt-container .pijnpunt");
const rightDivsThema2 = document.querySelectorAll(".thema-2.verbeterinitiatief-container .verbeterinitiatief");
const leftDivsThema3 = document.querySelectorAll(".thema-3.pijnpunt-container .pijnpunt");
const rightDivsThema3 = document.querySelectorAll(".thema-3.verbeterinitiatief-container .verbeterinitiatief");

function createLine(leftDiv, rightDiv) {
  const leftRect = leftDiv.getBoundingClientRect();
  const rightRect = rightDiv.getBoundingClientRect();

  // Account for page scroll offsets
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const leftEdgeCenter = {
    x: leftRect.right + scrollX,
    y: leftRect.top + leftRect.height / 2 + scrollY
  };

  const rightEdgeCenter = {
    x: rightRect.left + scrollX,
    y: rightRect.top + rightRect.height / 2 + scrollY
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

  // Only add line-pain-selected if both connected elements have the 'pain-selected' class
  if (leftDiv.classList.contains('pain-selected') && rightDiv.classList.contains('pain-selected')) {
    line.classList.add('line-pain-selected');
  }

  document.body.appendChild(line);

  line.style.width = `${distance}px`;
  line.style.transform = `rotate(${angle}deg)`;
  line.style.position = "absolute";
  line.style.left = `${leftEdgeCenter.x}px`;
  line.style.top = `${leftEdgeCenter.y}px`;
}

function drawLinesForThema1() {
  if (leftDivsThema1.length > 5 && rightDivsThema1.length > 0) {
    createLine(leftDivsThema1[2], rightDivsThema1[4]);
    createLine(leftDivsThema1[3], rightDivsThema1[3]);
    createLine(leftDivsThema1[5], rightDivsThema1[0]);
    createLine(leftDivsThema1[5], rightDivsThema1[1]);
    createLine(leftDivsThema1[5], rightDivsThema1[2]);
  }
}

// ---------------------------------------------------------
// Draw lines specifically for thema-2
// ---------------------------------------------------------
function drawLinesForThema2() {
  createLine(leftDivsThema2[0], rightDivsThema2[0]);
  createLine(leftDivsThema2[1], rightDivsThema2[0]);
  createLine(leftDivsThema2[2], rightDivsThema2[2]);
  createLine(leftDivsThema2[5], rightDivsThema2[2]);
}

// ---------------------------------------------------------
// Draw lines specifically for thema-3
// ---------------------------------------------------------
function drawLinesForThema3() {
  createLine(leftDivsThema3[0], rightDivsThema3[0]);
  createLine(leftDivsThema3[0], rightDivsThema3[1]);
  createLine(leftDivsThema3[0], rightDivsThema3[2]);
}

// ---------------------------------------------------------
// Draw lines for all themes
// ---------------------------------------------------------
function drawLines() {
  // Remove all existing lines
  const lines = document.querySelectorAll(".line");
  lines.forEach((line) => line.remove());

  drawLinesForThema1();
  drawLinesForThema2();
  drawLinesForThema3();
}

// Attach drawLines to appropriate events
window.addEventListener('resize', drawLines);
window.addEventListener('load', drawLines);