document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------
  // Initial state setup
  // ---------------------------------------------------------
  const infoContainers = document.querySelectorAll('.inner-grid .info');

  infoContainers.forEach(container => {
    const paragraph = container.querySelector('p');
    const infoIcon = container.querySelector('svg');

    paragraph.classList.add('p-minimized');

    if (infoIcon) {
      infoIcon.classList.remove('invisible');
    }
  });

  initializeWidths();






  // ---------------------------------------------------------
  // Expand/Collapse functionality for columns
  // ---------------------------------------------------------
  document.querySelectorAll('.SO-titel img').forEach((icon) => {
    icon.onclick = function () {
      const closestDiv = this.closest('div');
      const nextSibling = closestDiv?.nextElementSibling;
      if (!nextSibling) return;

      const parentClass = nextSibling.classList[1];
      const infoContainers = document.querySelectorAll(`.subgrid.${parentClass} .info`);

      infoContainers.forEach(toggleContainerExpansion);

      adjustBottomSectionWidth(parentClass);
    };
  });

  function toggleContainerExpansion(container) {
    const paragraph = container.querySelector('p');
    const infoIcon = container.querySelector('svg');
    const infoIconContainer = container.querySelector('.svg-container');

    container.classList.toggle('expanded');
    const isExpanded = container.classList.contains('expanded');

    paragraph?.classList.toggle('p-minimized', !isExpanded);
    infoIcon?.classList.toggle('invisible', isExpanded);
    infoIconContainer?.classList.toggle('invisible', isExpanded);
  }

  document.querySelectorAll('.SO-titel img').forEach((icon) => {
    icon.onclick = function () {
      this.src = this.src.includes('expand.svg') ? 'images/minimize.svg' : 'images/expand.svg';
  
      const closestDiv = this.closest('div');
      const nextSibling = closestDiv?.nextElementSibling;
      if (!nextSibling) return;
  
      const parentClass = nextSibling.classList[1];
      const infoContainers = document.querySelectorAll(`.subgrid.${parentClass} .info`);
  
      infoContainers.forEach(toggleContainerExpansion);
      adjustBottomSectionWidth(parentClass);
    };
  });


  // ---------------------------------------------------------
  // Function to initialize bottom section widths
  // ---------------------------------------------------------
  function initializeWidths() {
    const topSections = document.querySelectorAll('.subgrid');
    topSections.forEach(section => {
      const parentClass = section.classList[1];
      adjustBottomSectionWidth(parentClass);
    });
  }

  function adjustBottomSectionWidth(parentClass) {
    const topSection = document.querySelector(`.subgrid.${parentClass}`);
    const topSectionWidth = topSection.offsetWidth;

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
      const subgrid = this.closest('.inner-grid > div').querySelector('.subgrid');

      if (subgrid) {
        subgrid.classList.toggle('invisible');

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

        const subgridClass = Array.from(subgrid.classList).find(cls => cls !== 'subgrid');

        if (subgridClass) {
          const markedGroupThema2 = document.querySelector(`.thema-2.marked-container .${subgridClass}.marked-group`);
          if (markedGroupThema2) {
            markedGroupThema2.classList.toggle('invisible');

            if (markedGroupThema2.classList.contains('invisible')) {
              let placeholder = document.querySelector(`.thema-2 .placeholder-${subgridClass}`);
              if (!placeholder) {
                placeholder = document.createElement('div');
                placeholder.classList.add(`placeholder-${subgridClass}`, 'placeholder', 'thema-2');
                const relatedTitle = this.closest('.SO-titel');
                if (relatedTitle) {
                  const computedStyle = getComputedStyle(relatedTitle);
                  placeholder.style.width = computedStyle.width;
                }
                placeholder.style.visibility = 'hidden';
                placeholder.style.height = '0px';
                placeholder.style.display = 'inline-block';
                markedGroupThema2.parentNode.insertBefore(placeholder, markedGroupThema2);
              }
            } else {
              const placeholder = document.querySelector(`.thema-2 .placeholder-${subgridClass}`);
              if (placeholder) {
                placeholder.remove();
              }
            }
          }

          const markedGroupThema3 = document.querySelector(`.thema-3.marked-container .${subgridClass}.marked-group`);
          if (markedGroupThema3) {
            markedGroupThema3.classList.toggle('invisible');

            if (markedGroupThema3.classList.contains('invisible')) {
              let placeholder = document.querySelector(`.thema-3 .placeholder-${subgridClass}`);
              if (!placeholder) {
                placeholder = document.createElement('div');
                placeholder.classList.add(`placeholder-${subgridClass}`, 'placeholder', 'thema-3');
                const relatedTitle = this.closest('.SO-titel');
                if (relatedTitle) {
                  const computedStyle = getComputedStyle(relatedTitle);
                  placeholder.style.width = computedStyle.width;
                }
                placeholder.style.visibility = 'hidden';
                placeholder.style.height = '0px';
                placeholder.style.display = 'inline-block';
                markedGroupThema3.parentNode.insertBefore(placeholder, markedGroupThema3);
              }
            } else {
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



  // --------------------------------------------------------------------------------------
  // ======================================================================================
  // THEMA 1
  // ----
  // Gemarkeerde strategische ontwikkelingen
  // ======================================================================================
  // --------------------------------------------------------------------------------------

  const verbeterinitiatievenThema1 = document.querySelectorAll('.thema-1 .verbeterinitiatief');
  const subgrids = document.querySelectorAll('.subgrid');


  // HIER AANPASSEN
  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  const markedConnectionMapThema1 = [
    [0, 5, 45],
    [6, 16, 76],
    [17, 47, 67],
    [28, 38],
    [69]
  ];

  const allMarkedDivs = [];
  subgrids.forEach(subgrid => {
    const containers = Array.from(subgrid.querySelectorAll(':scope > div'));

    containers.forEach(container => {
      const existingMarked = container.querySelectorAll('.marked');
      existingMarked.forEach(el => el.remove());

      for (let i = 0; i < verbeterinitiatievenThema1.length; i++) {
        const markedDiv = document.createElement('div');
        markedDiv.classList.add('marked');
        container.appendChild(markedDiv);

        allMarkedDivs.push(markedDiv);
      }
    });
  });

  verbeterinitiatievenThema1.forEach((verbeterInitiatief, viIndex) => {
    verbeterInitiatief.addEventListener('click', () => {
      const isSelected = verbeterInitiatief.classList.toggle('VI-selected');

      const relatedMarkedIndices = markedConnectionMapThema1[viIndex];

      const backgroundColor = isSelected
        ? window.getComputedStyle(verbeterInitiatief, '::before').backgroundColor
        : '';

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


  // --------------------------------------------------------------------------------------
  // ======================================================================================
  // THEMA 2
  // ----
  // Gemarkeerde strategische ontwikkelingen
  // ======================================================================================
  // --------------------------------------------------------------------------------------
  const verbeterinitiatievenThema2 = document.querySelectorAll('.thema-2 .verbeterinitiatief');

  // HIER AANPASSEN
  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓
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

      const isSelected = verbeterInitiatief.classList.contains('VI-selected');

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
            markedDiv.style.backgroundColor = '';
          }
        }
      });
    });
  });


  document.querySelectorAll('.thema-2.marked-container .marked-group').forEach((markedGroup) => {
    markedGroup.querySelectorAll('.marked-row').forEach((row) => {
      updateMarkedRows(row, verbeterinitiatievenThema2.length);
    });
  });

  function updateMarkedRows(row, count) {
    row.querySelectorAll('.marked').forEach(el => el.remove());

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const markedDiv = document.createElement('div');
      markedDiv.classList.add('marked');
      fragment.appendChild(markedDiv);
    }
    row.appendChild(fragment);
  }

  // --------------------------------------------------------------------------------------
  // ======================================================================================
  // THEMA 3
  // ----
  // Gemarkeerde strategische ontwikkelingen
  // ======================================================================================
  // --------------------------------------------------------------------------------------
  const verbeterinitiatievenThema3 = document.querySelectorAll('.thema-3 .verbeterinitiatief');

  // HIER AANPASSEN
  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  const markedConnectionMapThema3 = [
    [0, 3, 30],
    [1, 19, 25],
    [8, 17, 44]
  ];

  const thema3Container = document.querySelector('.thema-3.marked-container');

  verbeterinitiatievenThema3.forEach((verbeterInitiatief, viIndex) => {
    verbeterInitiatief.addEventListener('click', () => {
      const relatedMarkedIndices = markedConnectionMapThema3[viIndex];

      const isSelected = verbeterInitiatief.classList.contains('VI-selected');

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
            markedDiv.style.backgroundColor = '';
          }
        }
      });
    });
  });


  document.querySelectorAll('.thema-3.marked-container .marked-group').forEach((markedGroup) => {
    markedGroup.querySelectorAll('.marked-row').forEach((row) => {
      updateMarkedRows(row, verbeterinitiatievenThema3.length);
    });
  });

  function updateMarkedRows(row, count) {
    row.querySelectorAll('.marked').forEach(el => el.remove());

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
    function updateDecorativeContainer(containerSelector, count) {
      const decorativeContainer = document.querySelector(`${themeSelector} ${containerSelector}`);

      if (decorativeContainer) {
        decorativeContainer.innerHTML = '';

        for (let i = 0; i < count; i++) {
          const decorativeDiv = document.createElement('div');
          decorativeDiv.classList.add('decorative');
          decorativeContainer.appendChild(decorativeDiv);
        }
      }
    }

    const verbeterinitiatieven = document.querySelectorAll(`${themeSelector} .verbeterinitiatief`);
    const count = verbeterinitiatieven.length;

    updateDecorativeContainer(`.inner-grid-decoration`, count);
    updateDecorativeContainer(`.marked-grid-decoration`, count);
    updateDecorativeContainer(`.verbeterinitiatief-container-decoration`, count);
  }

  updateDecorativeDivsForTheme('.thema-1');
  updateDecorativeDivsForTheme('.thema-2');
  updateDecorativeDivsForTheme('.thema-3');



  // --------------------------------------------------------------------------------------
  // ======================================================================================
  // THEMA 1
  // ----
  // Highlight verbinding tussen pijnpunt en verbeterinitiatief
  // ======================================================================================
  // --------------------------------------------------------------------------------------

  const pijnPuntContainer = document.querySelector('.pijnpunt-container');
  const pijnPunten = pijnPuntContainer.querySelectorAll('.pijnpunt');
  const verbeterInitiatiefContainer = document.querySelector('.verbeterinitiatief-container');
  const verbeterInitiatieven = verbeterInitiatiefContainer.querySelectorAll('.verbeterinitiatief');

  // HIER AANPASSEN
  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  const connectionMapThema1 = [
    [2, 4],
    [3, 3],
    [5, 0],
    [5, 1],
    [5, 2]
  ];

  function isAnyVerbeterInitiatiefSelected(pijnpuntIndex) {
    return connectionMapThema1.some(([leftIndex, rightIndex]) => {
      return leftIndex === pijnpuntIndex && (verbeterInitiatieven[rightIndex].classList.contains('pain-selected') || verbeterInitiatieven[rightIndex].classList.contains('VI-selected'));
    });
  }

  function initializeVerbeterinitiatiefState() {
    verbeterInitiatieven.forEach((verbeterInitiatief, index) => {
      if (isAnyVerbeterInitiatiefSelected(index)) {
        verbeterInitiatief.classList.add('pain-selected');
      } else {
        verbeterInitiatief.classList.add('unselected');
      }
    });
  }

  function shouldPijnpuntRemainSelected(pijnpuntIndex) {
    return connectionMapThema1.some(([leftIndex, rightIndex]) => {
      return leftIndex === pijnpuntIndex && (verbeterInitiatieven[rightIndex].classList.contains('VI-selected') || verbeterInitiatieven[rightIndex].classList.contains('pain-selected'));
    });
  }

  pijnPunten.forEach((pijnpunt, pijnpuntIndex) => {
    pijnpunt.addEventListener('click', function () {
      if (this.classList.contains('unselected')) {
        this.classList.remove('unselected');
        this.classList.add('pain-selected');
      } else {
        this.classList.remove('pain-selected');
        this.classList.add('unselected');
      }

      connectionMapThema1.forEach(([leftIndex, rightIndex]) => {
        if (leftIndex === pijnpuntIndex) {
          const correspondingVerbeterInitiatief = verbeterInitiatieven[rightIndex];
          if (correspondingVerbeterInitiatief) {
            if (pijnpunt.classList.contains('pain-selected')) {
              correspondingVerbeterInitiatief.classList.add('pain-selected');
            } else {
              correspondingVerbeterInitiatief.classList.remove('pain-selected');
            }
          }
        }
      });

      drawLines();
    });
  });

  verbeterInitiatieven.forEach((verbeterInitiatief, index) => {
    verbeterInitiatief.addEventListener('click', function () {
      const wasPainSelected = this.classList.contains('pain-selected');
      const wasVISelected = this.classList.contains('VI-selected');

      if (this.classList.contains('unselected')) {
        this.classList.remove('unselected');
        this.classList.add('pain-selected');
        this.classList.add('VI-selected');

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
        this.classList.remove('VI-selected');

        connectionMapThema1.forEach(([leftIndex, rightIndex]) => {
          if (rightIndex === index) {
            const correspondingPijnpunt = pijnPunten[leftIndex];
            if (correspondingPijnpunt) {
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

      drawLines();
    });
  });

  initializeVerbeterinitiatiefState();

  window.addEventListener('resize', drawLines);
});



// --------------------------------------------------------------------------------------
// ======================================================================================
// THEMA 2
// ----
// Highlight verbinding tussen pijnpunt en verbeterinitiatief
// ======================================================================================
// --------------------------------------------------------------------------------------

// HIER AANPASSEN
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const connectionMapThema2 = [
  [0, 0],
  [1, 0],
  [2, 2],
  [5, 2]
];

const thema2PijnPunten = document.querySelectorAll('.thema-2 .pijnpunt');
const thema2VerbeterInitiatieven = document.querySelectorAll('.thema-2 .verbeterinitiatief');

function isAnyPijnpuntSelectedThema2(verbeterIndex) {
  return connectionMapThema2.some(([pijnpuntIndex, verbeterIndexConnected]) => {
    return verbeterIndexConnected === verbeterIndex && thema2PijnPunten[pijnpuntIndex].classList.contains('pain-selected');
  });
}

function initializeVerbeterinitiatiefStateThema2() {
  thema2VerbeterInitiatieven.forEach((verbeterInitiatief, index) => {
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

initializeVerbeterinitiatiefStateThema2();

thema2PijnPunten.forEach((pijnpunt, pijnpuntIndex) => {
  pijnpunt.addEventListener('click', function () {
    this.classList.toggle('pain-selected');

    connectionMapThema2.forEach(([mappedPijnpuntIndex, verbeterIndex]) => {
      if (mappedPijnpuntIndex === pijnpuntIndex) {
        const correspondingVerbeterInitiatief = thema2VerbeterInitiatieven[verbeterIndex];
        if (correspondingVerbeterInitiatief) {
          if (isAnyPijnpuntSelectedThema2(verbeterIndex)) {
            correspondingVerbeterInitiatief.classList.add('pain-selected');
          } else {
            correspondingVerbeterInitiatief.classList.remove('pain-selected');
          }
        }
      }
    });

    const connectedVerbeterinitiatieven = connectionMapThema2.filter(([pijnpuntIndex, verbeterIndex]) => {
      return pijnpuntIndex === this.dataset.index;
    });

    const anyConnectedSelectedVerbeterinitiatieven = connectedVerbeterinitiatieven.some(([_, verbeterIndex]) => {
      return thema2VerbeterInitiatieven[verbeterIndex].classList.contains('pain-selected') ||
        thema2VerbeterInitiatieven[verbeterIndex].classList.contains('VI-selected');
    });

    if (!anyConnectedSelectedVerbeterinitiatieven && !this.classList.contains('pain-selected')) {
      this.classList.remove('pain-selected');
      this.classList.add('unselected');
    }

    drawLines();
  });
});


thema2VerbeterInitiatieven.forEach((verbeterInitiatief, verbeterIndex) => {
  verbeterInitiatief.addEventListener('click', function () {
    const wasPainSelected = this.classList.contains('pain-selected');
    const wasVISelected = this.classList.contains('VI-selected');

    if (this.classList.contains('unselected')) {
      this.classList.remove('unselected');
      this.classList.add('pain-selected');
      this.classList.add('VI-selected');

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

      connectionMapThema2.forEach(([pijnpuntIndex, mappedVerbeterIndex]) => {
        if (mappedVerbeterIndex === verbeterIndex) {
          const correspondingPijnpunt = thema2PijnPunten[pijnpuntIndex];
          if (correspondingPijnpunt) {
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

    drawLines();
  });
});

// --------------------------------------------------------------------------------------
// ======================================================================================
// THEMA 3
// ----
// Highlight verbinding tussen pijnpunt en verbeterinitiatief
// ======================================================================================
// --------------------------------------------------------------------------------------

// HIER AANPASSEN
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓
const connectionMapThema3 = [
  [0, 0],
  [0, 1],
  [0, 2]
];

const thema3PijnPunten = document.querySelectorAll('.thema-3 .pijnpunt');
const thema3VerbeterInitiatieven = document.querySelectorAll('.thema-3 .verbeterinitiatief');

function isAnyPijnpuntSelectedThema3(verbeterIndex) {
  return connectionMapThema3.some(([pijnpuntIndex, verbeterIndexConnected]) => {
    return verbeterIndexConnected === verbeterIndex && thema3PijnPunten[pijnpuntIndex].classList.contains('pain-selected');
  });
}

function initializeVerbeterinitiatiefStateThema3() {
  thema3VerbeterInitiatieven.forEach((verbeterInitiatief, index) => {
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

initializeVerbeterinitiatiefStateThema3();

thema3PijnPunten.forEach((pijnpunt, pijnpuntIndex) => {
  pijnpunt.addEventListener('click', function () {
    this.classList.toggle('pain-selected');

    connectionMapThema3.forEach(([mappedPijnpuntIndex, verbeterIndex]) => {
      if (mappedPijnpuntIndex === pijnpuntIndex) {
        const correspondingVerbeterInitiatief = thema3VerbeterInitiatieven[verbeterIndex];
        if (correspondingVerbeterInitiatief) {
          if (isAnyPijnpuntSelectedThema3(verbeterIndex)) {
            correspondingVerbeterInitiatief.classList.add('pain-selected');
          } else {
            correspondingVerbeterInitiatief.classList.remove('pain-selected');
          }
        }
      }
    });

    const connectedVerbeterinitiatieven = connectionMapThema3.filter(([pijnpuntIndex, verbeterIndex]) => {
      return pijnpuntIndex === this.dataset.index;
    });

    const anyConnectedSelectedVerbeterinitiatieven = connectedVerbeterinitiatieven.some(([_, verbeterIndex]) => {
      return thema3VerbeterInitiatieven[verbeterIndex].classList.contains('pain-selected') ||
        thema3VerbeterInitiatieven[verbeterIndex].classList.contains('VI-selected');
    });

    if (!anyConnectedSelectedVerbeterinitiatieven && !this.classList.contains('pain-selected')) {
      this.classList.remove('pain-selected');
      this.classList.add('unselected');
    }

    drawLines();
  });
});

thema3VerbeterInitiatieven.forEach((verbeterInitiatief, verbeterIndex) => {
  verbeterInitiatief.addEventListener('click', function () {
    const wasPainSelected = this.classList.contains('pain-selected');
    const wasVISelected = this.classList.contains('VI-selected');

    if (this.classList.contains('unselected')) {
      this.classList.remove('unselected');
      this.classList.add('pain-selected');
      this.classList.add('VI-selected');

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

      connectionMapThema3.forEach(([pijnpuntIndex, mappedVerbeterIndex]) => {
        if (mappedVerbeterIndex === verbeterIndex) {
          const correspondingPijnpunt = thema3PijnPunten[pijnpuntIndex];
          if (correspondingPijnpunt) {
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

  const leftIndex = Array.from(leftDiv.parentElement.children).indexOf(leftDiv);
  const rightIndex = Array.from(rightDiv.parentElement.children).indexOf(rightDiv);
  line.classList.add(`line-${leftDiv.parentElement.children.length - leftIndex - 1}-${rightIndex}`);

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


// --------------------------------------------------------------------------------------
// ======================================================================================
// ALLE THEMAS 
// ----
// Lijn verbinding tussen pijnpunt en verbeterinitiatief
// ======================================================================================
// --------------------------------------------------------------------------------------

// THEMA 1
// ↓↓↓↓↓↓↓
function drawLinesForThema1() {
  if (leftDivsThema1.length > 5 && rightDivsThema1.length > 0) {
    createLine(leftDivsThema1[2], rightDivsThema1[4]);
    createLine(leftDivsThema1[3], rightDivsThema1[3]);
    createLine(leftDivsThema1[5], rightDivsThema1[0]);
    createLine(leftDivsThema1[5], rightDivsThema1[1]);
    createLine(leftDivsThema1[5], rightDivsThema1[2]);
  }
}

// THEMA 2
// ↓↓↓↓↓↓↓
function drawLinesForThema2() {
  createLine(leftDivsThema2[0], rightDivsThema2[0]);
  createLine(leftDivsThema2[1], rightDivsThema2[0]);
  createLine(leftDivsThema2[2], rightDivsThema2[2]);
  createLine(leftDivsThema2[5], rightDivsThema2[2]);
}

// THEMA 3
// ↓↓↓↓↓↓↓
function drawLinesForThema3() {
  createLine(leftDivsThema3[0], rightDivsThema3[0]);
  createLine(leftDivsThema3[0], rightDivsThema3[1]);
  createLine(leftDivsThema3[0], rightDivsThema3[2]);
}

function drawLines() {
  const lines = document.querySelectorAll(".line");
  lines.forEach((line) => line.remove());

  drawLinesForThema1();
  drawLinesForThema2();
  drawLinesForThema3();
}

window.addEventListener('resize', drawLines);
window.addEventListener('load', drawLines);