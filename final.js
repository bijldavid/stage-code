document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // Toggle visibility and set initial state
    // ---------------------------------------------------------
    const infoParagraphs = document.querySelectorAll('.SO-titel + .subgrid .info p');
    
    // Add 'p-minimized' class to all paragraphs initially
    infoParagraphs.forEach(p => {
      p.classList.add('p-minimized');
    });
  
    // Calculate and store the widest width on initial load
    const soTitels = document.querySelectorAll('.SO-titel');
    const columns = document.querySelectorAll('.inner-grid > div');
    const initialWidestWidth = Math.max(...Array.from(soTitels).map(el => el.getBoundingClientRect().width));
  
    // Set initial width for all columns, excluding those linked to invisible subgrids
    columns.forEach(column => {
      const subgrid = column.querySelector('.subgrid');
      if (!subgrid || !subgrid.classList.contains('invisible')) {
        column.style.width = `${initialWidestWidth}px`;
      } else {
        column.style.width = 'auto'; // Default width for invisible subgrids
      }
    });
  
    // ---------------------------------------------------------
    // Expand/Collapse functionality for columns
    // ---------------------------------------------------------
    const expandIcons = document.querySelectorAll('.SO-titel img');
  
    expandIcons.forEach((icon) => {
      icon.onclick = function () {
        const closestDiv = this.closest('div');
        const nextSibling = closestDiv ? closestDiv.nextElementSibling : null;
        const parentClass = nextSibling ? nextSibling.classList[1] : null;
  
        if (!parentClass) return; // If parentClass isn't valid, exit early
  
        const paragraphs = document.querySelectorAll(`.subgrid.${parentClass} .info p`);
        const paragraphContainers = document.querySelectorAll(`.subgrid.${parentClass} .info`);
        const column = this.closest('.inner-grid > div');
        const subgrid = column.querySelector('.subgrid');
  
        // Skip width adjustment if subgrid has the invisible class
        if (subgrid && subgrid.classList.contains('invisible')) {
          return;
        }
  
        // Toggle width based on expansion state
        if (column.style.width === 'auto') {
          column.style.width = `${initialWidestWidth}px`; // Collapse back to initial width
        } else {
          column.style.width = 'auto'; // Expand to fit content
        }
  
        // Toggle expanded and p-minimized classes
        paragraphContainers.forEach(container => {
          container.classList.toggle('expanded');
        });
  
        paragraphs.forEach(p => {
          p.classList.toggle('p-minimized', !paragraphContainers[0].classList.contains('expanded'));
        });
      };
    });
  
    // ---------------------------------------------------------
    // Handle the `invisible` class toggling on checkboxes
    // ---------------------------------------------------------
    const checkBoxes = document.querySelectorAll('.SO-titel > div');
  
    checkBoxes.forEach(checkbox => {
      checkbox.addEventListener('click', function () {
        // Find the related subgrid
        const subgrid = this.closest('.inner-grid > div').querySelector('.subgrid');
  
        if (subgrid) {
          // Toggle the 'invisible' class on the subgrid
          subgrid.classList.toggle('invisible');
        }
  
        // Re-calculate column width if the subgrid is visible (invisible class removed)
        if (subgrid && !subgrid.classList.contains('invisible')) {
          const columns = document.querySelectorAll('.inner-grid > div');
          const newWidestWidth = Math.max(...Array.from(soTitels)
            .filter(el => {
              const container = el.closest('.inner-grid > div').querySelector('.subgrid .info');
              return !container || !container.classList.contains('expanded'); // Exclude expanded columns
            })
            .map(el => el.getBoundingClientRect().width)
          );
  
          // Apply the new width only for the currently visible columns that are not expanded
          columns.forEach(column => {
            const columnSubgrid = column.querySelector('.subgrid');
            if (columnSubgrid && !columnSubgrid.classList.contains('invisible')) {
              // Check if the column is not in an expanded state before setting width
              const container = columnSubgrid.querySelector('.info');
              if (!container.classList.contains('expanded')) {
                column.style.width = `${newWidestWidth}px`;
              }
            }
          });
        } else {
          // If subgrid is invisible, shrink the column width to 'auto'
          const column = this.closest('.inner-grid > div');
          column.style.width = 'auto';
        }
      });
    });
  });
    