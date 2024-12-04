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
});

// ---------------------------------------------------------
// Dynamic VI adder
// ---------------------------------------------------------
const verbeterinitiatieven = document.querySelectorAll('.verbeterinitiatief');
const subgrids = document.querySelectorAll('.subgrid');

subgrids.forEach(subgrid => {
  subgrid.querySelectorAll(':scope > div').forEach(container => {
    const existingMarked = container.querySelectorAll('.marked');
    existingMarked.forEach(el => el.remove());

    for (let i = 0; i < verbeterinitiatieven.length; i++) {
      const markedDiv = document.createElement('div');
      markedDiv.classList.add('marked');
      container.appendChild(markedDiv);
    }
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
  if (leftDiv.classList.contains('selected')) {
    line.classList.add('line-selected');
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

// Modify the pijnpunt selection logic to redraw lines when selection changes
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

pijnPunten.forEach((pijnpunt, pijnpuntIndex) => {
  pijnpunt.addEventListener('click', function () {
    // Toggle between selected and unselected for pijnpunt
    if (this.classList.contains('unselected')) {
      this.classList.remove('unselected');
      this.classList.add('selected');

      // Find corresponding verbeterinitiatief and select it
      connectionMap.forEach(([leftIndex, rightIndex]) => {
        if (leftIndex === pijnpuntIndex) {
          const correspondingVerbeterInitiatief = verbeterInitiatieven[rightIndex];
          if (correspondingVerbeterInitiatief) {
            correspondingVerbeterInitiatief.classList.remove('unselected');
            correspondingVerbeterInitiatief.classList.add('selected');
          }
        }
      });
    } else {
      this.classList.remove('selected');
      this.classList.add('unselected');

      // Deselect corresponding verbeterinitiatief
      connectionMap.forEach(([leftIndex, rightIndex]) => {
        if (leftIndex === pijnpuntIndex) {
          const correspondingVerbeterInitiatief = verbeterInitiatieven[rightIndex];
          if (correspondingVerbeterInitiatief) {
            correspondingVerbeterInitiatief.classList.remove('selected');
            correspondingVerbeterInitiatief.classList.add('unselected');
          }
        }
      });
    }

    // Redraw lines to update their color
    drawLines();
  });
});

// Initial line creation
drawLines();

// Resize handler to update line positions dynamically
window.addEventListener("resize", drawLines);


// ---------------------------------------------------------
// p data-tooltip getter  
// ---------------------------------------------------------

document.querySelectorAll('.info').forEach(info => {
  const svgContainer = info.querySelector('.svg-container');
  const text = info.querySelector('p').textContent;
  svgContainer.setAttribute('data-tooltip', text);
});